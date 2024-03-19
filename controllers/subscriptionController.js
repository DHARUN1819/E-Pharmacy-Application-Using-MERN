// controllers/subscriptionController.js

import subscriptionModel from "../models/subscriptionModel.js";

export const uploadSubscription = async (req, res) => {
  try {
    // Check if the user already has a subscription
    const existingSubscription = await subscriptionModel.findOne({ userId: req.user._id });

    if (existingSubscription) {
      return res.status(400).json({ success: false, message: "You have already subscribed." });
    }

    // If the user doesn't have a subscription, proceed with creating a new one
    const { name, phone, address, months } = req.body;

    const subscription = new subscriptionModel({
   
      name,
      phone,
      address,
      months,
      userId: req.user._id
    });

    await subscription.save();

    res.json({ success: true, message: "Subscription Uploaded Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
export const getSubscribersList = async (req, res) => {
  try {
    // Fetch all subscriptions from the database
    const subscribers = await subscriptionModel.find();

    // Send the list of subscribers in the response
    res.json({ success: true, subscribers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};