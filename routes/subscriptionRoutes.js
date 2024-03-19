// routes/subscriptions.js

import express from "express";
import
{uploadSubscription,
getSubscribersList} 
from '../controllers/subscriptionController.js'
import { requireSignIn } from "../middlewares/authMiddleware.js";
const router = express.Router();


router.post('/subscribe',requireSignIn, uploadSubscription);
router.get('/list', getSubscribersList);

export default router