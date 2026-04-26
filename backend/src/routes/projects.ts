import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { createUserProjectsController, deleteProjectController, EditProjectController, getProjectsController, getTheSpecificProjectController } from "../controller/projectsController";
import { IsProjectOwner } from "../middleware/projectOwner";

const router = Router();


// to get all projects of a user
router.get("/",authMiddleware, getProjectsController);


// to create a new project for a user
router.post("/", authMiddleware, createUserProjectsController);



// to get the specific project 
router.post("/:projectId", authMiddleware, IsProjectOwner,  getTheSpecificProjectController);


// to update or edit the project details
router.put("/:projectId", authMiddleware, IsProjectOwner, EditProjectController);


// to delete the project
router.delete("/:projectId", authMiddleware, IsProjectOwner, deleteProjectController)

export default router;