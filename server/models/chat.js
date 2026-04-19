const mongoose = require('mongoose')

const messageSchema = new mongoose.model({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    text:{
        type: String,
        required:true
    }
})

const chatSchema = new mongoose.model({
    participants:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true

    }],

    messages: [messageSchema]

    

})

module.exports = mongoose.model('Chat',chatSchema)