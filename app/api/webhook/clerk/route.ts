import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
// ✅ REPLACED: Removed `svix` and used native `crypto` instead
import crypto from "crypto";

import { createUser, deleteUser, updateUser } from "@/db/actions/user.actions";

// Type interfaces remain unchanged
interface UserCreatedData {
  id: string;
  email_addresses?: { email_address: string }[];
  image_url?: string;
  first_name?: string;
  last_name?: string;
  username?: string;
}

interface UserUpdatedData {
  id: string;
  image_url?: string;
  first_name?: string;
  last_name?: string;
  username?: string;
}

interface UserDeletedData {
  id: string;
}

// ✅ ADDED: Manual signature verification logic
function verifySignature(
  secret: string,
  body: string,
  timestamp: string,
  signature: string
): boolean {
  const payload = `${timestamp}.${body}`;
  const hmac = crypto.createHmac("sha256", Buffer.from(secret, "utf8"));
  hmac.update(payload);
  const expectedSignature = `v1,${hmac.digest("hex")}`;

  const providedSignatures = signature.split(" ");
  return providedSignatures.includes(expectedSignature);
}

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;
  if (!SIGNING_SECRET) {
    return NextResponse.json({ error: "SIGNING_SECRET is missing" }, { status: 500 });
  }

  const headersList = await headers();
  const svixId = headersList.get("svix-id");
  const svixTimestamp = headersList.get("svix-timestamp");
  const svixSignature = headersList.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ error: "Missing Svix headers" }, { status: 400 });
  }

  // ✅ CHANGED: Read raw body text to use in signature validation
  const bodyText = await req.text();
  const payload = JSON.parse(bodyText);

  // ✅ CHANGED: Use manual signature verification instead of `svix.verify`
  if (!verifySignature(SIGNING_SECRET, bodyText, svixTimestamp, svixSignature)) {
    console.error("❌ Invalid webhook signature.");
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const evt = payload as WebhookEvent;
  const eventType = evt.type;

  try {
    switch (eventType) {
      case "user.created": {
        const data = evt.data as UserCreatedData;
        const user = {
          clerkId: data.id,
          email: data.email_addresses?.[0]?.email_address ?? "",
          username: data.username ?? "",
          firstName: data.first_name ?? "",
          lastName: data.last_name ?? "",
          photo: data.image_url ?? "",
        };
        const newUser = await createUser(user);
        return NextResponse.json({ message: "User created", user: newUser });
      }

      case "user.updated": {
        const data = evt.data as UserUpdatedData;
        const user = {
          firstName: data.first_name ?? "",
          lastName: data.last_name ?? "",
          username: data.username ?? "",
          photo: data.image_url ?? "",
        };
        const updatedUser = await updateUser(data.id, user);
        return NextResponse.json({ message: "User updated", user: updatedUser });
      }

      case "user.deleted": {
        const data = evt.data as UserDeletedData;
        const deletedUser = await deleteUser(data.id);
        return NextResponse.json({ message: "User deleted", user: deletedUser });
      }

      default:
        console.log(`Unhandled webhook event: ${eventType}`);
        return NextResponse.json({ message: "Unhandled event" }, { status: 200 });
    }
  } catch (err) {
    console.error(`❌ Error processing ${eventType}:`, err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "Webhook endpoint live." });
}
