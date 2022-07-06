import { Server, WebSocket } from "ws"

type WsReqMessageType = {
  'MESSAGE': 'MESSAGE',
  'MESSAGE_HISTORY': 'MESSAGE_HISTORY',
  'AUTH': 'AUTH'
}

export type MessageData = {
  login: string
  message: string
}

export type AuthMessageData = {
  login: string
}

export type NewMessageData = {
  message: string
}

export type WsReqMessage = [
  {
    type: WsReqMessageType['AUTH'],
    data: AuthMessageData
  },
  {
    type: WsReqMessageType['MESSAGE']
    data: NewMessageData
  },
  {
    type: WsReqMessageType['MESSAGE_HISTORY']
  }
][any]

export type WsResMessage = [
  {
    type: WsReqMessageType['MESSAGE']
    data: MessageData
  },
  {
    type: WsReqMessageType['MESSAGE_HISTORY']
    data: MessageData[]
  },
  {
    type: WsReqMessageType['AUTH'],
    data: AuthMessageData
  }
][any]