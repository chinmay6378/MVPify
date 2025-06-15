import express from 'express';
import { generateFeatures } from '../controllers/featuresController.js';

const router = express.Router();
router.post('/features', generateFeatures);

export default router;
