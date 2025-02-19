const express = require('express')
const {handleShortUrl} = require('../controllers/url.controller.js')

const router = express.Router()


router.post("/",handleShortUrl)


module.exports = router