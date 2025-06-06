import { db } from "@/db";
import { Users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createUser(user: {
    clerkId: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    photo: string;
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
        name: user.username,
    }).returning();
    return newUser;
}

export async function updateUser(clerkId: string, user: {
    username?: string;
    firstName?: string;
    lastName?: string;
    photo?: string;
}) {
    const [updatedUser] = await db.update(Users)
        .set({
            name: user.username,
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
