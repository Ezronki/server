const cloudinary = require("cloudinary").v2;
const multer = require("multer");
require("dotenv").config(); // Load environment variables

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // Ensure HTTPS URLs
});

// Set up memory storage for Multer
const storage = new multer.memoryStorage();
const upload = multer({ storage });

/**
 * Uploads an image to Cloudinary.
 * @param {string | Buffer} file - The image file (path or buffer).
 * @returns {Promise<Object>} - Returns Cloudinary upload result.
 */
async function imageUploadUtil(file) {
  try {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
      secure: true, // Ensure HTTPS URL
    });

    return {
      success: true,
      url: result.secure_url || result.url.replace(/^http:/, "https:"), // Ensure HTTPS
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return { success: false, error: error.message };
  }
}

module.exports = { upload, imageUploadUtil };