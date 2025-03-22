const cloudinary = require("cloudinary").v2;
const multer = require("multer");
require('dotenv').config(); // Loads the variables from your .env file

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // Ensure URLs are generated with HTTPS
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return result.url; // This will now be an HTTPS URL
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };
