let urlController = require("../controllers/urlController");
let express = require("express");
let apiRouter = express.Router();

apiRouter.post("/", urlController.siteModel_post_newUrl)


module.exports = {apiRouter};