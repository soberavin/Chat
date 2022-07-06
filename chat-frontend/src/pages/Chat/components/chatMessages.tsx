import { observer } from "mobx-react-lite"
import { myStore } from "../../../store/store"
import { ChatMessage } from "./chatMessage"

type ChatMessagesProps = {

}

export const ChatMessages = observer((props: ChatMessagesProps) => {
    
    
    

    let currentMessageData: React.ReactNode[] = []
    for(let i = 0 ; i < myStore.messageHistory.length; i ++){
        const isActiveUserMessage = myStore.activeUserLogin === myStore.messageHistory[i].login
        currentMessageData.push(<ChatMessage isActiveUserMessage = {isActiveUserMessage} key ={i + myStore.messageHistory[i].message} messageData={myStore.messageHistory[i]}/>)
    }


    return <div>{currentMessageData}</div>
})
