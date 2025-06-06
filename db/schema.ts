import { relations } from "drizzle-orm";
import { timestamp, pgTable, text, uuid, varchar, integer } from "drizzle-orm/pg-core";

export const planEnum = text("plan", { enum: ["free", "premium"] }).default("free");
export const subscriptionPeriodEnum = text("period", {
    enum: ["monthly", "yearly"],
});

export const JsonForms = pgTable("jsonForms", {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    formData: text("form_data").notNull(),
    theme: varchar("theme").default("light").notNull(),
    formBackground: varchar("form_background").default("bg-white").notNull(),
    borderStyle: varchar("border_style").default("border border-gray-300").notNull(),
    responsesCount: integer("responses_count").default(0).notNull(),
    createdBy: varchar("created_by", { length: 255 }).notNull(),

    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const FormResponses = pgTable("formResponses", {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    formId: uuid("form_id").references(() => JsonForms.id).notNull(),
    responseData: text("response_data").notNull(),
    submittedAt: timestamp('submitted_at', { withTimezone: true }).defaultNow().notNull(),
    submittedBy: varchar("submitted_by", { length: 255 }).notNull(),
});

export const Users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    clerkId: varchar("clerk_id", { length: 255 }).notNull().unique(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    name: varchar("name", { length: 255 }),
    plan: planEnum.default("free").notNull(),
    stripeCustomerId: varchar("stripe_customer_id", { length: 255 }),

    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const Subscriptions = pgTable("subscriptions", {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    userId: uuid("user_id").notNull().unique().references(() => Users.id),
    plan: planEnum.default("free").notNull(),
    period: subscriptionPeriodEnum.notNull(),
    startDate: timestamp("start_date", { mode: "date" }).defaultNow(),
    endDate: timestamp("end_date", { mode: "date" }).notNull(),

    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const usersRelations = relations(Users, ({ one }) => ({
    subscription: one(Subscriptions, {
        fields: [Users.id],
        references: [Subscriptions.userId],
    }),
}));

export const subscriptionsRelations = relations(Subscriptions, ({ one }) => ({
    user: one(Users, {
        fields: [Subscriptions.userId],
        references: [Users.id],
    }),
}));