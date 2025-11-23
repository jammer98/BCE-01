import express from "express"
import cors from "cors";
import userRouter from '../routes/user.routes.js'

const app = express();

// Security and parsing middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Health check route - move this BEFORE the API routes
app.get("/api/v1/health", (_, res) => {
    console.log("Health check endpoint hit");
    res.status(200).json({
        status: "success",
        message: "Server is healthy",
        timestamp: new Date().toISOString()
    });
});

// API routes
app.use("/api/v1", userRouter);

// Error handling middleware should be last
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: err.message
    });
});

export { app };