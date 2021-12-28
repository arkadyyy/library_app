const mongoose = require("mongoose");

const BookSchema = mongoose.Schema(
  {
    book_name: { type: String },
    author: { type: String },
    categories: [
      {
        type: String,
      },
    ],
    price: { type: Number },
    book_pic: [{ type: String }],
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
