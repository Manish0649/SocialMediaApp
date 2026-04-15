import {CloudinaryStorage} from "multer-storage-cloudinary";
import multer from "multer";
import {v2 as cloudinary} from "cloudinary";

cloudinary.config({
  cloud_name: "djqgktvry",
  api_key: "869526749114468",
  api_secret: "pmtDCfREjyyydmmD_ESfLJ02j7c",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "G6uploads",
    resource_type: "auto"
    //allow_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

export { upload , cloudinary};