import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from 'path';
dotenv.config();
const __dirname = path.resolve();

// import routes
// routes handlers
import User from "./route/user.js";
import Auction from "./route/auction.js";
import Bid from "./route/bid.js";
import ImageUpload from "./route/imageUpload.js";

// setup app
const server = express();

// setup middlewares
server.use(cors());
server.use(express.json({ limit: '50mb' }));
server.use('/uploads', express.static(path.join(__dirname, '/uploads')));
server.use(express.urlencoded({ extended: true, limit: '50mb', parameterLimit: 1000000 }))

// setup database
mongoose
  .connect(process.env.MONGO_URI)
  .then((conn) => console.log("Database connected..."))
  .catch((error) => console.error("Database error" + error));

// set up routes
server.use("/user", User);
server.use("/auction", Auction);
server.use("/bid", Bid);
server.use("/upload/image", ImageUpload);


if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  server.use(express.static('fronted/build'));

  // Express serve up index.html file if it doesn't recognize route
  server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}



// run app
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log("Server listening..."));