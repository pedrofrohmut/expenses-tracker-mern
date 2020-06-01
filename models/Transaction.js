const mongoose = require("mongoose")

const TransactionSchema = new mongoose.Schema({
  text: {
    type: String,
    trim: true,
    required: [true, "Please add some text"]
  },
  amount: {
    type: Number,
    required: [true, "Please add a positive or a negtive number"]
  },
  createAt: {
    type: Date,
    default: Date.Now
  }
})

module.exports = mongoose.model("Transaction", TransactionSchema)
