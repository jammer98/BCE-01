import { Router } from "express";
import { register , getAllUser, getUserById,UpdateUser} from "../controllers/user.controller.js";

const router = Router();


router.route("/users").get(getAllUser)
router.route("/register").post(register)
router.route("/users/:id").get(getUserById)
router.route("/users/:id").put(UpdateUser)
// router.route("/users/:id").put(updateUser)
// // router.get("/test/:id", (req, res) => res.json({ id: req.params.id })); // Should hit /api/v1/test/abc
// router.get("/debug/:id", (req, res) => {
//   res.json({ message: "Debug route hit", id: req.params.id });
// });

// router.get("/check", (req, res) => {
//   console.log("✅ /check route HIT");
//   res.send("✅ User router working!");
// });

// // Your existing: Works
// router.route("/users").get((req, res) => {
//   console.log("📋 /users route HIT");
//   getAllUser(req, res); // Call your controller
// });

// // Your existing: Works
// router.route("/register").post((req, res) => {
//   console.log("➕ /register route HIT");
//   register(req, res);
// });

// // NEW: Debug param route (NO controller dependency)
// router.get("/debug/:id", (req, res) => {
//   console.log(`🔍 /debug/:id route HIT with ID: ${req.params.id}`);
//   res.json({ 
//     message: "Debug route hit successfully!", 
//     id: req.params.id,
//     params: req.params // Full params object
//   });
// });

// // FIXED: Your single user route (with direct handler for now)
// router.get("/users/:id", (req, res) => {
//   console.log(`👤 /users/:id route HIT with ID: ${req.params.id}`);
//   // Temporarily bypass controller to test route only
//   res.json({ 
//     message: "Single user route hit!", 
//     id: req.params.id 
//   });
//   // TODO: Once this works, swap back to getUserById(req, res);
// });


export default router