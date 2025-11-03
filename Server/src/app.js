import express from "express"
import cors from "cors";
// router import
import userRouter from '../routes/user.routes.js'

const app = express();

app.use(cors({
    origin: "*"
}))
app.use(express.json());
app.use(express.urlencoded({ extended : true})) // for form data 



app.use("/api/v1",userRouter);


export { app };