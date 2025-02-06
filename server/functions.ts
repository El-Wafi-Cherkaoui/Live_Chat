import { User_online_type } from "./Types";

export let online_users : User_online_type[] = []

export function set_online(username : string, socket_id : string) {
    online_users.push({username,socket_id})
    console.log(username, " is online");
    console.log("online users : ", online_users);
}

export function set_offline(socket_id : string) {
    online_users = online_users.filter(user=>user.socket_id != socket_id)
    console.log("user disconnected", socket_id);
    console.log("online users : ", online_users);
}