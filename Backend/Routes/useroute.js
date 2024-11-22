import express from 'express';
const router = express.Router();

import {login, signup} from '../Controller/AuthUser.js';
import { sendEmail } from '../Controller/EmailService.js';

router.post("/signup", signup);
router.post("/login", login);
router.post('/sendmail', sendEmail);
export default router;