const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../../models/user_models/user_models");
const Book = require("../../models/library_models/library_models");
const Sold = require("../../models/sold_model/sold_models");

const sale_routes = express.Router();

const stripe = require("stripe")(process.env.STRIPE_KEY);

const calculateOrderAmount = async (book_id) => {
  const book = await Book.find({ _id: book_id });
  return book[0].price * 100;
};

sale_routes.post("/create-payment-intent", async (req, res) => {
  const { book_id, user_id } = req.body;
  console.log("book_id : ", book_id, user_id);

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: await calculateOrderAmount(book_id),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  // const new_sale = await Sold.create({ book_id, user_id });
  // new_sale.save();

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

sale_routes.post("/sale", async (req, res, next) => {
  const { book_id, user_id } = req.body;

  try {
    const new_sale = await Sold.create({ book_id, user_id });
    new_sale.save();
    const update_user = await User.findByIdAndUpdate(
      user_id,
      { $push: { my_books: book_id } },
      { upsert: true, new: true }
    );
    update_user.save();

    const user = await User.findOne({ _id: user_id });
    console.log("user : ", user);
    if (!user) throw new Error("User not Found");

    // Create token
    const token = jwt.sign(
      {
        firstName: user.firstName,
        email: user.email,
        id: user._id,
        is_admin: user.is_admin,
        my_books: user.my_books,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "2h",
      }
    );

    res.status(200).cookie("jwt", token).send(token);
  } catch (err) {
    next(err);
  }
});

module.exports = { sale_routes };
