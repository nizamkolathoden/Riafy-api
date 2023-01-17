const mongoose = require("mongoose")

const Bookmark = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please Enter Title"]
    },
    url:{
        type:String,
    },
    Date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('bookmark',Bookmark)