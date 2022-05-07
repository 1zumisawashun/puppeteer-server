import { Router } from 'express';
const router = Router();
import * as authController from '../controllers/authController';
import { validateParam } from '../middleware/validateMiddleware';

router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);
router.get('/signup', authController.signup_get);
router.post('/signup', validateParam(), authController.signup_post);

export default router;
