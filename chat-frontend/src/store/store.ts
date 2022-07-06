import { makeAutoObservable } from "mobx";
import { WsResMessage, MessageData } from '../../../chat-backend/src/types'


class Store {
    ws!: WebSocket
    messageHistory: MessageData[] = []
    activeUserLogin: string = ''
    

    setActiveUserLogin(login: string){
      this.activeUserLogin = login
    }

    setMessageHistory(data: MessageData[]) {
      console.log(data)
      this.messageHistory = data
    }
     
    constructor() {
        makeAutoObservable(this)
        this.wsInit()
    }

    private wsInit() {
      this.ws = new WebSocket("ws://localhost:8080");

      this.ws.onmessage = (event) => {
        const parsedData = JSON.parse(event.data) as WsResMessage
        console.log(parsedData)
        if(parsedData.type === 'MESSAGE') {
          this.setMessageHistory([...this.messageHistory, parsedData.data])
        } else if(parsedData.type === 'MESSAGE_HISTORY'){
          this.setMessageHistory(parsedData.data)
        } else if(parsedData.type === 'AUTH'){
          this.setActiveUserLogin(parsedData.data.login)
          this.getUserMessageHistory()
        }
      };
    }

    authUser(userLogin: string){  
      if(!userLogin) userLogin = 'Anonymous'
      this.ws.send(JSON.stringify({ type: "AUTH", data: { login: userLogin } }));
    }

    sendMessage(messageText: string){
      this.ws.send(JSON.stringify({type: "MESSAGE", data: {message: messageText}}))
    }

    getUserMessageHistory(){
      this.ws.send(JSON.stringify({type: 'MESSAGE_HISTORY'}))
    }
}

export const myStore = new Store()