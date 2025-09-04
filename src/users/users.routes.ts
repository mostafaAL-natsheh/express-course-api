import { Router } from "express";
import { getProfile, updateProfile, createCoach } from "./users.controller";
import { authenticateToken, authorizeRoles } from "../shared/middlewares";

const router = Router();

router.get("/me", authenticateToken, getProfile);
router.put("/me", authenticateToken, updateProfile);
router.post("/coach", authenticateToken, authorizeRoles("ADMIN"), createCoach);

export default router;