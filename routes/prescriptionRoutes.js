// routes/prescriptionRoutes.js

import express from 'express';
import multer from 'multer';
import Prescription from '../models/prescriptionModel.js';
import {
  getPrescription,
  prescriptionPhotoController,
  uploadPrescriptionWithUserInfo,
} from '../controllers/prescriptionController.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Set up multer storage for image upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Prescription image upload route with user information
router.post('/upload', upload.single('photo'), uploadPrescriptionWithUserInfo);

// Get all prescription route
router.get('/list', getPrescription);

// Get prescription photo by ID
router.get('/list/:preid', prescriptionPhotoController);

export default router;
