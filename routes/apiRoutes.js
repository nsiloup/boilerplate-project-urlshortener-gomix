let urlController = require("../controllers/urlController");
let express = require("express");
let apiRouter = express.Router();

//route for Posting and saving new url of websites
apiRouter.post("/", urlController.siteModel_post_newUrl)

//Route for getting/redirecting to the long url from the short url
apiRouter.get("/:shortUrl", urlController.siteModel_get_N_Redirect_longUrl)


module.exports = {apiRouter};