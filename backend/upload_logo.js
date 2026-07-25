require('dotenv').config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

cloudinary.uploader.upload('../frontend/src/assets/Logo/Logo-Full-Light.png', { folder: 'LearnHub' }, (error, result) => {
  if (error) {
    console.error("Error uploading to Cloudinary:", error);
  } else {
    console.log("CLOUDINARY_URL:", result.secure_url);
  }
});
