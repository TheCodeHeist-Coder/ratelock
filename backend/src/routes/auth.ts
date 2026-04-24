import { Router, type Request, type Response } from "express";
import { userLoginController, userRegisterController } from "../controller/authController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post('/register', userRegisterController);

router.post('/login', userLoginController);

router.get('/me', authMiddleware, (req: Request, res: Response) => {
    return res.json({ user: req.user });
})



export default router;