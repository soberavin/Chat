import { Server, WebSocket, WebSocketServer } from 'ws';
import { AuthMessageData, MessageData, WsReqMessage } from './types';

const wss = new WebSocketServer<MyWs>({ port: 8080 });

interface MyWs extends WebSocket {
  data: {
    login: string
  }
}

const MESSAGE_HISTORY: MessageData[] = [
  {
    login: 'Michael',
    message: 'What a nice evening today'
  },
  {
    login: 'Leo',
    message: 'Meh i dont think so man'
  },
  {
    login: 'Lucy',
    message: 'You guys are talking about nothing, work harder or die'
  }
]

wss.on('connection', function connection(ws) {
  ws.data = { login: '' }
  ws.on('message', function message(data) {
    try {
      const parsedMessage = JSON.parse(data.toString()) as unknown as WsReqMessage
      console.log(parsedMessage)
      if (!parsedMessage.type) {
        throw new Error('missing type property in data')
      }
      switch (parsedMessage.type) {
        case 'AUTH':
          authMessageController(wss, ws, parsedMessage.data)
          
          break;

        case 'MESSAGE':
          const message: MessageData = { login: ws.data.login, message: parsedMessage.data.message }
          newMessageController(wss, message)
          MESSAGE_HISTORY.push(message)
          break;

        case 'MESSAGE_HISTORY':
          messageHistoryMessageController(ws, MESSAGE_HISTORY)
          break;

        default:
          throw new Error(`unsupported message type ${(parsedMessage as any).type}`)
          break;
      }
    } catch (err) {
      console.error(err)
      console.error('received unkown data')
      console.error(data)
    }
  });
});

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}


function authMessageController(wss: Server<MyWs>, ws: MyWs, data: AuthMessageData) {
  ws.data.login = data.login + "#" + getRandomInt(9) + getRandomInt(9) + getRandomInt(9) + getRandomInt(9)
  const dataP = {
    type: 'AUTH',
    data: {
      login: ws.data.login
    }
  }
  sendMessage(ws, JSON.stringify(dataP))
}


function newMessageController(wss: Server<MyWs>, data: MessageData) {
  broadCastMessage(wss, JSON.stringify({
    type: 'MESSAGE',
    data: data
  }))
}

function messageHistoryMessageController(ws: MyWs, data: MessageData[]) {
  const dataP = {
    type: 'MESSAGE_HISTORY',
    data
  }
  sendMessage(ws, JSON.stringify(dataP))
}

function sendMessage(ws: MyWs, data: string) {
  if (ws.readyState === WebSocket.OPEN)
    ws.send(data)
}

function broadCastMessage(wss: Server<MyWs>, data: string) {
  wss.clients.forEach(function each(client) {
    sendMessage(client, data)
  });
}