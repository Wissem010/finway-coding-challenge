import { Server as HttpServer } from "http";
import { Socket, Server } from "socket.io";
import { ENUM_EVENT_NAME } from "./constants/event.enum";
import { ENUM_REQUEST_TYPE } from "./constants/request-type.enum";
import { ENUM_RESPONSE_STATUS } from "./constants/response-status.enum";
import { IMessage } from "./interfaces/message.interface";
import { calculate, findHistory } from "./services/operation.service";

export class ServerSocket {
  public static instance: ServerSocket;
  public io: Server;

  constructor(server: HttpServer) {
    ServerSocket.instance = this;
    this.io = new Server(server, {
      serveClient: false,
      pingInterval: 10000,
      pingTimeout: 5000,
      cookie: false,
      cors: {
        origin: "*",
      },
    });
    this.io.on("connect", this.StartListeners);
  }

  StartListeners = (socket: Socket) => {
    console.info("Message received from " + socket.id);

    socket.on(ENUM_EVENT_NAME.CALCULATE, async (operation: string) => {
      if (operation.toLowerCase() === "history") {
        const data = socket.id ? await findHistory(socket.id) : [];
        this.SendMessage({
          eventName: ENUM_EVENT_NAME.RESULT,
          socketId: socket.id,
          payload: {
            message: "sending history to : " + socket.id,
            status: ENUM_RESPONSE_STATUS.OPERATION_SUCCESS_STATUS,
            type: ENUM_REQUEST_TYPE.HISTORY,
            data: data,
          },
        });
        return;
      }
      try {
        const result = await calculate({
          operationString: operation,
          socketId: socket.id,
        });
        this.SendMessage({
          eventName: ENUM_EVENT_NAME.RESULT,
          socketId: socket.id,
          payload: {
            message: "sending result to : " + socket.id,
            status: ENUM_RESPONSE_STATUS.OPERATION_SUCCESS_STATUS,
            type: ENUM_REQUEST_TYPE.CALCULATE,
            data: result,
          },
        });
      } catch (e: any) {
        this.SendMessage({
          eventName: ENUM_EVENT_NAME.RESULT,
          socketId: socket.id,
          payload: {
            message: e,
            status: ENUM_RESPONSE_STATUS.OPERATION_UNVALID_STATUS,
            type: ENUM_REQUEST_TYPE.CALCULATE,
          },
        });
      }
    });

    socket.on(ENUM_EVENT_NAME.SOCKET_DISCONNECTED, () => {
      console.info("Disconnect received from: " + socket.id);
    });
  };

  SendMessage = ({ eventName, payload, socketId }: IMessage) => {
    console.info("Emitting event: " + eventName + " to", socketId, payload);
    payload
      ? this.io.to(socketId).emit(eventName, payload)
      : this.io.to(socketId).emit(eventName);
  };
}
