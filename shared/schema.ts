import { pgTable, text, serial, integer, boolean, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations, sql, eq, and, or, desc, count, sum, inArray } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  totalEarnings: decimal("total_earnings", { precision: 10, scale: 2 }).default("0.00"),
  isActive: boolean("is_active").default(true),
  isBanned: boolean("is_banned").default(false),
  banReason: text("ban_reason"),
  bannedBy: integer("banned_by").references(() => teamMembers.id),
  bannedAt: timestamp("banned_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull(), // 'ceo', 'marketing', 'social_media', 'admin'
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const teamChats = pgTable("team_chats", {
  id: serial("id").primaryKey(),
  senderId: integer("sender_id").notNull(),
  message: text("message").notNull(),
  replyTo: integer("reply_to"),
  fileUrl: text("file_url"),
  fileName: text("file_name"),
  fileSize: integer("file_size"),
  isEdited: boolean("is_edited").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const banReports = pgTable("ban_reports", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  teamMemberId: integer("team_member_id").notNull(),
  reason: text("reason").notNull(),
  action: text("action").notNull(), // 'ban' or 'unban'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const messageReadStatus = pgTable("message_read_status", {
  id: serial("id").primaryKey(),
  messageId: integer("message_id").notNull(),
  userId: integer("user_id").notNull(),
  readAt: timestamp("read_at").defaultNow().notNull(),
});

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  type: text("type").notNull(), // 'ads', 'social', 'sites'
  title: text("title").notNull(),
  description: text("description"),
  reward: decimal("reward", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("pending"), // 'pending', 'completed', 'failed'
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const payouts = pgTable("payouts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  platformFee: decimal("platform_fee", { precision: 10, scale: 2 }).notNull(),
  finalAmount: decimal("final_amount", { precision: 10, scale: 2 }).notNull(),
  method: text("method").notNull().default("jazzcash"),
  phoneNumber: text("phone_number").notNull(),
  status: text("status").notNull().default("pending"), // 'pending', 'completed', 'failed'
  reference: text("reference"),
  createdAt: timestamp("created_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  tasks: many(tasks),
  payouts: many(payouts),
  banReports: many(banReports),
}));

export const teamMembersRelations = relations(teamMembers, ({ many }) => ({
  chats: many(teamChats),
  banReports: many(banReports),
}));

export const tasksRelations = relations(tasks, ({ one }) => ({
  user: one(users, {
    fields: [tasks.userId],
    references: [users.id],
  }),
}));

export const payoutsRelations = relations(payouts, ({ one }) => ({
  user: one(users, {
    fields: [payouts.userId],
    references: [users.id],
  }),
}));

export const teamChatsRelations = relations(teamChats, ({ one }) => ({
  sender: one(teamMembers, {
    fields: [teamChats.senderId],
    references: [teamMembers.id],
  }),
}));

export const banReportsRelations = relations(banReports, ({ one }) => ({
  user: one(users, {
    fields: [banReports.userId],
    references: [users.id],
  }),
  teamMember: one(teamMembers, {
    fields: [banReports.teamMemberId],
    references: [teamMembers.id],
  }),
}));

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  firstName: true,
  lastName: true,
});

export const insertTaskSchema = createInsertSchema(tasks).pick({
  userId: true,
  type: true,
  title: true,
  description: true,
  reward: true,
});

export const insertPayoutSchema = createInsertSchema(payouts).pick({
  userId: true,
  amount: true,
  platformFee: true,
  finalAmount: true,
  phoneNumber: true,
});

export const insertTeamMemberSchema = createInsertSchema(teamMembers).pick({
  name: true,
  email: true,
  password: true,
  role: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  subject: true,
  message: true,
});

export const insertTeamChatSchema = createInsertSchema(teamChats).pick({
  senderId: true,
  message: true,
});

export const insertBanReportSchema = createInsertSchema(banReports).pick({
  userId: true,
  teamMemberId: true,
  reason: true,
  action: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertTask = z.infer<typeof insertTaskSchema>;
export type Task = typeof tasks.$inferSelect;
export type InsertPayout = z.infer<typeof insertPayoutSchema>;
export type Payout = typeof payouts.$inferSelect;
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;
export type TeamMember = typeof teamMembers.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type TeamChat = typeof teamChats.$inferSelect;
export type InsertTeamChat = typeof teamChats.$inferInsert;
export type MessageReadStatus = typeof messageReadStatus.$inferSelect;
export type InsertMessageReadStatus = typeof messageReadStatus.$inferInsert;
export type InsertBanReport = z.infer<typeof insertBanReportSchema>;
export type BanReport = typeof banReports.$inferSelect;