import { Router } from 'express';

import signUpUser from './signUpUser.js';
import logIn from './logIn.js';
import logout from './logout.js';

const router = Router();

router.post('/signup', signUpUser);

router.post('/login', logIn);

router.post('/logout', logout);

export default router;