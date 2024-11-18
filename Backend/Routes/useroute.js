import express from 'express';
const router = express.Router();

import {login, signup} from '../Controller/AuthUser.js';

router.post("/signup", signup);
router.post("/login", login);

export default router;