import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { IsProjectOwner } from "../middleware/projectOwner.js";
import { CreateprojectAlertsController, deleteProjectAlertsController, getProjectAlertsController, updateProjectAlertsController } from "../controller/alertsController.js";

const router = Router();


router.get('/', authMiddleware, IsProjectOwner, getProjectAlertsController)

router.post('/', authMiddleware, IsProjectOwner, CreateprojectAlertsController)

router.patch('/:alertId', authMiddleware, IsProjectOwner, updateProjectAlertsController)

router.patch('/:alertId', authMiddleware, IsProjectOwner, deleteProjectAlertsController)



export default router;