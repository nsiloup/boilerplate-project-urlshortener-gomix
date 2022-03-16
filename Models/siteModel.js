let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let UrlObjSchema = new Schema({
    original_url : String,
    short_url : Number
});

let SiteModel = mongoose.model("SiteModel", UrlObjSchema);

/* 
let arrayOfSites = [
    {
        original_url : "https://www.google.com/",
        short_url : 1
    },
    {
        original_url : "https://www.freecodecamp.org/",
        short_url : 2
    },
    {
        original_url : "replit.com/",
        short_url : 3
    },
    {
        original_url : "https://github.com/",
        short_url : 4
    }
];
SiteModel.create(arrayOfSites, (err, data)=>{
    err?log(err) : log("Document saved are : ", data)
})
*/

exports.SiteModel = SiteModel;
