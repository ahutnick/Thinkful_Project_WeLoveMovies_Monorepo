const router = require("express").Router();
const moviesController = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

router.use(cors())

router.route("/:movieId")
    .get(moviesController.read)
    .all(methodNotAllowed);

router.route("/")
    .get(moviesController.list)
    .all(methodNotAllowed);

module.exports = router;
