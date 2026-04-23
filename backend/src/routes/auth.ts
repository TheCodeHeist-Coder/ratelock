import { Router } from "express";
import { userRegisterController } from "../controller/authController";

const router = Router();

router.post('register', userRegisterController);



export default router;