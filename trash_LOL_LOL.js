
/* ////////////////////
FROM MODELS
//////////////////// */
// function to return the number for the "short_url" field
/*
let updateNewUrl = (url) =>{
    SiteModel.find({},{short_url : 1,  _id: 0}, (err, data)=>{
        if(err){
            log("Error while finding Documents ", err)
        }else{
            log("Documents found! : ", data);
            
            //finding the largest num in the DB
            let shortUrlNum = data.reduce((previous, current)=>{
                return (previous.short_url > current.short_url ) ? previous: current;
            });
            // updating the largist num+1 for the next url
            shortUrlNum = shortUrlNum.short_url + 1;
            log("shortUrlNum : ", shortUrlNum);
            let newDocObj = {};
            newDocObj.original_url = url;
            newDocObj.short_url = shortUrlNum;
            log("newDocObj : ", newDocObj);
            SiteModel.create(newDocObj, (err, data)=>{
                if(err){
                    log("Error creating new Document", err)
                }else{
                    log("Document Created Succesfully!", data);
                }
            });

        };
    });
};
*/
//updateNewUrl()

/*
async function checkNreturnNum () {return await SiteModel.find({},{short_url : 1,  _id: 0});}
checkNreturnNum().then(data =>log(data))
*/

//log(async function checkNreturnNum () {return await SiteModel.find({},{short_url : 1,  _id: 0}).exec((err, data)=> data);})
/*
(async () => {
    //console.log(await checkNreturnNum())
    return await checkNreturnNum()
})();

function fun(){
    return (async ()=>{ return await checkNreturnNum()})
}
log(fun())
*/

/*
let urlFound = () =>{
    SiteModel.aggregate([
        {'$match': { _id : {$exists: true} } }
    ])
};
log("DOCS are : ", urlFound())
*/

/* ////////////////////
FROM MODELS
//////////////////// */