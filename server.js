const express = require("express");
const detenv = require("dotenv");
// morgand for logging request in development mode
const morgan = require("morgan");

const globalError = require("./middlewares/errorMiddleware");
detenv.config({ path: "./config.env" });
const ApiError = require("./utils/apiError");
const dbConnection = require("./config/database");
const categoryRoute = require("./routes/categoryRoute");
const subCategoryRoute = require("./routes/subCategoryRoute");
const brandRoute = require("./routes/brandRoute");
const productRoute = require("./routes/productRoute");
// Connect With DB
dbConnection();

// express app
const app = express();
// middlewares use for parsing json data from body of request
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode${process.env.NODE_ENV}`);
}

// mount routes

app.use("/api/vi/categories", categoryRoute);
app.use("/api/vi/subcategories", subCategoryRoute);
app.use("/api/v1/brands", brandRoute);
app.use("/api/v1/products", productRoute);

app.all('*', (req, res, next) => {
  // Create error and send it to error handling midleware
  // const err = new Error(`Can't find this route: ${req.originalUrl}`);
  // next(err.message);

   next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global error handling midleware
app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log("Listening on port 8000");
  console.log(`http://localhost:${PORT}`);
});


//Handle Rejection outside express
process.on("unhandledRejection", (err) => {
  console.error(`unhandleRejection Errors: ${err} | ${err.message}`);
  server.close(() => {
    console.error(`shutting down... `);
    process.exit(1);
  });
});
