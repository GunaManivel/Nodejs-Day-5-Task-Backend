import express from "express";
import {
  loginUser,
  registerUser,
  forgetPassword,
  getUserData,
  getDeals,
  bookTrip,
  editBooking,
  deleteBooking,
  getAllBookings,
} from "../Controllers/User.controller.js";

const router = express.Router();

router.post("/register", registerUser); //  route for register a user
router.post("/login", loginUser, (req, res, next) => {
  // Assuming you have the user's email after successful login
  const userEmail = req.body.Email;

  // Set the userEmail in the request object
  req.userEmail = userEmail;

  // Move to the next middleware
  next();
}); //  route for Login
router.post("/forget-password", forgetPassword); //  route for forget password
router.get("/userData", getUserData); // User data route

router.get("/bookings", getAllBookings); // Bookings route

router.get("/deals", getDeals); // Deals route

router.post("/bookTrip", bookTrip); // Book trip route
// PUT route for editing a booking
router.put("/bookings/:id", editBooking);

// DELETE route for deleting a booking
router.delete("/bookings/:id", deleteBooking);

export default router;
