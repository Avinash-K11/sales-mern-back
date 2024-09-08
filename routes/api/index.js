import { Router } from 'express';

import signUpUser from './signUpUser.js';
import logIn from './logIn.js';
import contactUS from './contactUS.js';

const router = Router();

router.post('/signup', signUpUser);

router.post('/login', logIn);

router.post('/contact', contactUS);

export default router;