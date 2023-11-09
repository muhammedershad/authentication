import express from 'express';
import adminController from '../controllers/admin_controller.js';

const router = express.Router();

router.post('/login', adminController.login )
router.get('/alluser', adminController.allUsers)
router.delete('/deleteuser/:id', adminController.deleteUser)
router.get('/logout', adminController.logout)
router.post('/edituser/id', adminController.editUser)

export default router;