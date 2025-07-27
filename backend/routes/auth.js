import { Router } from 'express';
const router = Router();
import {registerUser,loginUser} from '../controllers/userController.js';

//Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

export default router;