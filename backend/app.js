import http from "http";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import { doubleCsrf } from "csrf-csrf";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";
import { initSocket } from "./socket/index.js";

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// CSRF protection using the double-submit cookie pattern
const { doubleCsrfProtection, generateToken } = doubleCsrf({
  getSecret: () => process.env.JWT_SECRET_KEY,
  cookieName: "x-csrf-token",
  cookieOptions: { sameSite: "strict", secure: process.env.NODE_ENV === "production", httpOnly: true },
  getTokenFromRequest: (req) => req.headers["x-csrf-token"],
});

// Expose a CSRF token endpoint (called by the frontend before any mutating request)
app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: generateToken(req, res) });
});

// Apply CSRF protection to all mutating routes
app.use(doubleCsrfProtection);

// Apply a global rate limit to all API routes to prevent abuse
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests, please try again later." },
});

// Stricter limit for authentication endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many login attempts, please try again later." },
});

app.use("/api", apiLimiter);
app.use("/api/auth", authLimiter, authRoute);
app.use("/api/posts", postRoute);
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

const PORT = process.env.PORT || 8800;

// Attach Socket.io to the same HTTP server so real-time chat shares the port
const server = http.createServer(app);
initSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
