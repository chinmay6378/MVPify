import express from 'express';
import { deployToVercel } from '../controllers/deployController.js';
const router = express.Router();

router.post('/deploy', deployToVercel);
export default router;
