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
type Message_Type = {
    sender: string
    text: string
    date: string
    roomID: string
}
type Rooms_type = {
    roomID : string
    messages : Message_Type[]
}
const rooms : Rooms_type[] = [
    
]

io.on("connection", (cnn)=>{
    console.log("someone connected to server")
    
    cnn.on("user_info", (user_info)=>{
        console.log("user connected: ", user_info);
        cnn.join(user_info.roomID)
    })

    cnn.on("send_msg", (msg : Message_Type)=>{
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