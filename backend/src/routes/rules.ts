import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { IsProjectOwner } from "../middleware/projectOwner.js";
import { getAllRulesController } from "../controller/rulesController.js";

const router = Router();


// to get all rules 
router.get("/",authMiddleware, IsProjectOwner,  getAllRulesController)




export default router;