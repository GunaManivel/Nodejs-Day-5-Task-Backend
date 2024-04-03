import User from "../Models/User.schema.js";

import Booking from "../Models/Booking.schema.js"; // Import your Booking model
import Deal from "../Models/Deal.schema.js"; // Import your Deal model
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

// Function to register a new User

export const registerUser = async (req, res) => {
  try {
    const { Username, Email, Password } = req.body;
    if (!Username || !Email || !Password) {
      return res
        .status(400)
        .json({ error: "Username, email, and password are required." });
    }

    // Check if user with provided email or username already exists
    const existingUser = await User.findOne({ $or: [{ Username }, { Email }] });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists." });
    }

    const hashpassword = await bcrypt.hash(Password, 10); // Hash the user's password
    if (!hashpassword) {
      return res.status(500).json({ error: "Failed to hash password." });
    }

    console.log("Hashed Password: ", hashpassword);
    const newUser = new User({ Username, Email, Password: hashpassword });
    await newUser.save();
    res
      .status(200)
      .json({ message: "Registration successful!!", data: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Function to login an Existing User

export const loginUser = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    // Check if email and password are provided
    if (!Email || !Password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    // Find the user by email
    const user = await User.findOne({ Email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(Password, user.Password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password." });
    }

    // Generate JWT token
    // const token = jwt.sign({ userId: user._id }, "your_secret_key", {
    //   expiresIn: "1h",
    // });

    // Send the token as response
    res.status(200).json({ message: "Login successful!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to handle forget password request
export const forgetPassword = async (req, res) => {
  try {
    const { Email } = req.body;
    const user = await User.findOne({ Email });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Generate a random string for the reset link
    const resetToken =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    user.resetToken = resetToken;
    await user.save();

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.Email,
        pass: process.env.Password,
      },
    });

    // Construct the reset link
    const resetLink = `http://yourdomain.com/reset-password?token=${resetToken}`; // Replace yourdomain.com with your actual domain

    // Send email with reset link
    await transporter.sendMail({
      from: process.env.Email, // Your Gmail address from .env
      to: user.Email,
      subject: "Password Reset Link",
      text: `Please click on the following link to reset your password: ${resetLink}`,
    });

    res.status(200).json({ message: "Reset link sent successfully." });
  } catch (error) {
    console.error("Error in forgetPassword:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Function to get user data
export const getUserData = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // Fetch all users except their passwords
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Function to get bookings of the logged-in user
export const getAllBookings = async (req, res) => {
  try {
    // Find all bookings
    const bookings = await Booking.find();

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to get deals
export const getDeals = async (req, res) => {
  try {
    const deals = await Deal.find(); // Fetch all deals
    res.status(200).json(deals);
  } catch (error) {
    console.error("Error fetching deals:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to book a trip
export const bookTrip = async (req, res) => {
  try {
    const { name, destination, email, date } = req.body;
    const newBooking = new Booking({ name, destination, email, date }); // Create a new booking object
    await newBooking.save(); // Save the booking to the database
    res.status(200).json({ message: "Trip booked successfully." });
  } catch (error) {
    console.error("Error booking trip:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Controller function to edit a booking
export const editBooking = async (req, res) => {
  const { id } = req.params;
  const { name, destination, email, date, notes } = req.body;

  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Update booking fields
    booking.name = name;
    booking.destination = destination;
    booking.email = email;
    booking.date = date;
    booking.notes = notes;

    // Save updated booking
    await booking.save();

    res.status(200).json(booking);
  } catch (error) {
    console.error("Error editing booking:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to delete a booking
export const deleteBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBooking = await Booking.findByIdAndDelete(id);
    if (!deletedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
