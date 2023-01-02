import express from "express";
import bodyparser from "body-parser";

import mongoose from "mongoose";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import cropRoutes from "./routes/crop";
// import user from "../models/user";
const app = express();

app.use(bodyparser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/auth", authRoutes);
app.use("/profile", userRoutes);
app.use("/crop", cropRoutes);

// app.use((error, req, res, next) => {
//   console.log(error);
//   const status = error.statusCode || 500;
//   const message = error.message;
//   const data = error.data;
//   res.status(status).json({ message: message, data: data });
// });

mongoose
  .connect("mongodb+srv://Newty:Newty@mande.ppe24r2.mongodb.net/main")
  .then((result) => {
    app.listen(8000);
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

export default app;
