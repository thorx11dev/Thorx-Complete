import express, { type Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const httpServer = await registerRoutes(app);

  // Add Socket.IO
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  // Store active team members with their socket IDs
  const activeMembers = new Map<string, number>(); // socketId -> teamMemberId
  const memberSockets = new Map<number, Set<string>>(); // teamMemberId -> Set of socketIds

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join-team', (teamMemberId: number) => {
      console.log(`Team member ${teamMemberId} joined team chat`);

      // Store the connection
      activeMembers.set(socket.id, teamMemberId);

      if (!memberSockets.has(teamMemberId)) {
        memberSockets.set(teamMemberId, new Set());
      }
      memberSockets.get(teamMemberId)!.add(socket.id);

      // Join team chat room
      socket.join('team-chat');

      // Notify others that this member is online
      socket.to('team-chat').emit('member-online', teamMemberId);

      // Send current online members to the newly joined user
      const onlineMembers = Array.from(memberSockets.keys());
      socket.emit('online-members', onlineMembers);
    });

    socket.on('typing', (data) => {
      socket.to('team-chat').emit('user-typing', data);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);

      const teamMemberId = activeMembers.get(socket.id);
      if (teamMemberId) {
        // Remove this socket from member's sockets
        const sockets = memberSockets.get(teamMemberId);
        if (sockets) {
          sockets.delete(socket.id);

          // If no more sockets for this member, they're offline
          if (sockets.size === 0) {
            memberSockets.delete(teamMemberId);
            socket.to('team-chat').emit('member-offline', teamMemberId);
          }
        }
      }

      activeMembers.delete(socket.id);
    });
  });

  // Make io available to routes
  app.set('io', io);

  const server = httpServer;

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();