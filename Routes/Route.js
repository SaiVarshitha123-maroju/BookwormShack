import express from 'express'
import { forgotPasswordController, loginController, registerController, testController } from '../Controllers/Controller.js';
import { requireSignIn,isAdmin } from '../middlewares/Middleware.js';

const router=express.Router();
router.post('/register',registerController)
router.post('/login',loginController)
router.post('/forgot-password',forgotPasswordController)
router.get('/test',requireSignIn,isAdmin,testController)
export default router;