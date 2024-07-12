import mongoose from "mongoose";

const signalSchema = new mongoose.Schema({
  name: { required: true, type: String },
  type: { required: true, type: String },
  future: { required: true, type: Number },
  expire: { required: true, type: Date },
  leverage: { type: String },
  entry: { type: String },
  stop: { required: true, type: String },
  take: { required: true, type: String },
  move: { required: true, type: String },
  action: { required: true, type: String },
  image: { type: String },
  created_at: { type: Date },
  updated_at: { type: Date },
});

signalSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

signalSchema.set("toJSON", { virtuals: true });

export const signalModel = mongoose.model("Signal", signalSchema);
