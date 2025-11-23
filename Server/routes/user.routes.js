import { Router } from "express";
import { register , getAllUser, getUserById,UpdateUser,DeleteUser} from "../controllers/user.controller.js";

const router = Router();


router.route("/users").get(getAllUser)
router.route("/register").post(register)
router.route("/users/:id").get(getUserById)
router.route("/users/:id/edit").put(UpdateUser)
router.route("/users/:id").delete(DeleteUser)

export default router