import { Outlet, useNavigate } from "react-router-dom";
import SideNav from "./Sidenav";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSocket } from "../App";
import { State_type } from "../../server/Types";



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
    <div className="flex md:flex-row flex-col w-[98vw] gap-5 h-[95vh] bg-darkgrey rounded-xl overflow-hidden">
        <SideNav/>
        <div className="w-full h-full justify-center items-center flex ">
          <Outlet/>
        </div>
    </div>
  )
}
