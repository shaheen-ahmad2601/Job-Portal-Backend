// const express = require('express'); // old way to import a file.
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotend from "dotenv";
import connectDB from "./utils/db.js"; // put .js otherwise it will show error messages
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicantRoute from "./routes/application.route.js"
dotend.config({});

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  Credentials: true,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicantRoute);


app.listen(PORT, () => {
  connectDB();
  console.log(`server listening on port ${PORT}`);
});
