import express from 'express';
import generateRoutes from './generate.js';
import schemaRoutes from './schema.js';

const router = express.Router();
router.use(generateRoutes);
router.use(schemaRoutes);

export default router;
import exportRoutes from './export.js';
router.use(exportRoutes);
import authRoutes from './auth.js';
router.use(authRoutes);
import featuresRoutes from './features.js';
router.use(featuresRoutes);
import deployRoutes from './deploy.js';
router.use(deployRoutes);
import logoRoutes from './logo.js';
router.use(logoRoutes);
import documentsRoutes from './documents.js';
router.use(documentsRoutes);
import roadmapRoutes from './roadmap.js';
router.use(roadmapRoutes);

