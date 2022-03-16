require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
let uriSting = process.env.MONGO_URI;
let apiRoutes = require("./routes/apiRoutes");

let log = console.log;

const app = express();
let bodyParser = require("body-parser");

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

// Static files
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.use(bodyParser.urlencoded({ extended:true }));

mongoose.connect(uriSting)
  .then(() => {
    log("CONNECTION TO THE DATA_BASE SUCCEED");

    //Post url of websites
    app.use("/api/shorturl/", apiRoutes.apiRouter)
    //app.post("/api/shorturl/", urlController.siteModel_post_newUrl);
    
  })
  .catch((err)=>log(err));



app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
