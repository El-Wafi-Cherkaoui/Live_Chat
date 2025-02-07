import express from "express"
import dotenv from "dotenv"
import { Server } from "socket.io"
import cors from 'cors'

import path from "path"
import { fileURLToPath } from "url";
import { createServer } from "http"
import { Edited_data, Join_req_type, Rooms_type } from "./Types"
import { online_users, set_offline, set_online } from "./functions"

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
const http_server = createServer(app)
http_server.listen(PORT, ()=>{
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

const rooms : Rooms_type[] = []

io.on("connection", (cnn)=>{
    console.log("someone connected to server")
    cnn.on("disconnect", () => {
        set_offline(cnn.id)
        io.emit("online_users", online_users)
        console.log("online user from logout was emitted");

    });
    
    cnn.on("request_rooms", (username)=>{
        const my_rooms = rooms.filter((room)=>room.room_members.some(member=>member == username))
        console.log("user connected: ", username);
        my_rooms.map((room)=>cnn.join(room.id))
        io.to(cnn.id).emit("get_rooms", my_rooms)    
        
        set_online(username, cnn.id)
        io.emit("online_users", online_users)
        console.log("online user from login was emitted");
            
    })

    cnn.on("create_room", (new_room)=>{
        const room_already_exist = rooms.find((room)=>room.id == new_room.id)
        const current_user = new_room.room_admin

        if(room_already_exist) return
        rooms.push(new_room)
        const room_id = new_room.id
        cnn.join(room_id)
        
        const my_rooms = rooms.filter((room)=>room.room_members.some(member=>member == current_user))
        
        io.to(room_id).emit("room_created", my_rooms)        
    })
    cnn.on("join_room", (join_req: Join_req_type)=>{
        try {
            console.log("join request: ", join_req);
            const room = rooms.find((room)=>room.id == join_req.room_id)
            if(!room) throw new Error("room not found");
            if(room.room_members.includes(join_req.username)) throw new Error("Already in the room");
            
            room?.room_members.push(join_req.username)
            cnn.join(join_req.room_id)
            const my_rooms = rooms.filter((room)=>room.room_members.some(member=>member == join_req.username))
            io.to(join_req.room_id).emit("room_created", my_rooms)        
        } catch (error) {
            console.log(error);
        }

    })
    cnn.on("send_msg", (msg)=>{
        console.log(msg);
        
        const room = rooms.find((room)=>room.id == msg.target_room)
        if(room){
            room.messages.push(msg.content)
            io.to(msg.target_room).emit("new_message", room)
        } else{
            throw new Error("this room doesnt exist");
            
        }        
    })
    cnn.on("save_shared_text", (edited_data : Edited_data)=>{
        const {id, edited_text} = edited_data
        let target_room = rooms.find((room)=>room.id == id)
        if(!target_room) throw new Error("room not found")
        target_room.shared_text = edited_text

        io.to(id).emit("shared_text_changed",target_room)
        
    })


})
app.get('*', (_req, res) => { 
    res.sendFile(path.join(__dirname, '../dist', 'index.html'))
});
