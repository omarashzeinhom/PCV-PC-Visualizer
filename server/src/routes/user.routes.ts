import { Router } from 'express';
import {  getUser } from '../controllers/user.controller';

const router = Router();

// User routes

router.get('/users/:id', getUser);

export default router;
