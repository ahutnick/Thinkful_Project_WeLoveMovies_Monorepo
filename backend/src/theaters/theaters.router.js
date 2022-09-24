const router = require("express").Router();
const theatersController = require("./theaters.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/")
    .get(theatersController.list)
    .all(methodNotAllowed)

module.exports = router;
