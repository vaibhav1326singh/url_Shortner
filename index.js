const express = require('express')
const mongoose = require('mongoose')
const path = require("path")
const cookieParser = require("cookie-parser")
const Url = require('./model/url.model.js')
const {checkloggedInUser} = require("./middleware/auth.middleware.js")
const {connectMongoDB} = require('./mongooes.connect.js')

// routes

const staticRoute = require('./routes/staticRouter.routes.js')
const urlRoute = require('./routes/url.routes.js')
const userRoutes = require('./routes/user.routes.js')



const app = express()
const PORT = 3000


app.set("view engine","ejs")
app.set("views",path.resolve('./views'))


// app.get('/test',async(req,res) =>{
//     const allUrls = await Url.find({})
//     return res.render("home",{
//         urls:allUrls
//     })
// })

connectMongoDB('mongodb://localhost:27017/shorturl')
.then(() => console.log('mongoose is connected')) 

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())


app.use('/url',checkloggedInUser,urlRoute)
app.use('/',staticRoute)
app.use('/user',userRoutes)


app.get('/url/:shortId',async(req,res) =>{
    const shortId = req.params.shortId
    const entry = await Url.findOneAndUpdate({
        shortId
    },{
        $push:{
            visitHistory:{
                timestamp:Date.now()
            }
        }
    })
    res.redirect(entry.redirectUrl)
})

app.listen(PORT,() =>console.log(`server is connected at: ${PORT}`))

