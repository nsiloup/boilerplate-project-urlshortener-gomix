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
        function validURL(str) {
            let pattern = new RegExp('^(https?:\\/\\/)?'+
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
            '((\\d{1,3}\\.){3}\\d{1,3}))'+
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
            '(\\?[;&a-z\\d%_.~+=-]*)?'+
            '(\\#[-a-z\\d_]*)?$','i');
            return !!pattern.test(str);
        }
        log("the Url Validity is :",validURL(url))
        if(!validURL(url)){
            res.json({ error: 'invalid url' });
            return;
        }else{
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
        }
    }catch(err){
        log(err);
        next(err)
    };
};

let siteModel_get_N_Redirect_longUrl = (req, res, next) =>{
    try{
        (async function(){let shortUrl = req.params.shortUrl;
            log(shortUrl);
            let resultObj = await SiteModel.find({short_url:shortUrl}, {short_url : 1, original_url : 1,  _id: 0});
            log("result found", resultObj);
            let longUrl = resultObj[0].original_url;
            res.redirect(longUrl);
        })()
    }catch(err){
        log(err);
        next(err)
    };
};

// Delete some sites from the DB to limit storage usage to 4 Documents
SiteModel.deleteMany({ short_url: { $gte: 2 }}, (err, data)=>err?log("Error Deleting Doc : ", err) : log("Doc Deleted : ", data))
exports.createAndSaveDoc = createAndSaveDoc;

module.exports = {
    siteModel_post_newUrl,
    siteModel_get_N_Redirect_longUrl
};