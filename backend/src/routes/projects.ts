import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { createUserProjectsController, getProjectsController, getTheSpecificProjectController } from "../controller/projectsController";

const router = Router();


// to get all projects of a user
router.get("/",authMiddleware, getProjectsController);


// to create a new project for a user
router.post("/", authMiddleware, createUserProjectsController);



// to get the specific project 
router.post("/:projectId", authMiddleware, getTheSpecificProjectController);


export default router;