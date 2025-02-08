export type ChatMessage = {
    sender : string
    text : string
    date : string
}
export type Rooms_type = {
    id: string,
    room_name: string,
    room_admin: string, 
    room_members: string[],
    messages: ChatMessage[],
    shared_text: string
}
export type Join_req_type = {
    room_id: string,
    username: string,
}

// type Message_Type = {
//     sender: string
//     text: string
//     date: string
//     roomID: string
// }
export type User_online_type = {
    username : string
    socket_id : string
}
export type SocketType = ReturnType<typeof io>;
export type UserType = {
  username : string
}
export type Socket_context_type = {
  socket : SocketType | null
  set_socket : React.Dispatch<React.SetStateAction<SocketType | null>>
}
export type State_type = {
    user : {
      info: UserType | null
      rooms: Rooms_type[], 
      ui : {
        shared_space : boolean,
        show_info : boolean
      }
    }
}
export type Edited_data = {
  id : string
  edited_text : string
}