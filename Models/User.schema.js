import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  Username: String,
  Email: String,
  Password: String,
});

const User = mongoose.model("User", userSchema);
export default User;
