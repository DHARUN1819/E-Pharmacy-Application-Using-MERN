// controllers/prescriptionController.js
import fs from 'fs';
import Prescription from '../models/prescriptionModel.js';

export const getPrescription = async (req, res) => {
  try {
    const prescriptions = await Prescription
    .find({})
    .select("-photo");
    res.status(200).json({
      success: true,
      countTotal: prescriptions.length,
      message: "All prescriptions",
      prescriptions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in getting prescriptions",
      error: error.message,
    });
  }
};
export const prescriptionPhotoController = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.preid).select("photo");
    if (prescription.photo.data) {
      res.set("Content-type", prescription.photo.contentType);
      return res.status(200).send(prescription.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};


export const uploadPrescriptionWithUserInfo = async (req, res) => {
  try {
    const { name, phone, address } = req.fields;
    const { photo } = req.files;

    // Validate that the required fields are present
    switch (true) {
      case !name:
        return res.status(400).json({ success: false, error: 'Name is required' });
      case !phone:
        return res.status(400).json({ success: false, error: 'Phone is required' });
      case !address:
        return res.status(400).json({ success: false, error: 'Address is required' });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const newPrescription = new Prescription({
     ...req.fields
    });

    // If a photo is provided, set the photo data and content type
    if (photo) {
      newPrescription.photo.data = fs.readFileSync(photo.path);
      newPrescription.photo.contentType =photo.type;
    }

    await newPrescription.save();

    res.status(201).send({ success: true,
       message: 'Prescription uploaded successfully',
       newPrescription });
  } catch (error) {
    console.error(error);
    res.status(500).send({ 
      success: false,
      error,
      message: 'Internal server error' });
  }
};

