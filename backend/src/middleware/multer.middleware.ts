import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
  console.log("File received:");
  console.log("Name:", file.originalname);
  console.log("MIME type:", file.mimetype);

  const isPdf =
    file.mimetype === "application/pdf" ||
    file.originalname.toLowerCase().endsWith(".pdf");

  if (isPdf) {
    cb(null, true);
  } else {
    cb(new Error(`Only PDF files are allowed. Received: ${file.mimetype}`));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

export  {upload};