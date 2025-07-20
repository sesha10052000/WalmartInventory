// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// Mongoose Schema and Model
const itemSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  sellerName: { type: String, required: true },
  sellerPhone: { type: String, required: true },
  sellerEmail: { type: String, required: true }
});

const Item = mongoose.model('Item', itemSchema);

// Routes
app.post('/items', async (req, res) => {
  try {
    const { productName, price, quantity, sellerName, sellerPhone, sellerEmail } = req.body;
    if (!productName || !price || !quantity || !sellerName || !sellerPhone || !sellerEmail) {
      return res.status(400).json({ message: "Please fill all fields." });
    }

    const newItem = new Item({ productName, price, quantity, sellerName, sellerPhone, sellerEmail });
    await newItem.save();
    res.status(201).json({ message: "Item added to inventory." });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
});

app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: "Error fetching items" });
  }
});



// Export app and Item model
module.exports = { app, Item };
