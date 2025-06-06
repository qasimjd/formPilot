// import { db } from "@/db/index";
// import { Users, Subscriptions } from "@/db/schema";
// import Stripe from "stripe";
// import { eq } from "drizzle-orm";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2025-04-30.basil",
// });

// export async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
//   console.log("✅ Stripe Checkout Session payload:", JSON.stringify(session, null, 2));

//   const clientReferenceId = session.client_reference_id;

//   if (!clientReferenceId) {
//     console.error("❌ Stripe webhook: Missing `client_reference_id`. Cannot link to user.");
//     return;
//   }

//   const user = await db.query.Users.findFirst({
//     where: eq(Users.clerkId, clientReferenceId),
//   });

//   if (!user) {
//     console.error(`❌ Stripe webhook: No user found with clerkId = ${clientReferenceId}`);
//     return;
//   }

//   // Store stripeCustomerId on user if it's not already stored
//   if (!user.stripeCustomerId && typeof session.customer === "string") {
//     await db.update(Users)
//       .set({ stripeCustomerId: session.customer, updatedAt: new Date() })
//       .where(eq(Users.id, user.id));
//   }

//   // Fetch the subscription from Stripe
//   if (!session.subscription) {
//     console.error("❌ Stripe webhook: `session.subscription` is missing.");
//     return;
//   }

//   const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

//   if (!subscription) {
//     console.error("❌ Stripe webhook: Failed to retrieve subscription.");
//     return;
//   }

//   const currentPeriodStart = subscription.current_period_start
//     ? new Date(subscription.current_period_start * 1000)
//     : null;
//   const currentPeriodEnd = subscription.current_period_end
//     ? new Date(subscription.current_period_end * 1000)
//     : null;
//   const cancelAtPeriodEnd = subscription.cancel_at_period_end ? 1 : 0;
//   const canceledAt = subscription.canceled_at
//     ? new Date(subscription.canceled_at * 1000)
//     : null;

//   const existingSub = await db.query.Subscriptions.findFirst({
//     where: eq(Subscriptions.userId, user.id),
//   });

//   const values = {
//     stripeSubscriptionId: subscription.id,
//     stripePriceId: subscription.items.data[0]?.price.id ?? "",
//     status: subscription.status,
//     currentPeriodStart,
//     currentPeriodEnd,
//     cancelAtPeriodEnd,
//     canceledAt,
//     updatedAt: new Date(),
//   };

//   if (existingSub) {
//     await db.update(Subscriptions)
//       .set(values)
//       .where(eq(Subscriptions.userId, user.id));
//     console.log(`🔄 Updated subscription for user ${user.id}`);
//   } else {
//     await db.insert(Subscriptions).values({
//       userId: user.id,
//       createdAt: new Date(),
//       ...values,
//     });
//     console.log(`✅ Created new subscription for user ${user.id}`);
//   }
// }