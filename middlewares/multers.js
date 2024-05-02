const multer = require('multer');

// Set up Multer storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Define the destination folder for uploaded files
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Define the filename for uploaded files
        cb(null, file.originalname);
    }
});

// Create the Multer instance
const upload = multer({ storage: storage });

// Export the upload object to use in your routes
module.exports = upload;
