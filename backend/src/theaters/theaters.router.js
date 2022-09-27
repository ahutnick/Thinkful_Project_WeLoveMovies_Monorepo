const router = require("express").Router();
const theatersController = require("./theaters.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

router.use(cors());

router.route("/")
    .get(theatersController.list)
    .all(methodNotAllowed)

module.exports = router;
