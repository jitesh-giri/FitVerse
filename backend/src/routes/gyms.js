import express from 'express';
import { getNearbyGyms } from '../controllers/gymController.js';

const router = express.Router();

// GET /api/gyms/nearby
router.get('/nearby', getNearbyGyms);

export default router;
