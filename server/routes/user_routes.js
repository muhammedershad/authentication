import express from 'express';
import userController from '../controllers/user_controller.js'
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/deleteuser/:id', verifyToken, userController.deleteUser)
router.get('/logout', userController.logout)
router.post('/update/:id', verifyToken, userController.updateUser)
router.post('/updateimage/:id', verifyToken, userController.updateImage)

export default router