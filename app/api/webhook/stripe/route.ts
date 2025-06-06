import { db } from "@/db";
import { Users, Subscriptions } from "@/db/schema";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { eq } from "drizzle-orm";

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
if (!WEBHOOK_SECRET) {
  throw new Error("STRIPE_WEBHOOK_SECRET environment variable is not set. Please set it to your Stripe webhook secret (starts with 'whsec_').");
}
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY environment variable is not set. Please set it to your Stripe secret key (starts with 'sk_test_' or 'sk_live_').");
}

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return new Response("Missing Stripe signature header", { status: 400 });
  }
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET as string);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error("❌ Webhook signature verification failed.", errorMessage);
    return new Response(`Webhook Error: ${errorMessage}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = await stripe.checkout.sessions.retrieve(
          (event.data.object as Stripe.Checkout.Session).id,
          { expand: ["line_items"] }
        );

        const stripeCustomerId = session.customer as string;
        const customerDetails = session.customer_details;

        if (!customerDetails?.email) break;

        const users = await db.select().from(Users).where(eq(Users.email, customerDetails.email));
        const user = users[0];

        if (!user) throw new Error("User not found");

        // Set stripeCustomerId if not already set
        if (!user.stripeCustomerId) {
          await db.update(Users)
            .set({ stripeCustomerId, updatedAt: new Date() })
            .where(eq(Users.id, user.id));
        }

        const lineItems = session.line_items?.data || [];

        for (const item of lineItems) {
          const priceId = item.price?.id;
          const isSubscription = item.price?.type === "recurring";

          if (!priceId) continue;

          if (isSubscription) {
            const endDate = new Date();
            let period: "monthly" | "yearly";

            if (priceId === process.env.STRIPE_YEARLY_PRICE_ID) {
              endDate.setFullYear(endDate.getFullYear() + 1);
              period = "yearly";
            } else if (priceId === process.env.STRIPE_MONTHLY_PRICE_ID) {
              endDate.setMonth(endDate.getMonth() + 1);
              period = "monthly";
            } else {
              throw new Error("Invalid priceId");
            }

            const existing = await db
              .select()
              .from(Subscriptions)
              .where(eq(Subscriptions.userId, user.id));

            if (existing.length > 0) {
              await db.update(Subscriptions)
                .set({
                  startDate: new Date(),
                  endDate,
                  plan: "premium",
                  period,
                  updatedAt: new Date(),
                })
                .where(eq(Subscriptions.userId, user.id));
            } else {
              // Omit id so defaultRandom() can generate it
              await db.insert(Subscriptions).values({
                userId: user.id,
                startDate: new Date(),
                endDate,
                plan: "premium",
                period,
                createdAt: new Date(),
                updatedAt: new Date(),
              });
            }

            await db.update(Users)
              .set({ plan: "premium", updatedAt: new Date() })
              .where(eq(Users.id, user.id));
          }
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = await stripe.subscriptions.retrieve(
          (event.data.object as Stripe.Subscription).id
        );

        const stripeCustomerId = subscription.customer as string;
        const users = await db.select().from(Users).where(eq(Users.stripeCustomerId, stripeCustomerId));
        const user = users[0];

        if (!user) throw new Error("User not found for subscription.deleted event");

        await db.update(Users)
          .set({ plan: "free", updatedAt: new Date() })
          .where(eq(Users.id, user.id));

        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (err) {
    console.error("❌ Error handling webhook event:", err);
    return new Response("Webhook Error", { status: 400 });
  }

  return new Response("✅ Webhook received", { status: 200 });
}
