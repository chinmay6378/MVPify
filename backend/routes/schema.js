import express from 'express';
import { generateSchema } from '../controllers/schemaController.js';
const router = express.Router();

router.post('/schema', generateSchema);
export default router;
