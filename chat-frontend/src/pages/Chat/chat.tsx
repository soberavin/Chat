import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { Input } from "../../components/input";
import { myStore } from "../../store/store";
import "./chat.css"
import { ChatMessages } from "./components/chatMessages";

export const ChatPage = observer(() => {

    let chatPlaceHolder: string = 'Write a message in here. Enter to send.'
    const [inputValue, setInputValue] = useState('')

    function handleMessageInputChange(e: SyntheticEvent){
        let input = e.target as HTMLInputElement
        setInputValue(input.value)
    }

    function handleMessageInputKeyPress(e: SyntheticEvent){
        if((e as any).code === 'Enter') {
            myStore.sendMessage(inputValue)
            setInputValue('')
        }
    }

    return (
        <div className="Chat__content">
            <div className="Chat__body">
                <div className="Chat__messageBox"></div>
                <ChatMessages />
                <Input onKeyPress={handleMessageInputKeyPress} className="Chat__input" placeholder={chatPlaceHolder} value = {inputValue} onChange= {handleMessageInputChange}/>
            </div>
        </div>
    )
})