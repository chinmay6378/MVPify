import express from 'express';
import { generateAuthTemplate } from '../controllers/authController.js';
const router = express.Router();

router.post('/auth-template', generateAuthTemplate);
export default router;
