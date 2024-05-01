import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import csvRoutes from "./src/routes/csv.route.js";
import dotenv from "dotenv";
import {connnectToMongoose} from "./src/config/mongoose.js";

dotenv.config();


const port = process.env.PORT;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set the view engine to EJS
app.set('view engine', 'ejs');
// Set views directory
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// // Serve static files from the 'uploads' folder
// app.use('/src/uploads', express.static('/src/uploads'));

// app.use(express.static("./public"));
app.use(express.static(path.join(__dirname, 'src', 'public')));

// Use CSV routes
app.use('/api/csv', csvRoutes);

app.listen(port, () => {
    connnectToMongoose()
    console.log(`Server is running on port: ${port}`);
});