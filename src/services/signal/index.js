import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { signalModel } from "../../schemas/signal.js";
import cloudinary from "../cloudinary/index.js"; // Correct the import path

dotenv.config();

export const addSignalRouteHandler = async (req, res) => {
  const {
    name,
    type,
    expire,
    future,
    entry,
    leverage,
    stop,
    take,
    move,
    action,
    image,
  } = req.body.data.attributes;

  try {
    // Create a new signal without the image URL to get the _id
    const newSignal = new signalModel({
      name,
      type,
      expire,
      future,
      entry,
      leverage,
      stop,
      take,
      move,
      action,
    });

    await newSignal.save();
    const signalId = newSignal._id.toString();
    // Upload image to Cloudinary using the signal _id as the public ID
    const uploadResult = await cloudinary.uploader.upload(image, {
      public_id: `${signalId}`, // Use the signal _id as the public ID
      folder: "signal"
    });

    // Update the signal with the image URL
    newSignal.image = uploadResult.secure_url;
    await newSignal.save();

    return res.status(200).json({
      message: "Signal added successfully",
      status: "ok",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while adding the signal",
      error: error.message,
    });
  }
};

export const getAllSignalRouteHandler = (req, res) => {
  signalModel.find({}, (err, data) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "An error occurred while fetching signals" });
    }
    return res.status(200).json(data);
  });
};

export const getSignalRouteHandler = (req, res) => {
  const { signalId } = req.params;
  signalModel
    .findById(signalId)
    .then((signal) => {
      if (!signal) {
        return res.status(404).json({ message: "Signal not found" });
      }
      return res.status(200).json(signal);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ message: err.message });
    });
};

export const patchSignalRouteHandler = async (req, res) => {
  const signalId = req.params.id;
  const {
    name,
    type,
    expire,
    future,
    entry,
    leverage,
    stop,
    take,
    move,
    action,
  } = req.body;

  try {
    const updatedSignal = await signalModel.findByIdAndUpdate(
      signalId,
      { name, type, expire, future, entry, leverage, stop, take, move, action },
      { new: true }
    );

    if (!updatedSignal) {
      return res.status(404).json({ message: "Signal not found" });
    }
    // Upload image to Cloudinary using the signal _id as the public ID
    const uploadResult = await cloudinary.uploader.upload(image, {
      public_id: `${signalId}`, // Use the signal _id as the public ID
      folder: "signal",
    });
    // Update the signal with the uploaded image
    await signalModel.findByIdAndUpdate(signalId, {
      image: uploadResult.secure_url,
    });

    return res.status(200).json(updatedSignal);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

export const deleteSignalRouteHandler = (req, res) => {
  const signalId = req.params.id;

  signalModel
    .findByIdAndDelete(signalId)
    .then((signal) => {
      if (!signal) {
        return res.status(404).json({ message: "Signal not found" });
      }
      //Delete image to Cloudinary
      cloudinary.uploader.destroy(`${signalId}`);
      return res.status(200).json({ message: "Signal deleted" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ message: err.message });
    });
};
