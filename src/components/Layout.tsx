import { Outlet, useNavigate } from "react-router-dom";
import SideNav from "./Sidenav";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SocketType, UserType, useSocket } from "../App";


export type State_type = {
  user : {
    info: UserType | null
    rooms: string[], 
    socket : SocketType
  }
}
export default function Layout() {
  const navigate = useNavigate()
  const user = useSelector((state: State_type)=>state.user)
  const [connecting, setConnecting] = useState(true)
  const {socket} = useSocket ()
  
  useEffect(()=>{
    if(connecting) return
    try {
      if(!user.info || !socket){
        navigate('/')
        return
      }
      
    } catch (error) {
      console.log(error)      
    }

    return () => {
      socket?.off("connect");
      socket?.off("disconnect");
    };
  }, [connecting])

  useEffect(()=>{
    if(!user.info){
      navigate("/")
    }
    if(socket){
      setConnecting(false)
    }
    
  }, [user, socket])
  return (
    <div className="flex w-[90vw] gap-5 h-[90vh] bg-red-400 rounded-xl overflow-hidden">
        <SideNav/>
        <div className="w-full h-full justify-center items-center flex ">
          <Outlet/>
        </div>
    </div>
  )
}
