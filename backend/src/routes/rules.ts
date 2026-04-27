import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { IsProjectOwner } from "../middleware/projectOwner.js";
import { createRulesController, getAllRulesController } from "../controller/rulesController.js";

const router = Router();


// to get all rules 
router.get("/",authMiddleware, IsProjectOwner,  getAllRulesController)

// to create the rules
router.post("/", createRulesController)



export default router;