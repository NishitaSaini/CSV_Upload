import express from "express";
import multer from "multer";
// import fs from "fs";
import * as csvController from "../controllers/csv.controller.js";

const router = express.Router();
// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Home Page
router.get("/", csvController.home);
// Upload CSV file
router.post("/upload", csvController.uploadFile);
// Delete a CSV File
router.get("/delete/:file", csvController.deleteFile);
// Show The CSV File
router.get("/view", csvController.showFile);

export default router; 