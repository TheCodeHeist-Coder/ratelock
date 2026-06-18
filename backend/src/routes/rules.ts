import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { IsProjectOwner } from "../middleware/projectOwner.js";
import { createRulesController, deleteRulesController, editRulesController, getAllRulesController } from "../controller/rulesController.js";

// mergeParams lets this router read :projectId from the parent mount
// (app mounts it at /api/v1/projects/:projectId/rules)
const router = Router({ mergeParams: true });


// to get all rules
router.get("/",authMiddleware, IsProjectOwner,  getAllRulesController);

// to create the rules
router.post("/",authMiddleware, IsProjectOwner, createRulesController);


// to edit the rules
router.put("/:ruleId",authMiddleware, IsProjectOwner , editRulesController);


// to delete the rules
router.delete("/:ruleId",authMiddleware, IsProjectOwner,  deleteRulesController);


export default router;