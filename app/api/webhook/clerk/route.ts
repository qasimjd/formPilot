import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { createUser, deleteUser, updateUser } from "@/db/actions/user.actions";

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

export async function POST(req: Request) {
  const SIGNING_SECRET_BASE64 = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET_BASE64) {
    return NextResponse.json({ error: "SIGNING_SECRET is missing" }, { status: 500 });
  }

  let SIGNING_SECRET: string;
  try {
    SIGNING_SECRET = Buffer.from(SIGNING_SECRET_BASE64, "base64").toString("utf-8");
  } catch {
    return NextResponse.json({ error: "Invalid SIGNING_SECRET format" }, { status: 500 });
  }

  const wh = new Webhook(SIGNING_SECRET);
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({ error: "Missing Svix headers" }, { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return NextResponse.json({ error: "Webhook verification failed" }, { status: 400 });
  }

  const eventType = evt.type;

  try {
    switch (eventType) {
      case "user.created": {
        const data = evt.data as UserCreatedData;
        if (!data.id) {
          return NextResponse.json({ error: "Missing user id" }, { status: 400 });
        }

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
        if (!data.id) {
          return NextResponse.json({ error: "Missing user id" }, { status: 400 });
        }
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
        if (!data.id) {
          return NextResponse.json({ error: "Missing user id" }, { status: 400 });
        }
        const deletedUser = await deleteUser(data.id);
        return NextResponse.json({ message: "User deleted", user: deletedUser });
      }

      default: {
        console.log(`Unhandled webhook event: ${eventType}`, body);
        return NextResponse.json(
          { message: "Event received but not processed" },
          { status: 200 }
        );
      }
    }
  } catch (error) {
    console.error(`Error processing event ${eventType}:`, error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
