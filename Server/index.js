import dotenv from 'dotenv'
import connectDB from "./Db/Connection.js"
import { app } from "./src/app.js"

// Configure dotenv before using process.env
dotenv.config({
    path: './.env'
})

// Add basic error handling for uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

// Add graceful shutdown
const server = connectDB()
    .then(() => {
        // Improve error logging
        app.on("error", (error) => {
            console.error("Server error:", error);
            process.exit(1);
        })

        return app.listen(process.env.PORT || 4000, () => {
            console.log(`Database connection SUCCESSFUL!`);
            console.log(`Server is running on port: ${process.env.PORT || 4000}`);
            console.log(`Visit: http://localhost:${process.env.PORT || 4000}`);
        })
    })
    .catch((error) => {
        console.error("DATABASE CONNECTION FAILED:", error);
        process.exit(1);
    });

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('Received SIGTERM. Performing graceful shutdown...');
    server.close(() => {
        console.log('Server closed. Exiting process.');
        process.exit(0);
    });
});




