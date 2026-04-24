const express = require('express')
const connectdb = require('./config/database')
const cookieParser = require('cookie-parser')
const app = express()
const port =5001
const cors = require('cors')
const http = require("http")
 







//database connectivity
connectdb()

 
//MIDDLEWARES
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser())





const server = http.createServer(app)

// initalize socket
const socket = require("socket.io")

const io = socket(server,{
    cors:{
        origin : "http://localhost:5173",
        credentials : true
    }
})

io.on("connection",(socket) => {
    //handle events

    // join chat seperate room
    socket.on("joinChat",({ firstName , userId, targetUserId })=>{
        
        //unique room id by join user and target  sort to make the room id same 
        const roomId = [userId , targetUserId ].sort().join("_")

        console.log( firstName + " joined room" +roomId)

        socket.join(roomId)

    })

    //send message
    socket.on("sendMessage",
        ({ firstName, userId , targetUserId , text})=>{
        
      

          //save messages to the database
          try{

                const roomId = [userId , targetUserId ].sort().join("_")
                 console.log(firstName + " "+text)
             // 2 case if chat already exit then append it and if new then create then new one 

             //already existing chat 
             let  chat = Chat.findOne({
                participants : { $all :[userId, targetUserId ]}

             } )

             //if no chat avaiable new chat 
             if(!chat)
             {
                chat = new Chat({
                    participants :[ userId , targetUserId],
                    messages:[]
                    
                })

                chat.messages.push({
                    senderId : userId,
                    text
                })
             }

             io.to(roomId).emit("messageReceived", { firstName, text})

          }catch(err)
          {
            console.log(err.message)
          }

          
     })

    socket.on("disconnect",()=>{

    })
})

//route mounting
const authRouter = require('./routes/auth')
const profileRouter = require('./routes/profile')
const requestRouter = require('./routes/request')
const userRouter = require('./routes/user')
const chatRouter = require('./routes/chat')



app.use('/api/',authRouter)
app.use('/api/',profileRouter)
app.use('/api/',requestRouter)
app.use('/api/',userRouter)
app.use('/api/',chatRouter)







server.listen(port, () => {
    console.log("server is running at port " + port)
});
