import express from "express"
import dotenv from "dotenv"
import { Server } from "socket.io"

dotenv.config()

const PORT = process.env.BACKEND_PORT
const app = express()
const http_server = app.listen(PORT, ()=>console.log("server is running on: ", PORT))

const io = new Server(http_server, {
    cors : {
        origin : process.env.FRONTEND_SERVER
    }
})
const rooms = [
]

io.on("connection", (cnn)=>{
    console.log("someone connected to server", cnn.client.id)
    
    cnn.on("user_info", (user_info)=>{
        console.log("user connected: ", user_info);
        cnn.join(user_info.roomID)
    })

    cnn.on("send_msg", (msg)=>{
        const room = rooms.find((room)=>room.roomID == msg.roomID)
        if(room){
            room.messages.push(msg)
            io.to(msg.roomID).emit("send_data", room.messages)
        } else{
            const new_room = {
                roomID : msg.roomID,
                messages : [
                    msg
                ]
            }
            rooms.push(new_room)            
            io.to(msg.roomID).emit("send_data", new_room.messages)

        }        
    })


})
setInterval(()=>{
    console.log("rooms: ", rooms);
}, 1000)