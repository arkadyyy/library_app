const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { book_router } = require("./routes/library_routes/library_routes");
const { user_routes } = require("./routes/user_routes/user_routes");
const { sale_routes } = require("./routes/sale_routes/sale_routes");
const connectDB = require("./dbConnection/dbConnection");

connectDB();

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.use(cors({ credentials: true, origin: "*" }));

app.use(book_router);
app.use(user_routes);
app.use(sale_routes);

app.use(express.static(path.join(__dirname, "/frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
});

//error handling middleware
app.use((error, req, res, next) => {
  console.log("ERROR : ", error.message);
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
      status: error.status || 500,
    },
  });
});

app.listen(process.env.PORT, () => {
  console.log(`server is running ! on port ${process.env.PORT}`);
});
