import { 
  users, tasks, payouts, teamMembers, contactMessages, teamChats, banReports, messageReadStatus,
  type User, type InsertUser, type Task, type InsertTask, type Payout, type InsertPayout,
  type TeamMember, type InsertTeamMember, type ContactMessage, type InsertContactMessage,
  type TeamChat, type InsertTeamChat, type BanReport, type InsertBanReport
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, like, count, sum, sql, inArray, or } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  updateUserBanStatus(userId: number, isBanned: boolean, reason?: string): Promise<User | undefined>;
  verifyUserEmail(userId: number): Promise<User | undefined>;



  // Task methods
  getUserTasks(userId: number): Promise<Task[]>;
  createTask(task: InsertTask): Promise<Task>;
  updateTaskStatus(taskId: number, status: string): Promise<Task | undefined>;

  // Payout methods
  getUserPayouts(userId: number): Promise<Payout[]>;
  createPayout(payout: InsertPayout): Promise<Payout>;
  updatePayoutStatus(payoutId: number, status: string, reference?: string): Promise<Payout | undefined>;

  // Team member methods
  getTeamMember(id: number): Promise<TeamMember | undefined>;
  getTeamMemberByName(name: string): Promise<TeamMember | undefined>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;
  getAllTeamMembers(): Promise<TeamMember[]>;
  updateTeamMemberPassword(id: number, password: string): Promise<TeamMember | undefined>;

  // Contact message methods
  getAllContactMessages(): Promise<ContactMessage[]>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  markMessageAsRead(messageId: number): Promise<ContactMessage | undefined>;

  // Team chat methods
  getAllTeamChats(search?: string, limit?: number, offset?: number): Promise<TeamChat[]>;
  createTeamChat(chat: InsertTeamChat): Promise<TeamChat>;
  markChatAsRead(messageId: number, teamMemberId: number): Promise<TeamChat | undefined>;
  searchTeamChats(query: string, limit?: number): Promise<TeamChat[]>;
  updateTeamChat(messageId: number, newMessage: string, senderId: number): Promise<TeamChat | undefined>;
  deleteTeamChat(messageId: number, senderId: number): Promise<boolean>;

  // Ban report methods
  createBanReport(report: InsertBanReport): Promise<BanReport>;
  getBanReportsByUser(userId: number): Promise<BanReport[]>;

  // Enhanced user ban methods
  banUser(userId: number, reason: string, bannedBy: number): Promise<User | undefined>;
  unbanUser(userId: number, reason: string, unbannedBy: number): Promise<User | undefined>;
  getBannedUsers(): Promise<User[]>;

    // Advanced analytics methods
  getUserAnalytics(): Promise<any>;

  // Bulk operations methods
  getBulkOperations(): Promise<any[]>;
  bulkBanUsers(userIds: number[], reason: string, teamMemberId: number): Promise<any[]>;
  bulkUnbanUsers(userIds: number[], reason: string, teamMemberId: number): Promise<any[]>;
  bulkActivateUsers(userIds: number[]): Promise<any>;
  bulkDeactivateUsers(userIds: number[]): Promise<any>;

  exportUsers(userIds?: number[]): Promise<any>;

  // User segmentation methods
  getUserSegments(): Promise<any>;
  createUserSegment(data: { name: string; criteria: any; description?: string; createdBy: number }): Promise<any>;

  // Activity logging methods
  logUserActivity(userId: number, action: string, details: any): Promise<any>;
  getUserActivityLogs(userId: number, limit: number, offset: number): Promise<any>;

    // User import/export functionality
  importUsers(filePath: string): Promise<any>;
  getUsersForExport(userIds?: number[]): Promise<any[]>;

    // Methods to add
  updateUser(id: number, updates: any): Promise<void>;
  getUsersByIds(ids: number[]): Promise<any[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return db.select().from(users);
  }

  async getUserTasks(userId: number): Promise<Task[]> {
    return db.select().from(tasks).where(eq(tasks.userId, userId));
  }

  async createTask(insertTask: InsertTask): Promise<Task> {
    const [task] = await db
      .insert(tasks)
      .values(insertTask)
      .returning();
    return task;
  }

  async updateTaskStatus(taskId: number, status: string): Promise<Task | undefined> {
    const [task] = await db
      .update(tasks)
      .set({ 
        status,
        completedAt: status === 'completed' ? new Date() : null
      })
      .where(eq(tasks.id, taskId))
      .returning();
    return task || undefined;
  }

  async getUserPayouts(userId: number): Promise<Payout[]> {
    return db.select().from(payouts).where(eq(payouts.userId, userId));
  }

  async createPayout(insertPayout: InsertPayout): Promise<Payout> {
    const [payout] = await db
      .insert(payouts)
      .values(insertPayout)
      .returning();
    return payout;
  }

  async updatePayoutStatus(payoutId: number, status: string, reference?: string): Promise<Payout | undefined> {
    const [payout] = await db
      .update(payouts)
      .set({ 
        status,
        reference,
        completedAt: status === 'completed' ? new Date() : null
      })
      .where(eq(payouts.id, payoutId))
      .returning();
    return payout || undefined;
  }

  async updateUserBanStatus(userId: number, isBanned: boolean, reason?: string): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ 
        isBanned,
        banReason: reason || null,
        bannedAt: isBanned ? new Date() : null,
        updatedAt: new Date()
      })
      .where(eq(users.id, userId))
      .returning();

    return user || undefined;
  }

  async verifyUserEmail(userId: number): Promise<User | undefined> {
    // For now, just mark the user as active (the existing schema doesn't have email verification fields)
    const [user] = await db
      .update(users)
      .set({ 
        isActive: true,
        updatedAt: new Date()
      })
      .where(eq(users.id, userId))
      .returning();
    return user || undefined;
  }

  // Team member methods
  async getTeamMember(id: number): Promise<TeamMember | undefined> {
    const [member] = await db.select().from(teamMembers).where(eq(teamMembers.id, id));
    return member || undefined;
  }

  async getTeamMemberByName(name: string): Promise<TeamMember | undefined> {
    const [member] = await db.select().from(teamMembers).where(eq(teamMembers.name, name));
    return member || undefined;
  }

  async createTeamMember(member: InsertTeamMember): Promise<TeamMember> {
    const [newMember] = await db
      .insert(teamMembers)
      .values(member)
      .returning();
    return newMember;
  }

  async getAllTeamMembers(): Promise<TeamMember[]> {
    return db.select().from(teamMembers);
  }

  async updateTeamMemberPassword(id: number, password: string): Promise<TeamMember | undefined> {
    const [member] = await db
      .update(teamMembers)
      .set({ password })
      .where(eq(teamMembers.id, id))
      .returning();
    return member || undefined;
  }

  // Contact message methods
  async getAllContactMessages(): Promise<ContactMessage[]> {
    return db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [newMessage] = await db
      .insert(contactMessages)
      .values(message)
      .returning();
    return newMessage;
  }

  async markMessageAsRead(messageId: number): Promise<ContactMessage | undefined> {
    const [message] = await db
      .update(contactMessages)
      .set({ isRead: true })
      .where(eq(contactMessages.id, messageId))
      .returning();
    return message || undefined;
  }

  // Team chat methods
  async getAllTeamChats(search?: string, limit = 50, offset = 0): Promise<any[]> {
    let query = db.select({
      id: teamChats.id,
      senderId: teamChats.senderId,
      message: teamChats.message,
      replyTo: teamChats.replyTo,
      fileUrl: teamChats.fileUrl,
      fileName: teamChats.fileName,
      fileSize: teamChats.fileSize,
      isEdited: teamChats.isEdited,
      createdAt: teamChats.createdAt,
      updatedAt: teamChats.updatedAt,
      senderName: teamMembers.name,
      senderRole: teamMembers.role
    })
    .from(teamChats)
    .leftJoin(teamMembers, eq(teamChats.senderId, teamMembers.id));

    if (search) {
      query = query.where(like(teamChats.message, `%${search}%`));
    }

    const result = await query
      .orderBy(desc(teamChats.createdAt))
      .limit(limit)
      .offset(offset);

    return result;
  }

  async createTeamChat(chat: InsertTeamChat): Promise<TeamChat> {
    const [newChat] = await db
      .insert(teamChats)
      .values(chat)
      .returning();
    return newChat;
  }

  async markChatAsRead(messageId: number, teamMemberId: number): Promise<TeamChat | undefined> {
    // For now, we'll use the messageReadStatus table to track read status
    // First get the chat message
    const [chat] = await db.select().from(teamChats).where(eq(teamChats.id, messageId));

    if (chat) {
      // Insert read status into messageReadStatus table
      await db.insert(messageReadStatus).values({
        messageId,
        userId: teamMemberId
      });
    }

    return chat || undefined;
  }

  async searchTeamChats(query: string, limit = 20): Promise<any[]> {
    const result = await db
      .select({
        id: teamChats.id,
        senderId: teamChats.senderId,
        message: teamChats.message,
        replyTo: teamChats.replyTo,
        fileUrl: teamChats.fileUrl,
        fileName: teamChats.fileName,
        fileSize: teamChats.fileSize,
        isEdited: teamChats.isEdited,
        createdAt: teamChats.createdAt,
        updatedAt: teamChats.updatedAt,
        senderName: teamMembers.name,
        senderRole: teamMembers.role
      })
      .from(teamChats)
      .leftJoin(teamMembers, eq(teamChats.senderId, teamMembers.id))
      .where(like(teamChats.message, `%${query}%`))
      .orderBy(desc(teamChats.createdAt))
      .limit(limit);

    return result;
  }

  async updateTeamChat(messageId: number, newMessage: string, senderId: number): Promise<TeamChat | undefined> {
    const [chat] = await db
      .update(teamChats)
      .set({ 
        message: newMessage,
        isEdited: true,
        updatedAt: new Date()
      })
      .where(and(eq(teamChats.id, messageId), eq(teamChats.senderId, senderId)))
      .returning();

    return chat || undefined;
  }

  async deleteTeamChat(messageId: number, senderId: number): Promise<boolean> {
    const result = await db
      .delete(teamChats)
      .where(and(eq(teamChats.id, messageId), eq(teamChats.senderId, senderId)))
      .returning();

    return result.length > 0;
  }

  // Ban report methods
  async createBanReport(report: InsertBanReport): Promise<BanReport> {
    const [newReport] = await db
      .insert(banReports)
      .values(report)
      .returning();
    return newReport;
  }

  async getBanReportsByUser(userId: number): Promise<BanReport[]> {
    return db.select().from(banReports).where(eq(banReports.userId, userId));
  }

  async banUser(userId: number, reason: string, bannedBy: number): Promise<User | undefined> {
    const [user] = await db.update(users)
      .set({ 
        isBanned: true, 
        banReason: reason, 
        bannedBy: bannedBy,
        bannedAt: new Date(),
        updatedAt: new Date()
      })
      .where(eq(users.id, userId))
      .returning();

    // Create ban report
    await this.createBanReport({
      userId,
      teamMemberId: bannedBy,
      reason,
      action: 'ban'
    });

    return user || undefined;
  }

  async unbanUser(userId: number, reason: string, unbannedBy: number): Promise<User | undefined> {
    const [user] = await db.update(users)
      .set({ 
        isBanned: false, 
        banReason: null,
        bannedBy: null,
        bannedAt: null,
        updatedAt: new Date()
      })
      .where(eq(users.id, userId))
      .returning();

    // Create unban report
    await this.createBanReport({
      userId,
      teamMemberId: unbannedBy,
      reason,
      action: 'unban'
    });

    return user || undefined;
  }

  async getBannedUsers(): Promise<User[]> {
    return await db.select().from(users).where(eq(users.isBanned, true)).orderBy(desc(users.bannedAt));
  }

    // Advanced analytics methods
  async getUserAnalytics() {
    const totalUsers = await db.select({ count: count() }).from(users);
    const activeUsers = await db.select({ count: count() }).from(users).where(and(eq(users.isActive, true), eq(users.isBanned, false)));
    const bannedUsers = await db.select({ count: count() }).from(users).where(eq(users.isBanned, true));
    const newUsersToday = await db.select({ count: count() }).from(users).where(sql`DATE(created_at) = CURRENT_DATE`);
    const newUsersWeek = await db.select({ count: count() }).from(users).where(sql`created_at >= NOW() - INTERVAL '7 days'`);
    const totalEarnings = await db.select({ sum: sum(users.totalEarnings) }).from(users);

    // User growth data for last 30 days
    const growthData = await db.execute(sql`
      SELECT DATE(created_at) as date, COUNT(*) as registrations
      FROM users 
      WHERE created_at >= NOW() - INTERVAL '30 days'
      GROUP BY DATE(created_at)
      ORDER BY date DESC
    `);

    // Top earners
    const topEarners = await db.select({
      id: users.id,
      username: users.username,
      totalEarnings: users.totalEarnings,
      firstName: users.firstName,
      lastName: users.lastName
    }).from(users).orderBy(desc(users.totalEarnings)).limit(10);

    return {
      overview: {
        totalUsers: totalUsers[0]?.count || 0,
        activeUsers: activeUsers[0]?.count || 0,
        bannedUsers: bannedUsers[0]?.count || 0,
        newUsersToday: newUsersToday[0]?.count || 0,
        newUsersWeek: newUsersWeek[0]?.count || 0,
        totalEarnings: totalEarnings[0]?.sum || '0.00'
      },
      growthData: growthData.rows,
      topEarners
    };
  }

  // Bulk operations methods
  async getBulkOperations() {
    // Return recent bulk operations for history
    const operations = await db.execute(sql`
      SELECT 
        action as operation,
        COUNT(*) as affected_users,
        MAX(created_at) as created_at,
        reason
      FROM ban_reports 
      WHERE created_at >= NOW() - INTERVAL '30 days'
      GROUP BY action, reason
      ORDER BY created_at DESC
      LIMIT 20
    `);

    return operations.rows;
  }

  async bulkBanUsers(userIds: number[], reason: string, teamMemberId: number) {
    const results = [];

    for (const userId of userIds) {
      try {
        // Update user ban status
        const [user] = await db
          .update(users)
          .set({ 
            isBanned: true,
            banReason: reason,
            bannedAt: new Date(),
            updatedAt: new Date()
          })
          .where(eq(users.id, userId))
          .returning();

        if (user) {
          // Create ban report
          await this.createBanReport({
            userId,
            teamMemberId,
            reason,
            action: 'ban'
          });

          // Log activity
          await this.logUserActivity(userId, 'user_banned', { reason, bannedBy: teamMemberId });
          results.push({ userId, status: 'success' });
        }
      } catch (error) {
        results.push({ userId, status: 'error', error: error.message });
      }
    }

    return results;
  }

  async bulkUnbanUsers(userIds: number[], reason: string, teamMemberId: number) {
    const results = [];

    for (const userId of userIds) {
      try {
        const [user] = await db
          .update(users)
          .set({ 
            isBanned: false,
            banReason: null,
            bannedAt: null,
            updatedAt: new Date()
          })
          .where(eq(users.id, userId))
          .returning();

        if (user) {
          await this.createBanReport({
            userId,
            teamMemberId,
            reason,
            action: 'unban'
          });

          await this.logUserActivity(userId, 'user_unbanned', { reason, unbannedBy: teamMemberId });
          results.push({ userId, status: 'success' });
        }
      } catch (error) {
        results.push({ userId, status: 'error', error: error.message });
      }
    }

    return results;
  }

  async bulkActivateUsers(userIds: number[]) {
    const [result] = await db
      .update(users)
      .set({ isActive: true, updatedAt: new Date() })
      .where(inArray(users.id, userIds))
      .returning();

    // Log activities
    for (const userId of userIds) {
      await this.logUserActivity(userId, 'user_activated', {});
    }

    return result;
  }

  async bulkDeactivateUsers(userIds: number[]) {
    const [result] = await db
      .update(users)
      .set({ isActive: false, updatedAt: new Date() })
      .where(inArray(users.id, userIds))
      .returning();

    // Log activities
    for (const userId of userIds) {
      await this.logUserActivity(userId, 'user_deactivated', {});
    }

    return result;
  }

  async exportUsers(userIds?: number[]) {
    let query = db.select({
      id: users.id,
      username: users.username,
      email: users.email,
      firstName: users.firstName,
      lastName: users.lastName,
      totalEarnings: users.totalEarnings,
      isActive: users.isActive,
      isBanned: users.isBanned,
      createdAt: users.createdAt
    }).from(users);

    if (userIds && userIds.length > 0) {
      query = query.where(inArray(users.id, userIds));
    }

    return await query;
  }

  // User segmentation methods
  async getUserSegments() {
    // For now, return predefined segments with user counts
    const segments = [
      {
        id: 1,
        name: 'High Earners',
        description: 'Users with earnings > $100',
        userCount: await db.select({ count: count() }).from(users).where(sql`CAST(total_earnings AS DECIMAL) > 100`),
        criteria: { earnings: { min: 100 } }
      },
      {
        id: 2,
        name: 'New Users',
        description: 'Users registered in last 7 days',
        userCount: await db.select({ count: count() }).from(users).where(sql`created_at >= NOW() - INTERVAL '7 days'`),
        criteria: { registrationDate: { days: 7 } }
      },
      {
        id: 3,
        name: 'Active Users',
        description: 'Users who are active and not banned',
        userCount: await db.select({ count: count() }).from(users).where(and(eq(users.isActive, true), eq(users.isBanned, false))),
        criteria: { status: { isActive: true, isBanned: false } }
      },
      {
        id: 4,
        name: 'Inactive Users',
        description: 'Users who are inactive or banned',
        userCount: await db.select({ count: count() }).from(users).where(or(eq(users.isActive, false), eq(users.isBanned, true))),
        criteria: { status: { isActive: false, isBanned: true } }
      }
    ];

    // Get actual counts
    for (const segment of segments) {
      segment.userCount = segment.userCount[0]?.count || 0;
    }

    return segments;
  }

  async createUserSegment(data: { name: string; criteria: any; description?: string; createdBy: number }) {
    // This would typically insert into a segments table
    // For now, return the created segment data
    return {
      id: Date.now(),
      ...data,
      createdAt: new Date(),
      userCount: 0
    };
  }

  // Activity logging methods
  async logUserActivity(userId: number, action: string, details: any = {}) {
    // This would typically insert into a user_activity_logs table
    // For now, we'll simulate it
    const activity = {
      userId,
      action,
      details: JSON.stringify(details),
      timestamp: new Date()
    };

    console.log('User activity logged:', activity);
    return activity;
  }

  async getUserActivityLogs(userId: number, limit: number = 50, offset: number = 0) {
    // This would typically query from a user_activity_logs table
    // For now, return mock data based on user actions
    return [
      {
        id: 1,
        userId,
        action: 'user_registered',
        details: '{}',
        timestamp: new Date(Date.now() - 86400000) // 1 day ago
      },
      {
        id: 2,
        userId,
        action: 'profile_updated',
        details: '{"field": "email"}',
        timestamp: new Date(Date.now() - 43200000) // 12 hours ago
      },
      {
        id: 3,
        userId,
        action: 'task_completed',
        details: '{"taskId": 123, "reward": "5.00"}',
        timestamp: new Date(Date.now() - 3600000) // 1 hour ago
      }
    ];
  }

  async importUsers(filePath: string) {
    // This would parse CSV/Excel files and import users
    // For now, return mock success
    return {
      imported: 0,
      errors: [],
      message: 'Import functionality ready for implementation'
    };
  }

  async getUsersForExport(userIds?: number[]) {
    let query = db.select({
      id: users.id,
      username: users.username,
      email: users.email,
      firstName: users.firstName,
      lastName: users.lastName,
      totalEarnings: users.totalEarnings,
      isActive: users.isActive,
      isBanned: users.isBanned,
      banReason: users.banReason,
      createdAt: users.createdAt
    }).from(users);

    if (userIds && userIds.length > 0) {
      query = query.where(inArray(users.id, userIds));
    }

    return await query;
  }

  async getSegments(): Promise<any[]> {
    // Mock segments data
    return [
      {
        id: 1,
        name: 'High Earners',
        description: 'Users with earnings above $100',
        userCount: 15
      },
      {
        id: 2,
        name: 'New Users',
        description: 'Users registered in the last 30 days',
        userCount: 8
      },
      {
        id: 3,
        name: 'Inactive Users',
        description: 'Users who haven\'t been active in 60+ days',
        userCount: 23
      }
    ];
  }

  async updateTeamMember(id: number, updates: any): Promise<void> {
    // Implementation from original code
    const setClause = Object.keys(updates)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(', ');

    const values = [id, ...Object.values(updates)];

    await db.execute(sql`
      UPDATE team_members 
      SET ${sql.raw(setClause)} 
      WHERE id = ${id}
    `, values);
  }

  async updateUser(id: number, updates: any): Promise<void> {
    // Implementation from original code
    const setClause = Object.keys(updates)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(', ');

    const values = [id, ...Object.values(updates)];

    await db.execute(sql`
      UPDATE users
      SET ${sql.raw(setClause)}
      WHERE id = ${id}
    `, values);
  }

  async getUsersByIds(ids: number[]): Promise<any[]> {
    if (ids.length === 0) return [];

    // Implementation from original code
    const placeholders = ids.map((_, index) => `$${index + 1}`).join(',');

    const result = await db.execute(sql`
      SELECT * 
      FROM users 
      WHERE id IN (${sql.raw(placeholders)})
    `, ids);
    return result.rows;
  }

  async banUser(userId: number, reason: string, teamMemberId: number): Promise<any> {
    try {
      // Update user ban status
      await db.execute(sql`
        UPDATE users
        SET isBanned = true, 
            banReason = ${reason},
            bannedBy = ${teamMemberId},
            bannedAt = CURRENT_TIMESTAMP
        WHERE id = ${userId}
      `);

      // Log the ban action
      await this.createBanReport({
        userId,
        teamMemberId,
        reason,
        action: 'ban'
      });
      return { success: true };
    } catch (error) {
      console.error('Ban user error:', error);
      throw error;
    }
  }

  async unbanUser(userId: number, reason: string, teamMemberId: number): Promise<any> {
    try {
      // Update user ban status
      await db.execute(sql`
        UPDATE users
        SET isBanned = false, 
            banReason = null,
            bannedBy = null,
            bannedAt = null
        WHERE id = ${userId}
      `);

      // Log the unban action
      await this.createBanReport({
        userId,
        teamMemberId,
        reason,
        action: 'unban'
      });

      return { success: true };
    } catch (error) {
      console.error('Unban user error:', error);
      throw error;
    }
  }
}

export const storage = new DatabaseStorage();