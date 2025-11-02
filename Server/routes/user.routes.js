import { Router } from "express";
import { register , getAllUser , getUserById} from "../controllers/user.controller.js";

const router = Router();

router.route("/users").get(getAllUser)
router.route("/register").post(register)
router.route("/users/:id").get(getUserById);


export default router 