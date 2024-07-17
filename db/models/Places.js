import mongoose from "mongoose";
const { Schema } = mongoose;

const placesSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String },
  image: { type: String },
  mapURL: { type: String },
  description: { type: String },
});

const Places = mongoose.models.Places || mongoose.model("Places", placesSchema);

export default Places;
