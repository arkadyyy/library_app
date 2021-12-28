const mongoose = require("mongoose");

const SoldSchema = mongoose.Schema(
  {
    book_id: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Sold = mongoose.model("Sold", SoldSchema);

module.exports = Sold;
