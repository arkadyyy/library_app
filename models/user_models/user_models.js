const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    my_books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
    is_admin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
