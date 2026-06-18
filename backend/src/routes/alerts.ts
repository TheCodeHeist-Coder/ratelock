import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { IsProjectOwner } from "../middleware/projectOwner.js";
import { CreateprojectAlertsController, deleteProjectAlertsController, getProjectAlertsController, updateProjectAlertsController } from "../controller/alertsController.js";

// mergeParams lets this router read :projectId from the parent mount
// (app mounts it at /api/v1/projects/:projectId/alerts)
const router = Router({ mergeParams: true });


router.get('/', authMiddleware, IsProjectOwner, getProjectAlertsController)

router.post('/', authMiddleware, IsProjectOwner, CreateprojectAlertsController)

router.patch('/:alertId', authMiddleware, IsProjectOwner, updateProjectAlertsController)

router.delete('/:alertId', authMiddleware, IsProjectOwner, deleteProjectAlertsController)



export default router;