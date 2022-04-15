const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().split("T")[0] + "_" + file.originalname);
  },
});

const fileFiltering = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    // reject a file
    cb(new Error("INVALID_FILE_FORMAT"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
  fileFilter: fileFiltering,
});

module.exports = upload;
