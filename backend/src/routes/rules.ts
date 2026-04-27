import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { IsProjectOwner } from "../middleware/projectOwner.js";
import { createRulesController, editRulesController, getAllRulesController } from "../controller/rulesController.js";

const router = Router();


// to get all rules 
router.get("/",authMiddleware, IsProjectOwner,  getAllRulesController);

// to create the rules
router.post("/",authMiddleware, IsProjectOwner, createRulesController);


// to edit the rules
router.put("/ruleId",authMiddleware, IsProjectOwner , editRulesController);


export default router;