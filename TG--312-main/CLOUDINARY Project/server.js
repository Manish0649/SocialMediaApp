import express from "express";
const app  = express();
const port = 5000;
import cors from "cors";
import {upload,cloudinary }from "./middleware/multer.js";

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome Page!");
});

app.post("/upload",upload.single('image'), (req, res) => {
    console.log(req.file);
    res.json({ message: "File uploaded successfully!"});
});

app.delete("/delete",async (req, res) => {
    let {filename}= req.body;
    let response = await cloudinary.uploader.destroy(filename);
    console.log(response);
    res.json({ message: "File deleted successfully!"});
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});