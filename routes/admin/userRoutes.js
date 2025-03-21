// userRoutes.js
const express = require("express");
const router = express.Router();
const { updateUserBalance } = require("../../controllers/admin/userController");

// Protect the route with admin middleware
router.put("/", updateUserBalance);

module.exports = router;