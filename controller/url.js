const shortId=require('shortid')
const URL=require('../models/url');
const { timeStamp } = require('node:console');

async function handleCreateShortId(req,res){
    const body=req.body || {};
    if(!body.url) return res.status(400).render('home',{error:'Url is required'})
    const shortID=shortId()
        await URL.create({
            shortId:shortID,
            redirectUrl:body.url,
            visitHistory:[],
            createdBy:req.user._id
            
              })
              return res.render('home',{
                id:shortID
              })
              
}

async function handleGetAnalytics(req,res){
    const shortId=req.params.shortId
    const result =await URL.findOne({shortId});
    return res.json({totalClicks:result.visitHistory.length,analytics:result.visitHistory})
}



module.exports={
    handleCreateShortId,
     handleGetAnalytics
    
    }
