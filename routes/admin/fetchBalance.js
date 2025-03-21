const express = require('express');
const router = express.Router();
const User = require('../../models/User'); // Assuming you have a User model

// Route to fetch user's balance
router.get('/balance', async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you're using session or JWT to get the user ID

    // Find the user in the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Return the user's balance
    res.json({
      success: true,
      balance: user.balance, // Send the balance in the response
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
