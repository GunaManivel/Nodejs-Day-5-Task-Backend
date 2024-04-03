import mongoose from "mongoose";

const dealSchema = new mongoose.Schema({
  name: String,
  description: String,
  discount: Number,
});

const Deal = mongoose.model("Deal", dealSchema);
export default Deal;
