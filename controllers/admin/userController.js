// userController.js
const User = require("../../models/User"); // Import your User model

// Function to update user balance by email
const updateUserBalance = async (req, res) => {
  const { email, balance } = req.body;

  try {
    // Find the user by email and update their balance
    const user = await User.findOneAndUpdate(
      { email },
      { balance },
      { new: true } // Return the updated user
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Balance updated successfully", user });
  } catch (error) {
    console.error("Error updating balance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { updateUserBalance };