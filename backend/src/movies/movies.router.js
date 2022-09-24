const router = require("express").Router();
const moviesController = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

const corsOrigin = {
    origin: ['https://thnkfl-welovemovies-client.herokuapp.com/', 'http://localhost:3000']
}

router.use(cors(corsOrigin));

router.route("/:movieId/reviews")
    .get(moviesController.listMovieReviews)
    .all(methodNotAllowed);

router.route("/:movieId")
    .get(moviesController.read)
    .all(methodNotAllowed);

router.route("/")
    .get(moviesController.list)
    .all(methodNotAllowed);

module.exports = router;
