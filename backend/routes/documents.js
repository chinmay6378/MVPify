import express from 'express';
import { generateDocs } from '../controllers/documentsController.js';

const router = express.Router();
router.post('/documents', generateDocs);

export default router;
