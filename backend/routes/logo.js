import express from 'express';
import { generateLogo } from '../controllers/logoController.js';

const router = express.Router();
router.post('/logo', generateLogo);

export default router;
