import ChatBox from './components/ChatBox';
import io from "socket.io-client"
import './styles/App.css';
import { useEffect, useState } from 'react';
import Login from './components/Login';


export type SocketType = ReturnType<typeof io>;
export type UserType = {
  username : string
  roomID : string
}
function App() {
  const [socket, set_socket] = useState <SocketType | null> (null)
  const [userInfo, set_userInfo] = useState<UserType | null>(null)
  console.log("socket:", socket);
  
  useEffect(()=>{
    try {
      if(!userInfo){
        return
      }
      const socket_inst: SocketType = io(import.meta.env.VITE_BACKEND_SERVER, {
        transports: ["websocket"],
      });
      console.log("socket_inst:", socket_inst);
      
      socket_inst.on("connect", ()=>{
        console.log('connected');
        socket_inst.emit("user_info", userInfo)
      })
      set_socket(socket_inst)
      
      return ()=>{
        socket_inst.disconnect()
      }
    } catch (error) {
      console.log(error)      
    }
  }, [userInfo])
  return (
    <>
    {
      userInfo 
      ? <ChatBox userInfo = {userInfo} socket={socket} />
      : <Login set_info = {set_userInfo} /> 
    }
    </>
  );
}

export default App;
