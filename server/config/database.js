const mongoose = require('mongoose')
require('dotenv').config()

const connectdb = async()=>{
    try{

        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Database connected successfully")


    }catch(err)
    {
       console.log("database connection failed"+err)
       process.exit(1)
       
    }
}

module.exports = connectdb