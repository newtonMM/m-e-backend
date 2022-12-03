import express from "express";
import bodyparser from "body-parser";

import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";

const app = express();

app.use(bodyparser.json());

app.use("/auth", authRoutes);

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
