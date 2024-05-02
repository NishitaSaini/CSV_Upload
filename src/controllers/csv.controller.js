import csvModel from "../models/csv.model.js";
import multer from "multer";
import csv from "csv-parser";
import fs from "fs";
// import path from "path"
// const FILES_PATH = path.join("/uploads");

// Home
export const home = (async (req, res) => {
    try {
       let files = await csvModel.find({});
       res.render("home", {
          files: files,
       });
    } catch (err) {
       console.log(err);
    }
 });

 //Uploading the File
 // Set up multer for file uploads
 const upload = multer({ dest: 'src/uploads/' });
 
 export const uploadFile = async (req, res) => {
     try {
         upload.single('csvFile')(req, res, async function (err) {
             if (err) {
                 console.log("multer Error", err);
                 return res.status(400).json({
                     message: "Error in file upload :(",
                 });
             }
 
             if (req.file && req.file.mimetype === "text/csv") {
                 console.log("File uploaded", req.file);
                 try {
                     await csvModel.create({
                         filePath: req.file.path,
                         originalName: req.file.originalname,
                         file: req.file.filename,
                     });
                     console.log("File saved to database");
                     return res.redirect("/");
                 } catch (error) {
                     console.log("Error saving file to database:", error);
                     return res.status(500).json({
                         message: "Internal Server Error :(",
                     });
                 }
             } else {
                 console.log("File should be of CSV Format :|");
                 return res.redirect("/");
             }
         });
     } catch (err) {
         console.log("Error in uploadFile function:", err);
         return res.status(500).json({
             message: "Internal Server Error :(",
         });
     }
 };
 
 
// Deleting the File
export const deleteFile = async (req, res) => {
    try {
       const filename = req.params.file;
       let isFile = await csvModel.findOne({ file: filename });
 
       if (isFile) {
          await csvModel.deleteOne({ file: filename });
          console.log("file is deleted");
          return res.redirect("/");
       } else {
          console.log("file not found :(");
          return res.redirect("/");
       }
    } catch (error) {
       console.log(error);
       return res.statu(500).json({
          message: "Internal Server Error :(",
       });
    }
 };

 // Showing the File
export const showFile = async (req, res) => {
    // FIND THE FILE BY ID
    let filePATH = await csvModel.findById(req.query.file_id);
 
    const results = [];
    const header = [];
 
    // STREAMING THE FILE
    fs.createReadStream(filePATH.filePath)
       .pipe(csv())
       .on("headers", (headers) => {
          headers.map((head) => {
             header.push(head);
          });
          console.log("header => ", header);
       })
       .on("data", (data) => results.push(data))
       .on("end", () => {
          console.log(results.length);
          let page = req.query.page;
          console.log("page => ", req.query.page);
          let startSlice = (page - 1) * 100 + 1;
          let endSlice = page * 100;
          let sliceResults = [];
          let totalPages = Math.ceil(results.length / 100);
 
          if (endSlice < results.length) {
             sliceResults = results.slice(startSlice, endSlice + 1);
          } else {
             sliceResults = results.slice(startSlice);
          }
 
          res.render("file", {
             title: filePATH.originalName,
             head: header,
             data: sliceResults,
             length: results.length,
             page: req.query.page,
             totalPages: totalPages,
          });
       });
 };

