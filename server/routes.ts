import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertTaskSchema, insertPayoutSchema, insertContactMessageSchema } from "@shared/schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';


const JWT_SECRET = process.env.JWT_SECRET || "thorx-cosmic-secret-key";

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for file uploads
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage_multer = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage_multer,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|txt/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images and documents are allowed'));
    }
  }
});

// Middleware to verify JWT token
const authenticateToken = async (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const user = jwt.verify(token, JWT_SECRET) as any;
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

// Middleware to verify team member token
const authenticateTeamMember = async (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        if (decoded.type !== 'team') {
            return res.status(403).json({ error: 'Team member access required' });
        }
        req.teamMember = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid token' });
    }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);

      // Check if user already exists
      const existingUser = await storage.getUserByUsername(userData.username) || 
                           await storage.getUserByEmail(userData.email);

      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      // Create user (initially unverified)
      const user = await storage.createUser({
        ...userData,
        password: hashedPassword
      });

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.status(201).json({
        message: "User created successfully.",
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        }
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(400).json({ error: "Invalid registration data" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Email and password required" });
      }

      // Find user by email or username
      const user = await storage.getUserByEmail(email) || 
                   await storage.getUserByUsername(email);

      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Check if user is banned or inactive
      if (user.isBanned) {
        return res.status(403).json({ 
          error: "Account Banned", 
          message: "Your account has been banned.",
          reason: user.banReason || "No reason provided",
          status: "banned",
          contactAllowed: true
        });
      }

      if (!user.isActive) {
        return res.status(403).json({ 
          error: "Account Deactivated", 
          message: "Your account has been deactivated.",
          reason: "Account deactivated by administrator",
          status: "deactivated",
          contactAllowed: true
        });
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          totalEarnings: user.totalEarnings,

        }
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Email verification routes
  app.get("/api/auth/verify-email", async (req, res) => {
    try {
      const { token } = req.query;

      if (!token || typeof token !== 'string') {
        return res.redirect(`/verify-email?error=invalid-token`);
      }

      // For now, we'll implement a simple token verification
      // In production, this should be replaced with proper email service integration
      try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        if (!decoded.userId || !decoded.email) {
          return res.redirect(`/verify-email?error=invalid-token`);
        }

        // Mark email as verified in database
        const user = await storage.verifyUserEmail(decoded.userId);

        if (!user) {
          return res.redirect(`/verify-email?error=user-not-found`);
        }
      } catch (tokenError) {
        return res.redirect(`/verify-email?error=invalid-token`);
      }

      // Redirect to frontend with success message
      res.redirect(`/verify-email?success=true&verified=true`);
    } catch (error) {
      console.error("Email verification error:", error);
      res.redirect(`/verify-email?error=server-error`);
    }
  });



  // Team member authentication routes
  app.post("/api/team/login", async (req, res) => {
    try {
      const { name, password } = req.body;

      console.log("Team login attempt:", { name, passwordLength: password?.length });

      if (!name || !password) {
        return res.status(400).json({ error: "Name and password required" });
      }

      // Find team member
      const teamMember = await storage.getTeamMemberByName(name);

      if (!teamMember) {
        console.log("Team member not found:", name);
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Check if team member is active
      if (!teamMember.isActive) {
        console.log("Team member inactive:", name);
        return res.status(401).json({ error: "Account is inactive" });
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, teamMember.password);

      if (!isValidPassword) {
        console.log("Invalid password for:", name);
        return res.status(401).json({ error: "Invalid password. Please check your password and try again." });
      }

      // Generate JWT token for team member
      const token = jwt.sign(
        { 
          teamMemberId: teamMember.id, 
          name: teamMember.name,
          role: teamMember.role,
          type: 'team'
        },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        message: "Login successful",
        token,
        teamMember: {
          id: teamMember.id,
          name: teamMember.name,
          email: teamMember.email,
          role: teamMember.role
        }
      });
    } catch (error) {
      console.error("Team login error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Team member routes
  app.get("/api/team/profile", authenticateTeamMember, async (req: any, res) => {
    try {
      const teamMember = await storage.getTeamMember(req.teamMember.teamMemberId);

      if (!teamMember) {
        return res.status(404).json({ error: "Team member not found" });
      }

      res.json({
        id: teamMember.id,
        name: teamMember.name,
        email: teamMember.email,
        role: teamMember.role,
        isActive: teamMember.isActive,
        createdAt: teamMember.createdAt
      });
    } catch (error) {
      console.error("Team profile error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // User management routes (for User Care page)
  app.get("/api/team/users", authenticateTeamMember, async (req: any, res) => {
    try {
      // Get all users for the database view
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error("Users error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Advanced analytics endpoint
  app.get("/api/team/analytics", authenticateTeamMember, async (req: any, res) => {
    try {
      const analytics = await storage.getUserAnalytics();
      res.json(analytics);
    } catch (error) {
      console.error("Analytics error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Bulk operations endpoint
  app.get("/api/team/bulk-operations", authenticateTeamMember, async (req: any, res) => {
    try {
      const operations = await storage.getBulkOperations();
      res.json(operations);
    } catch (error) {
      console.error("Bulk operations error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // User segmentation endpoint
  app.get("/api/team/segments", authenticateTeamMember, async (req: any, res) => {
    try {
      const segments = await storage.getUserSegments();
      res.json(segments);
    } catch (error) {
      console.error("Segments error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Bulk user operations
  app.post("/api/team/users/bulk", authenticateTeamMember, async (req: any, res) => {
    try {
      const { operation, userIds, data } = req.body;

      if (!operation || !userIds || !Array.isArray(userIds)) {
        return res.status(400).json({ error: "Invalid bulk operation data" });
      }

      let result;
      switch (operation) {
        case 'ban':
          if (!data?.reason) {
            return res.status(400).json({ error: "Ban reason is required" });
          }
          result = await storage.bulkBanUsers(userIds, data.reason, req.teamMember.teamMemberId);
          break;
        case 'unban':
          if (!data?.reason) {
            return res.status(400).json({ error: "Unban reason is required" });
          }
          result = await storage.bulkUnbanUsers(userIds, data.reason, req.teamMember.teamMemberId);
          break;
        case 'activate':
          result = await storage.bulkActivateUsers(userIds);
          break;
        case 'deactivate':
          result = await storage.bulkDeactivateUsers(userIds);
          break;
        case 'export':
          result = await storage.exportUsers(userIds);
          break;
        default:
          return res.status(400).json({ error: "Invalid operation" });
      }

      res.json({ message: `Bulk ${operation} completed successfully`, result });
    } catch (error) {
      console.error("Bulk operation error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // User import endpoint
  app.post("/api/team/users/import", authenticateTeamMember, upload.single('file'), async (req: any, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const result = await storage.importUsers(req.file.path);
      res.json({ message: "Users imported successfully", result });
    } catch (error) {
      console.error("Import error:", error);
      res.status(500).json({ error: "Failed to import users" });
    }
  });

  // Import individual user from CSV data
  app.post("/api/team/users/import-user", authenticateTeamMember, async (req: any, res) => {
    try {
      const userData = req.body;
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(userData.username) || 
                           await storage.getUserByEmail(userData.email);

      if (existingUser) {
        return res.json({ message: "User already exists", skipped: true });
      }

      // Create new user with hashed password
      const hashedPassword = await bcrypt.hash(userData.password || 'defaultPassword123', 10);
      
      const user = await storage.createUser({
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        totalEarnings: userData.totalEarnings || '0.00',
        isActive: userData.isActive !== 'false',
        isBanned: userData.isBanned === 'true'
      });

      res.json({ message: "User imported successfully", user });
    } catch (error) {
      console.error("Import user error:", error);
      res.status(500).json({ error: "Failed to import user" });
    }
  });

  // Activity logs endpoint
  app.get("/api/team/users/:id/activity", authenticateTeamMember, async (req: any, res) => {
    try {
      const userId = parseInt(req.params.id);
      const { limit = 50, offset = 0 } = req.query;

      const activities = await storage.getUserActivityLogs(userId, parseInt(limit), parseInt(offset));
      res.json(activities);
    } catch (error) {
      console.error("Activity logs error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Create user segment
  app.post("/api/team/segments", authenticateTeamMember, async (req: any, res) => {
    try {
      const { name, criteria, description } = req.body;

      if (!name || !criteria) {
        return res.status(400).json({ error: "Segment name and criteria are required" });
      }

      const segment = await storage.createUserSegment({
        name,
        criteria,
        description,
        createdBy: req.teamMember.teamMemberId
      });

      res.status(201).json(segment);
    } catch (error) {
      console.error("Create segment error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/team/users/:id/ban", authenticateTeamMember, async (req: any, res) => {
    try {
      const userId = parseInt(req.params.id);
      const { reason } = req.body;

      if (!reason) {
        return res.status(400).json({ error: "Ban reason is required" });
      }

      // Update user ban status
      const user = await storage.updateUserBanStatus(userId, true, reason);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Create ban report
      await storage.createBanReport({
        userId,
        teamMemberId: req.teamMember.teamMemberId,
        reason,
        action: 'ban'
      });

      res.json({ message: "User banned successfully", user });
    } catch (error) {
      console.error("Ban user error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/team/users/:id/unban", authenticateTeamMember, async (req: any, res) => {
    try {
      const userId = parseInt(req.params.id);
      const { reason } = req.body;

      if (!reason) {
        return res.status(400).json({ error: "Unban reason is required" });
      }

      // Update user ban status
      const user = await storage.updateUserBanStatus(userId, false);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Create unban report
      await storage.createBanReport({
        userId,
        teamMemberId: req.teamMember.teamMemberId,
        reason,
        action: 'unban'
      });

      res.json({ message: "User unbanned successfully", user });
    } catch (error) {
      console.error("Unban user error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Contact messages routes (for Inbox page)
  app.get("/api/team/messages", authenticateTeamMember, async (req: any, res) => {
    try {
      const messages = await storage.getAllContactMessages();
      res.json(messages);
    } catch (error) {
      console.error("Messages error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/team/messages/:id/read", authenticateTeamMember, async (req: any, res) => {
    try {
      const messageId = parseInt(req.params.id);
      const message = await storage.markMessageAsRead(messageId);

      if (!message) {
        return res.status(404).json({ error: "Message not found" });
      }

      res.json({ message: "Message marked as read", data: message });
    } catch (error) {
      console.error("Mark message read error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Team chat routes (for Team Hub page)
  app.get("/api/team/chat", authenticateTeamMember, async (req: any, res) => {
    try {
      const { search, limit = 50, offset = 0 } = req.query;
      const chats = await storage.getAllTeamChats(search, parseInt(limit), parseInt(offset));
      res.json(chats);
    } catch (error) {
      console.error("Chats error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/team/chat", authenticateTeamMember, async (req: any, res) => {
    try {
      const { message, replyTo } = req.body;

      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const chat = await storage.createTeamChat({
        senderId: req.teamMember.teamMemberId,
        message,
        replyTo: replyTo || null
      });

      // Get sender info for real-time broadcast
      const sender = await storage.getTeamMember(req.teamMember.teamMemberId);
      const chatWithSender = {
        ...chat,
        senderName: sender?.name,
        senderRole: sender?.role
      };

      // Broadcast to all connected team members
      const io = req.app.get('io');
      if (io) {
        io.to('team-chat').emit('new-message', chatWithSender);
      }

      res.status(201).json(chat);
    } catch (error) {
      console.error("Create chat error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // File upload for chat
  app.post("/api/team/chat/upload", authenticateTeamMember, upload.single('file'), async (req: any, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const { message = '', replyTo } = req.body;

      const chat = await storage.createTeamChat({
        senderId: req.teamMember.teamMemberId,
        message: message || `Sent a file: ${req.file.originalname}`,
        fileUrl: `/uploads/${req.file.filename}`,
        fileName: req.file.originalname,
        fileSize: req.file.size,
        replyTo: replyTo || null
      });

      // Get sender info for real-time broadcast
      const sender = await storage.getTeamMember(req.teamMember.teamMemberId);
      const chatWithSender = {
        ...chat,
        senderName: sender?.name,
        senderRole: sender?.role
      };

      // Broadcast to all connected team members
      const io = req.app.get('io');
      if (io) {
        io.to('team-chat').emit('new-message', chatWithSender);
      }

      res.status(201).json(chat);
    } catch (error) {
      console.error("File upload error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Mark message as read
  app.put("/api/team/chat/:id/read", authenticateTeamMember, async (req: any, res) => {
    try {
      const messageId = parseInt(req.params.id);
      const chat = await storage.markChatAsRead(messageId, req.teamMember.teamMemberId);

      if (!chat) {
        return res.status(404).json({ error: "Message not found" });
      }

      res.json(chat);
    } catch (error) {
      console.error("Mark message read error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Search messages
  app.get("/api/team/chat/search", authenticateTeamMember, async (req: any, res) => {
    try {
      const { q, limit = 20 } = req.query;

      if (!q) {
        return res.status(400).json({ error: "Search query required" });
      }

      const messages = await storage.searchTeamChats(q, parseInt(limit));
      res.json(messages);
    } catch (error) {
      console.error("Search messages error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Edit message
  app.put("/api/team/chat/:id", authenticateTeamMember, async (req: any, res) => {
    try {
      const messageId = parseInt(req.params.id);
      const { message } = req.body;

      if (!message) {
        return res.status(400).json({ error: "Message content is required" });
      }

      const chat = await storage.updateTeamChat(messageId, message, req.teamMember.teamMemberId);

      if (!chat) {
        return res.status(404).json({ error: "Message not found or unauthorized" });
      }

      // Broadcast edit to all connected team members
      const io = req.app.get('io');
      if (io) {
        io.to('team-chat').emit('message-edited', chat);
      }

      res.json(chat);
    } catch (error) {
      console.error("Edit message error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Delete message
  app.delete("/api/team/chat/:id", authenticateTeamMember, async (req: any, res) => {
    try {
      const messageId = parseInt(req.params.id);

      const success = await storage.deleteTeamChat(messageId, req.teamMember.teamMemberId);

      if (!success) {
        return res.status(404).json({ error: "Message not found or unauthorized" });
      }

      // Broadcast deletion to all connected team members
      const io = req.app.get('io');
      if (io) {
        io.to('team-chat').emit('message-deleted', { messageId });
      }

      res.json({ message: "Message deleted successfully" });
    } catch (error) {
      console.error("Delete message error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Serve uploaded files
  app.get("/uploads/:filename", (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(uploadDir, filename);

    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).json({ error: "File not found" });
    }
  });

  // Team Hub routes (CEO only)
  app.get("/api/team/members", authenticateTeamMember, async (req: any, res) => {
    try {
      // Check if user is CEO
      if (req.teamMember.role !== 'ceo') {
        return res.status(403).json({ error: "CEO access required" });
      }

      const members = await storage.getAllTeamMembers();
      // Remove passwords from response
      const safeMembers = members.map(member => ({
        id: member.id,
        name: member.name,
        email: member.email,
        role: member.role,
        isActive: member.isActive,
        createdAt: member.createdAt
      }));

      res.json(safeMembers);
    } catch (error) {
      console.error("Team members error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/team/members/:id/password", authenticateTeamMember, async (req: any, res) => {
    try {
      // Check if user is CEO
      if (req.teamMember.role !== 'ceo') {
        return res.status(403).json({ error: "CEO access required" });
      }

      const memberId = parseInt(req.params.id);
      const { newPassword } = req.body;

      if (!newPassword) {
        return res.status(400).json({ error: "New password is required" });
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update password
      const member = await storage.updateTeamMemberPassword(memberId, hashedPassword);

      if (!member) {
        return res.status(404).json({ error: "Team member not found" });
      }

      res.json({ message: "Password updated successfully" });
    } catch (error) {
      console.error("Update password error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Contact form route (public)
  app.post("/api/contact", async (req, res) => {
    try {
      const messageData = insertContactMessageSchema.parse(req.body);

      const message = await storage.createContactMessage(messageData);
      res.status(201).json({ message: "Message sent successfully" });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(400).json({ error: "Invalid message data" });
    }
  });

  // User routes
  app.get("/api/user/profile", authenticateToken, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        totalEarnings: user.totalEarnings,
        isActive: user.isActive,
        createdAt: user.createdAt
      });
    } catch (error) {
      console.error("Profile error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Task routes
  app.get("/api/tasks", authenticateToken, async (req: any, res) => {
    try {
      const tasks = await storage.getUserTasks(req.user.userId);
      res.json(tasks);
    } catch (error) {
      console.error("Tasks error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/tasks", authenticateToken, async (req: any, res) => {
    try {
      const taskData = insertTaskSchema.parse({
        ...req.body,
        userId: req.user.userId
      });

      const task = await storage.createTask(taskData);
      res.status(201).json(task);
    } catch (error) {
      console.error("Create task error:", error);
      res.status(400).json({ error: "Invalid task data" });
    }
  });

  app.patch("/api/tasks/:id/status", authenticateToken, async (req: any, res) => {
    try {
      const taskId = parseInt(req.params.id);
      const { status } = req.body;

      if (!status || !['pending', 'completed', 'failed'].includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
      }

      const task = await storage.updateTaskStatus(taskId, status);

      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      res.json(task);
    } catch (error) {
      console.error("Update task error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Payout routes
  app.get("/api/payouts", authenticateToken, async (req: any, res) => {
    try {
      const payouts = await storage.getUserPayouts(req.user.userId);
      res.json(payouts);
    } catch (error) {
      console.error("Payouts error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/payouts", authenticateToken, async (req: any, res) => {
    try {
      const payoutData = insertPayoutSchema.parse({
        ...req.body,
        userId: req.user.userId
      });

      const payout = await storage.createPayout(payoutData);
      res.status(201).json(payout);
    } catch (error) {
      console.error("Create payout error:", error);
      res.status(400).json({ error: "Invalid payout data" });
    }
  });

  // Get user segments
  app.get('/api/team/segments', authenticateTeamMember, async (req, res) => {
    try {
      const segments = await storage.getUserSegments();
      res.json(segments);
    } catch (error) {
      console.error('Error fetching segments:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Bulk user operations
  app.post('/api/team/users/bulk', authenticateTeamMember, async (req, res) => {
    try {
      const { operation, userIds, reason } = req.body;
      const teamMemberId = (req as any).teamMember.teamMemberId;

      if (!operation || !userIds || !Array.isArray(userIds) || userIds.length === 0) {
        return res.status(400).json({ error: 'Invalid operation or user IDs' });
      }

      if ((operation === 'ban' || operation === 'unban') && !reason?.trim()) {
        return res.status(400).json({ error: 'Reason is required for ban/unban operations' });
      }
      // Execute bulk operation      let result;
      switch (operation) {        case 'ban':
          result = await storage.bulkBanUsers(userIds, reason, teamMemberId);
          break;
        case 'unban':
          result = await storage.bulkUnbanUsers(userIds, reason, teamMemberId);
          break;
        case 'activate':
          result = await storage.bulkActivateUsers(userIds);
          break;
        case 'deactivate':
          result = await storage.bulkDeactivateUsers(userIds);
          break;
        default:
          return res.status(400).json({ error: 'Invalid operation' });
      }
      res.json({ success: true, affectedUsers: result.length });
    } catch (error) {
      console.error('Error executing bulk operation:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Export users
  app.post('/api/team/users/export', authenticateTeamMember, async (req, res) => {
    try {
      const { userIds } = req.body;
      const users = await storage.getUsersForExport(userIds);

      // Generate CSV content
      const csvHeader = 'ID,Username,Email,First Name,Last Name,Total Earnings,Status,Created At\n';
      const csvRows = users.map(user => 
        `${user.id},"${user.username}","${user.email}","${user.firstName || ''}","${user.lastName || ''}","${user.totalEarnings || '0.00'}","${user.isActive ? 'Active' : 'Inactive'}","${user.createdAt}"`
      ).join('\n');

      const csvContent = csvHeader + csvRows;

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="users_export.csv"');
      res.send(csvContent);
    } catch (error) {
      console.error('Error exporting users:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Bulk operations endpoint
app.post('/api/team/users/bulk', authenticateTeamMember, async (req, res) => {
  try {
    const { operation, userIds, reason } = req.body;
    
    if (!operation || !userIds || !Array.isArray(userIds)) {
      return res.status(400).json({ error: 'Invalid bulk operation data' });
    }

    const timestamp = new Date().toISOString();
    const teamMember = req.teamMember;

    for (const userId of userIds) {
      let updateData: any = {};
      
      switch (operation) {
        case 'ban':
          updateData = { 
            is_banned: true, 
            ban_reason: reason || 'Banned by team member',
            banned_at: timestamp,
            banned_by: teamMember.id
          };
          break;
        case 'unban':
          updateData = { 
            is_banned: false, 
            ban_reason: null,
            banned_at: null,
            banned_by: null
          };
          break;
        case 'activate':
          updateData = { 
            is_active: true,
            deactivated_at: null,
            deactivated_by: null,
            deactivation_reason: null
          };
          break;
        case 'deactivate':
          updateData = { 
            is_active: false,
            deactivated_at: timestamp,
            deactivated_by: teamMember.id,
            deactivation_reason: reason || 'Deactivated by team member'
          };
          break;
        default:
          continue;
      }

      await storage.updateUser(userId, updateData);
      
      // Log the action
      await storage.logBulkOperation({
        operation,
        affected_users: 1,
        reason: reason || `Bulk ${operation} operation`,
        performed_by: teamMember.username,
        team_member_id: teamMember.id
      });
    }

    res.json({ 
      success: true, 
      message: `Successfully ${operation}ned ${userIds.length} user(s)`,
      affected_count: userIds.length 
    });
  } catch (error) {
    console.error('Bulk operation error:', error);
    res.status(500).json({ error: 'Failed to execute bulk operation' });
  }
});

// CSV Import endpoint
app.post('/api/team/users/import-csv', authenticateTeamMember, upload.single('csv'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No CSV file provided' });
    }

    const csvData = req.file.buffer.toString('utf-8');
    const lines = csvData.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(h => h.trim());
    
    let importedCount = 0;
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      if (values.length < headers.length) continue;
      
      const userData: any = {};
      headers.forEach((header, index) => {
        userData[header.toLowerCase()] = values[index];
      });
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(userData.username);
      if (!existingUser && userData.username && userData.email) {
        await storage.createUser({
          username: userData.username,
          email: userData.email,
          password: userData.password || 'default123',
          full_name: userData.full_name || userData.username
        });
        importedCount++;
      }
    }

    await storage.logBulkOperation({
      operation: 'import',
      affected_users: importedCount,
      reason: `CSV import - ${importedCount} users imported`,
      performed_by: req.teamMember.username,
      team_member_id: req.teamMember.id
    });

    res.json({ 
      success: true, 
      count: importedCount,
      message: `Successfully imported ${importedCount} users` 
    });
  } catch (error) {
    console.error('CSV import error:', error);
    res.status(500).json({ error: 'Failed to import CSV' });
  }
});

// CSV Export endpoint
app.post('/api/team/users/export-csv', authenticateTeamMember, async (req, res) => {
  try {
    const { userIds } = req.body;
    
    if (!userIds || !Array.isArray(userIds)) {
      return res.status(400).json({ error: 'No user IDs provided for export' });
    }

    const users = await storage.getUsersByIds(userIds);
    
    // Create CSV content
    const headers = ['id', 'username', 'email', 'full_name', 'is_active', 'is_banned', 'created_at'];
    const csvContent = [
      headers.join(','),
      ...users.map(user => headers.map(header => user[header] || '').join(','))
    ].join('\n');

    await storage.logBulkOperation({
      operation: 'export',
      affected_users: users.length,
      reason: `CSV export - ${users.length} users exported`,
      performed_by: req.teamMember.username,
      team_member_id: req.teamMember.id
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="users_export_${new Date().toISOString().split('T')[0]}.csv"`);
    res.send(csvContent);
  } catch (error) {
    console.error('CSV export error:', error);
    res.status(500).json({ error: 'Failed to export CSV' });
  }
});

// Google Sheets import endpoint
app.post('/api/team/users/import-sheets', authenticateTeamMember, async (req, res) => {
  try {
    const { sheetUrl } = req.body;
    
    if (!sheetUrl) {
      return res.status(400).json({ error: 'Google Sheets URL is required' });
    }

    // For demo purposes, we'll simulate the import
    // In a real implementation, you'd use Google Sheets API
    
    await storage.logBulkOperation({
      operation: 'sheets_import',
      affected_users: 0,
      reason: `Google Sheets import attempted from: ${sheetUrl}`,
      performed_by: req.teamMember.username,
      team_member_id: req.teamMember.id
    });

    res.json({ 
      success: true, 
      count: 0,
      message: 'Google Sheets import feature coming soon' 
    });
  } catch (error) {
    console.error('Google Sheets import error:', error);
    res.status(500).json({ error: 'Failed to import from Google Sheets' });
  }
});

// Google Sheets export endpoint
app.post('/api/team/users/export-sheets', authenticateTeamMember, async (req, res) => {
  try {
    const { userIds, sheetUrl } = req.body;
    
    if (!userIds || !Array.isArray(userIds) || !sheetUrl) {
      return res.status(400).json({ error: 'User IDs and Google Sheets URL are required' });
    }

    // For demo purposes, we'll simulate the export
    // In a real implementation, you'd use Google Sheets API
    
    await storage.logBulkOperation({
      operation: 'sheets_export',
      affected_users: userIds.length,
      reason: `Google Sheets export attempted to: ${sheetUrl}`,
      performed_by: req.teamMember.username,
      team_member_id: req.teamMember.id
    });

    res.json({ 
      success: true,
      message: 'Google Sheets export feature coming soon' 
    });
  } catch (error) {
    console.error('Google Sheets export error:', error);
    res.status(500).json({ error: 'Failed to export to Google Sheets' });
  }
});

// Get user activity logs
app.get('/api/team/users/:id/activity', authenticateTeamMember, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    // Mock activity data for now - implement actual activity logging later
    const activities = [
      {
        id: 1,
        action: 'account_created',
        details: 'User account was created',
        timestamp: new Date().toISOString()
      },
      {
        id: 2,
        action: 'profile_updated',
        details: 'User updated their profile information',
        timestamp: new Date(Date.now() - 86400000).toISOString()
      }
    ];

    res.json(activities);
  } catch (error) {
    console.error('User activity error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Export users to CSV
app.post('/api/team/users/export', authenticateTeamMember, async (req, res) => {
  try {
    const { userIds } = req.body;

    let users;
    if (userIds && userIds.length > 0) {
      // Export specific users
      const placeholders = userIds.map(() => '?').join(',');
      users = await storage.db.execute(sql`
        SELECT id, username, email, first_name, last_name, total_earnings, is_active, is_banned, created_at
        FROM user_accounts 
        WHERE id IN (${sql.raw(placeholders)})
      `, userIds);
    } else {
      // Export all users
      users = await storage.db.execute(sql`
        SELECT id, username, email, first_name, last_name, total_earnings, is_active, is_banned, created_at
        FROM user_accounts
      `);
    }

    // Generate CSV
    const csvHeader = 'ID,Username,Email,First Name,Last Name,Total Earnings,Active,Banned,Created At\n';
    const csvData = users.rows.map(user => 
      `${user.id},"${user.username}","${user.email}","${user.first_name || ''}","${user.last_name || ''}",${user.total_earnings},${user.is_active},${user.is_banned},"${user.created_at}"`
    ).join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="users_export.csv"');
    res.send(csvHeader + csvData);
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Ban individual user
app.post('/api/team/users/:id/ban', authenticateTeamMember, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { reason } = req.body;
    const teamMemberId = (req as any).teamMember.id;

    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    if (!reason?.trim()) {
      return res.status(400).json({ error: 'Reason is required' });
    }

    const result = await storage.banUser(userId, reason, teamMemberId);
    res.json({ message: 'User banned successfully', result });
  } catch (error) {
    console.error('Ban user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Unban individual user
app.post('/api/team/users/:id/unban', authenticateTeamMember, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { reason } = req.body;
    const teamMemberId = (req as any).teamMember.id;

    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    if (!reason?.trim()) {
      return res.status(400).json({ error: 'Reason is required' });
    }

    const result = await storage.unbanUser(userId, reason, teamMemberId);
    res.json({ message: 'User unbanned successfully', result });
  } catch (error) {
    console.error('Unban user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

  const httpServer = createServer(app);

  return httpServer;
}