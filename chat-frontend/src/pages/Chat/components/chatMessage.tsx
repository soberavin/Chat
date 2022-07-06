import "./chatMessage.css"

export type ChatMessageModel = {
    login: string;
    message: string;
}

type ChatMessageProps = {
    messageData: ChatMessageModel
    isActiveUserMessage: boolean;
}

export function ChatMessage(props: ChatMessageProps) {


    return <div className={!props.isActiveUserMessage ? "Chat__userMessage" : "Chat__youMessage"} >
        <b>{!props.isActiveUserMessage ? props.messageData.login : 'You'}: </b>
        {props.messageData.message}
    </div>
}