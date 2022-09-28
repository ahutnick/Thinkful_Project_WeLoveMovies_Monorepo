// if (process.env.USER) 
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const origin = process.env.NODE_ENV === "production" ? "https://thnkfl-welovemovies-client.herokuapp.com"  : "http://localhost:3000";

app.use(cors({ origin: origin }));

const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");

const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

app.use(express.json());

app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);

app.use(notFound)
app.use(errorHandler);

module.exports = app;
