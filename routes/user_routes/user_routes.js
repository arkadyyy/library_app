const express = require("express");

require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user_models/user_models");

const user_routes = express.Router();

user_routes.post("/sign_up", async (req, res, next) => {
  console.log("sign up stuff : ", req.body);
  try {
    const { firstName, lastName, email, password } = req.body;
    console.log(req.body);

    // Validate user input
    if (!(email && password && firstName && lastName))
      throw new Error("All input fields must be filled");

    //Encrypt user password
    const encryptedPassword = bcrypt.hashSync(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: encryptedPassword,
    });
    newUser.save();

    // return ok status , user created !
    res.status(201).send("User created successfuly");
  } catch (err) {
    next(err);
  }
});

user_routes.post("/sign_in", async (req, res, next) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password))
      throw new Error("All input fields must be filled");

    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (!user) throw new Error("User not Found");

    if (user && bcrypt.compareSync(password, user.password)) {
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

      res.status(200).cookie("jwt", token).send("Signed up successfuly");
    } else {
      throw new Error("Incorrect password");
    }
  } catch (err) {
    next(err);
  }
});

user_routes.get("/all_users", async (req, res, next) => {
  try {
    const all_users = await User.find({ is_admin: { $ne: true } });
    res.status(200).send(all_users);
  } catch (err) {
    next(err);
  }
});

user_routes.delete("/delete_user", async (req, res, next) => {
  const { user_id } = req.query;
  try {
    const user = await User.findOneAndDelete({ _id: user_id });
    console.log("user : ", user);

    const all_users = await User.find({ is_admin: { $ne: true } });
    res.status(200).send(all_users);
  } catch (err) {
    next(err);
  }
});

user_routes.post("/update_user", async (req, res, next) => {
  const { email, firstName, lastName, my_books, _id } = req.body;
  console.log({ email, firstName, lastName, my_books, _id });

  try {
    const user = await User.findOneAndUpdate(
      { _id: _id },
      { email, firstName, lastName, my_books }
    );
    user.save();
    const all_users = await User.find({ is_admin: { $ne: true } });
    res.status(200).send(all_users);
  } catch (err) {
    next(err);
  }
});

user_routes.post("/add_book", async (req, res, next) => {
  const { id, user_id } = req.body;
  console.log(id, user_id);
  try {
    const user_update = await User.updateOne(
      { _id: user_id },
      { $push: { my_books: id } }
    );
    const all_users = await User.find({ is_admin: { $ne: true } });
    res.status(200).send(all_users);
  } catch (err) {
    next(err);
  }
});

user_routes.delete("/remove_book", async (req, res, next) => {
  const { book_id, user_id } = req.query;
  console.log(book_id, user_id);
  try {
    const user_update = await User.updateOne(
      { _id: user_id },
      { $pull: { my_books: book_id } }
    );
    const all_users = await User.find({ is_admin: { $ne: true } });
    res.status(200).send(all_users);
  } catch (err) {
    next(err);
  }
});

module.exports = { user_routes };
