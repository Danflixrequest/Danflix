const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const Request = require("./models/Request");

app.get("/requests", async (req, res) => {
  const requests = await Request.find().sort({ createdAt: -1 });
  res.json(requests);
});

app.post("/requests", async (req, res) => {
  try {
    const request = new Request(req.body);
    await request.save();
    res.status(201).json(request);
  } catch (err) {
    res.status(400).json({ error: "Invalid request" });
  }
});

app.delete("/requests/:id", async (req, res) => {
  await Request.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

app.delete("/requests", async (req, res) => {
  await Request.deleteMany();
  res.status(204).send();
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server running");
    });
  })
  .catch((err) => console.error(err));
