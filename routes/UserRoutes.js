import express from "express";
import {
    getAllUsers,
    loginController,
    logoutUser,
    refreshAccessToken,
    registerController,
} from "../controllers/authController.js";
import { verifyJWT } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/users", getAllUsers);

router.post("/logout", verifyJWT, logoutUser)

router.post("/refresh-token", refreshAccessToken)



export default router;
