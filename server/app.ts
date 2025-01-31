import express from "express"
import dotenv from "dotenv"
import { Server } from "socket.io"
import cors from 'cors'

import path from "path"
import { fileURLToPath } from "url";

dotenv.config()

const PORT = process.env.BACKEND_PORT
const app = express()
app.use(
    cors({
        origin: process.env.FRONTEND_SERVER || "http://localhost:4173",
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
    })
);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../dist')));

app.use((_req, res, next) => {
    res.setHeader(
        "Content-Security-Policy", `default-src 'self'; script-src 'self' 'unsafe-inline'; img-src 'self' ${process.env.FRONTEND_SERVER} data:; connect-src 'self' ${process.env.FRONTEND_SERVER};`
    );
    next();
});
app.get("/", (_req, res) => {    
    res.send("websocket server is on");
});
const http_server = app.listen(PORT, ()=>{
    console.log("server is running on: ", PORT)
})
const io = new Server(http_server, {
    cors: {
        // origin: [process.env.FRONTEND_SERVER || "http://localhost:4173"], 
        origin: "*", 
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
        credentials: true
    },
    transports: ["websocket"],
    pingInterval: 60000, 
    pingTimeout: 50000, 
});
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
    cnn.on("disconnect", () => {
        console.log("user disconnected", cnn.id);
    });

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
app.get('*', (_req, res) => { 
    res.sendFile(path.join(__dirname, '../dist', 'index.html'))
});
