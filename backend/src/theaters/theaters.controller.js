const theatersServices = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(req, res) {
    const data = await theatersServices.list();
    res.json({ data });
}

module.exports = {
    list: asyncErrorBoundary(list),
}
