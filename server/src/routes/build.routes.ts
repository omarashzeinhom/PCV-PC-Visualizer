import { Router } from 'express';
import { createBuild, getUserBuilds } from '../controllers/build.controller';

const router = Router();

// Build routes
//router.post('/builds', createBuild);  // Creating a build
//router.get('/builds/:userId', getUserBuilds);  // Getting builds of a user

export default router;
