import express from 'express';
import { exportMVP } from '../controllers/exportController.js';
const router = express.Router();

router.post('/export', exportMVP);
export default router;
