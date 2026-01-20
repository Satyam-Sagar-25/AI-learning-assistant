import dotenv from 'dotenv'
dotenv.config();//so that we can use process.env.


import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import connectDB from "./config/db.js"
import errorHandler from "./middleware/errorHandler.js"

import authRoutes from "./routes/authRoutes.js"
import documentRoutes from "./routes/documentRoutes.js"
import flashcardRoutes from "./routes/flashcardRoutes.js"
import aiRoutes from "./routes/aiRoutes.js"
import quizRoutes from "./routes/quizRoutes.js"

//*ES6 module_dirname alternative
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//*Initialize express app
const app = express();

//*connect to MongoDB
connectDB();

//? Middlewares- Request aur response ke bich wala system(isko backend ke main file me dalte hai taki pura backend me aa jaye middleware)

//*Middlewares to handle CORS
app.use(
    cors({ // cross origin resource sharing
        origin:"*", // * -> Allows requests from any domain.
        methods: ["GET","POST","PUT","DELETE"],//Allows only these HTTP methods from cross-origin requests
        allowedHeaders:["Content-Type","Authorization"],//Content-Type → for JSON, form data, etc. etc.                                              //Authorization → for JWT tokens or auth headers
        credentials: true,//Allows cookies, authorization headers, or TLS client certificates to be sent in cross-origin requests.
    })
);
//!You cannot use origin: "*" together with credentials: true in real browsers.
//!The CORS spec forbids this. If credentials: true, you must use a specific origin:

app.use(express.json());//Without this, req.body would be undefined when you send JSON data
app.use(express.urlencoded({extended:true}));//This middleware lets Express read data that comes from HTML forms or requests sent with application/x-www-form-urlencoded content type.
//It parses the incoming request body and makes it available in: req.body

//* Static folder for uploads
app.use("/uploads",express.static(path.join(__dirname,"uploads")));//static files like pdf,image.This line makes the uploads folder publicly accessible so files inside it can be viewed or downloaded through the browser.

//Routes
app.use("/api/auth",authRoutes);
app.use("/api/documents",documentRoutes);
app.use("/api/flashcards",flashcardRoutes);
app.use("/api/ai",aiRoutes);
app.use("/api/quizzes",quizRoutes);




app.use(errorHandler);

//*404 handler
app.use((req,res)=>{//It runs when none of your defined routes match the incoming request.
    res.status(404).json({
        success:false,
        error:"Route not found",
        statusCode:404
    })
})

//*Start server
const PORT = process.env.PORT||8000;
app.listen(PORT,()=>{
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
})

process.on("unhandledRejection",(err)=>{ // No need to use try-catch 
    console.log(`Error: ${err.message}`);
    process.exit(1);
})