import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { IsProjectOwner } from "../middleware/projectOwner.js";
import { createRulesController, deleteRulesController, editRulesController, getAllRulesController } from "../controller/rulesController.js";

const router = Router();


// to get all rules 
router.get("/",authMiddleware, IsProjectOwner,  getAllRulesController);

// to create the rules
router.post("/",authMiddleware, IsProjectOwner, createRulesController);


// to edit the rules
router.put("/:ruleId",authMiddleware, IsProjectOwner , editRulesController);


// to delete the rules
router.delete("/:ruleId",authMiddleware, IsProjectOwner,  deleteRulesController);


export default router;