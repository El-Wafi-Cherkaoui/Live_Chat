type Message = {
    id: string
    text: string
}
const current_id = "123"
export default function ChatBody(){
    const messages : Message[] = [
        {
            id: '123',
            text : "asldkkak asd a da  dklda"
        },
        {
            id: '12xa3',
            text : "asldkkak asd a da  dklda"
        },
        {
            id: '123',
            text : "asldkkak asd a da  dklda"
        },
        {
            id: '12xa3',
            text : "asldkkak asd a da  dklda"
        },
    ]
    return(
        <div className="bg-custom-bg2 flex-1 p-4 overflow-scroll flex flex-col gap-1 items-start">
            {
                messages.map((msg)=>{
                    if(msg.id == current_id){
                        return(
                            <span className="bg-white p-2 rounded-xl">
                                {msg.text}
                            </span>
                        )
                    }
                    else{
                        return(
                            <span className="bg-white p-2 rounded-xl ml-auto">
                                {msg.text}
                            </span>
                        )
                    }
                })
            }
        </div>
    )
}