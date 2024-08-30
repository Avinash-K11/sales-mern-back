import { Router } from 'express';

import signUpUser from './signUpUser.js';
import logIn from './logIn.js';

const router = Router();

router.post('/signup', signUpUser);

router.post('/login', logIn);

export default router;