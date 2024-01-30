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
import formidable from "express-formidable";

const router = express.Router();

// Set up multer storage for image upload


// Prescription image upload route with user information
router.post('/upload',requireSignIn,formidable(),uploadPrescriptionWithUserInfo);

// Get all prescription route
router.get('/list', getPrescription);

// Get prescription photo by ID
router.get('/list/:preid', prescriptionPhotoController);

export default router;
