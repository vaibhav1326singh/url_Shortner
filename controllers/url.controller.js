const shortId = require('shortid')
const Url = require('../model/url.model.js')




const handleShortUrl = async(req,res) =>{
    const { url: redirectUrl } = req.body;

    if (!redirectUrl) {
        return res.status(400).json({ error: "URL is required" });
    }

    const generatedshortId = shortId()

    await Url.create({
        shortId:generatedshortId,
        redirectUrl:redirectUrl,
        visitHistory:[]
    })
    return res.render('home',{id:generatedshortId})
    
}

module.exports = {
    handleShortUrl
}