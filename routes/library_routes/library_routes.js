const express = require("express");
require("dotenv").config();
const Book = require("../../models/library_models/library_models");

const book_router = express.Router();

book_router.get("/all_books", async (req, res, next) => {
  try {
    const books = await Book.find({});
    console.log("books : ", books);
    res.status(200).send(books);
  } catch (e) {
    next(e);
  }
});

book_router.get("/download", (req, res, next) => {
  const { book_id } = req.query;
  console.log("book_id : ", book_id);
  res.contentType("application/pdf");
  res.download(`./books/${book_id}.pdf`);
});

book_router.post("/search_book", async (req, res, next) => {
  const { search_type, val } = req.body;
  console.log({ search_type, val });
  try {
    const regex = new RegExp(val, "i");
    const result = await Book.find({
      [search_type === "Name" ? "book_name" : search_type.toLowerCase()]: {
        $regex: regex,
      },
    });
    console.log(result);
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
});

module.exports = { book_router };
