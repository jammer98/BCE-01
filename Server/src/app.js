import express from "express"
import cors from "cors";

const app = express();

app.use(cors({
    origin:"http://localhost:5173/"
}))
app.use(express.json());
app.use(express.urlencoded({ extended : true})) // for form data 

// router import
import userRouter from '../routes/user.routes.js'

app.use("/api/v1/",userRouter);


export { app };