import { useParams } from "react-router-dom"
import { useState } from "react"
import { createSocketConnection } from '../config/socket'
import { useSelector } from "react-redux"
import { useEffect } from "react"


function Chat (){

    //reading dyamic route targetid
    const { targetUserId } = useParams()
    const user = useSelector( store => store.user )
    const userId = user?._id 
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")

    useEffect(()=>{
       
        if(!userId){
            return 
        }
        const socket = createSocketConnection()

        //send events as soon as the page loaded the socket connection is made and join chat event is emitted
        // send data to server
        socket.emit("joinChat", { firstName : user.firstName, userId, targetUserId})

        socket.on("messageReceived",({firstName, text})=>{
            console.log(firstName+" "+text)
            setMessages((messagess)=> [...messages , {firstName , text }])
        })
        return ()=>{
            socket.disconnect()

        }
    },[userId,targetUserId ])

    // user 1 send message to backend 
    const sendMessage =()=>{
        const socket = createSocketConnection()
        socket.emit("sendMessage",{ 
            firstName: user.firstName , 
            userId, 
            targetUserId , 
            text: newMessage
        })
        setNewMessage()
    }

    return(
          <div className="w-3/4 mx-auto border broder-gray-600 m-5 h-[70vh] flex flex-col">
            <h1 className="p-5 border-b border-gray-600">Chat</h1>
             <div className="flex-1 overflow-scroll p-5">
               { messages.map((msg, index)=>{
                 return (
                    <div key={index} className="chat chat-start">
                     <div className="chat-header">
                         { message.firstName}
                         
                     </div>
                     <div className="chat-bubble">{msg.text} </div>
                     
                     
                  </div>
                
                    
                 )
               })}
             </div>
             
             <div className="p-5 border-t border-gray-400 flex items-center gap-2">
                 <input
                  value={newMessage}
                  onChange={(e)=> setNewMessage(e.target.value)}
                  className="flex-1 border border-gray-500 text-white rounded p-2">
                     
                 </input>
                 <button  onClick={sendMessage} className="btn btn-secondary">Send</button>
             </div> 

          </div>
    )
}

export default Chat 