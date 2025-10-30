import express from "express"
import cors from "cors";

const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN
}))
app.use(express.json());



// router import
import userRouter from '../routes/user.routes.js'

app.use("/api/v1/users",userRouter);

export { app } ;