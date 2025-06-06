import { NextResponse } from "next/server";
import { Users } from "@/db/schema";
import { db } from "@/db";

export async function POST(req: Request) {
  const payload = await req.json();

  if (payload.type === "user.created") {
    const user = payload.data;

    try {
      await db.insert(Users).values({
        clerkId: user.id,
        email: user.email_addresses[0].email_address,
        name: `${user.first_name || ""} ${user.last_name || ""}`.trim(),
      }).onConflictDoNothing(); 

      console.log("✅ User inserted into DB:", user.email_addresses[0].email_address);
    } catch (error) {
      console.error("❌ Failed to insert user:", error);
      return NextResponse.json({ error: "DB insert failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
