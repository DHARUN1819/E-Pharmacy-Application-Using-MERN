// controllers/prescriptionController.js

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
    const { name, phone, address } = req.body;

    // Validate that the required fields are present
    if (!name || !phone || !address || !req.file) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    // Create a new prescription document in MongoDB
    const newPrescription = new Prescription({
      name,
      phone,
      address,
      photo: {
        data: req.file.buffer, // Buffer containing the image data
        contentType: req.file.mimetype, // MIME type of the image
      },
    });

    // Save the prescription document
    await newPrescription.save();

    res.status(200).send({ success: true, message: 'Prescription and user information uploaded successfully' });
  } catch (error) {
    console.error('Error uploading prescription and user information:', error);
    res.status(500).send({ success: false, error: 'Internal server error' });
  }
};
