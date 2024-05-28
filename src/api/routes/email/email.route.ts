import { Router } from 'express';
import { hello, sendEmail } from './email.controller';

const router = Router();

router.get('/', hello);
router.post('/send', sendEmail);

export default router;
