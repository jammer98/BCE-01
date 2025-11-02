import { Router } from "express";
import { register , getAllUser } from "../controllers/user.controller.js";

const router = Router();

router.route("/users").get(getAllUser)
router.route("/register").post(register)


export default router 