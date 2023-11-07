import express from 'express';
import userController from '../controllers/user_controller.js'

const router = express.Router();

router.post('/signup', userController.signupRoute);
router.post('/login', userController.loginRoute);

export default router