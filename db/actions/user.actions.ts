"use server"

import { db } from "@/db";
import { Subscriptions, Users } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, sql } from "drizzle-orm";

export async function createUser(user: {
    clerkId: string;
    email: string;
    name: string;
}) {
    // Check if user with this email already exists
    const existingUser = await db.query.Users.findFirst({
        where: eq(Users.email, user.email),
    });
    if (existingUser) {
        return existingUser;
    }
    const [newUser] = await db.insert(Users).values({
        clerkId: user.clerkId,
        email: user.email,
        name: user.name,
    }).returning();
    return newUser;
}

export async function updateUser(clerkId: string, user: {
    username?: string;
    name?: string;
    email?: string;
}) {
    const [updatedUser] = await db.update(Users)
        .set({
            name: user.name,
        })
        .where(eq(Users.clerkId, clerkId))
        .returning();
    return updatedUser;
}

export async function deleteUser(clerkId: string) {
    const [deletedUser] = await db.delete(Users)
        .where(eq(Users.clerkId, clerkId))
        .returning();
    return deletedUser;
}

export async function getUserPlan(clerkId: string) {
    const user = await db.query.Users.findFirst({
        where: eq(Users.clerkId, clerkId),
    });
    if (!user) {
        throw new Error("User not found");
    }
    const subscription = await db.query.Subscriptions.findFirst({
        where: eq(Subscriptions.userId, user.id),
    });

    return {
        userPlan: user.plan || "free",
        subscriptionPlan: subscription?.plan || "free",
        period: subscription?.period || null,
        startDate: subscription?.startDate || null,
        endDate: subscription?.endDate || null,
    };
}

export async function getUserFreeCredits() {

    const { userId } = await auth();
    if (!userId) {
        throw new Error("User not authenticated");
    }
    const user = await db.query.Users.findFirst({
        where: eq(Users.clerkId, userId),
    });

    const userFreeCredits = user?.freeCredits
    return userFreeCredits
}

export async function dicrementCredits() {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("User not authenticated");
    }
    // Decrement freeCredits by 1 atomically
    const [updatedUser] = await db.update(Users)
        .set({ freeCredits: sql`GREATEST(free_credits - 1, 0)` })
        .where(eq(Users.clerkId, userId))
        .returning();
    return updatedUser?.freeCredits;
}