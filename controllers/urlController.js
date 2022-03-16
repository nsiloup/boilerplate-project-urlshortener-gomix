let { SiteModel } = require("../Models/siteModel");
let log = console.log;
let createAndSaveDoc = ()=>{
    SiteModel.create(arrayOfSites, (err, data)=>{
        err?log(err) : log("Documents saved are : ", data)
    })
};

let siteModel_post_newUrl = (req, res, next)=>{
    try{
        let url = req.body.url;
        log(url);
        let obj = {};

        (async function(){
            let data1 =await SiteModel.find({},{short_url : 1,  _id: 0});
            let shortUrlNum = data1.reduce((previous, current)=>{
                return (previous.short_url > current.short_url ) ? previous: current;
            });
            shortUrlNum = shortUrlNum.short_url + 1
            obj.short_url = shortUrlNum;
            obj.original_url = url;
            log("object created ",obj);
            res.json(obj);
            let data2 = await SiteModel.create(obj);
            log("Document Saved to the DB successully !", data2);
            return obj;
        })();
    }catch(err){
        log(err);
        next(err)
    };
};

// Delete some sites from the DB to limit storage usage to 4 Documents
SiteModel.deleteMany({ short_url: { $gte: 4 }}, (err, data)=>err?log("Error Deleting Doc : ", err) : log("Doc Deleted : ", data))
exports.createAndSaveDoc = createAndSaveDoc;

module.exports = {
    siteModel_post_newUrl,
};