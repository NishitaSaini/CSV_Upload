import mongoose from "mongoose";
import multer from "multer";
import path from "path";

const files_path = path.join('/uploads/files');

const csvSchema = new mongoose.Schema({
    filePath: {
        type: String,
    },
    originalName: {
        type: String
    },
    file:{
        type: String
    },
    // timestamps: true
});

// UPLOADING FILE USING MULTER
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
       cb(null, path.join(__dirname, "..", files_path));
    },
    filename: function (req, file, cb) {
       cb(null, file.fieldname + "-" + Date.now());
    },
 });

 const csvModel = mongoose.model("csvModel", csvSchema);
 export default csvModel;