import io from "socket.io-client"
import './styles/App.css';
import { createContext, useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';


export type SocketType = ReturnType<typeof io>;
export type UserType = {
  username : string
}
type Socket_context_type = {
  socket : SocketType | null
  set_socket : React.Dispatch<React.SetStateAction<SocketType | null>>
}
export const Socket_context = createContext <Socket_context_type | null> (null)
function App() {
  const [socket, set_socket] = useState<SocketType | null>(null)


  return (
    <>
    <Socket_context.Provider value = {{socket, set_socket}}>
      <Outlet/>
    </Socket_context.Provider>
    </>
  );
}

export default App;

export function useSocket(){
  const context = useContext(Socket_context)
  if(!context) throw new Error("socket is null");
  
  return context
}