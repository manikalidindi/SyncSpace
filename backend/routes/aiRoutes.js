import express from 'express';
import { generateAIResponse } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/generate', protect, generateAIResponse);

export default router;
