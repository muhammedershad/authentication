import express from 'express';
import adminController from '../controllers/admin_controller.js';

const router = express.Router();

router.post('/login', adminController.login )
router.get('/alluser', adminController.allUsers)

export default router;