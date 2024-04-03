import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  name: String,
  destination: String,
  email: String,
  date: Date,
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
