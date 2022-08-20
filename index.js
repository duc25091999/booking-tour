const express = require('express')
const app = express()
var cors = require('cors')
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRoute = require("./routes/auth/auth");

app.use(cors());
dotenv.config();
app.use(express.json());

const PORT = 3000
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(
    MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Connected to MongoDB");
    }
);

app.use("/api/auth", authRoute);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})