import express from 'express';
import { generateCopy } from '../controllers/generateController.js';
const router = express.Router();

router.post('/generate-copy', generateCopy);
export default router;
