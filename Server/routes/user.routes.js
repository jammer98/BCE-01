import { Router } from "express";
import { register , getAllUser } from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(register)
router.route("/").get(getAllUser)

export default router