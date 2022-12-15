import { Socket } from "socket.io-client";

export type UPDATE_SOCKET = "update_socket";
export type CALCULATE = "calculate";
export type SOCKET_DISCONNECTED = "socket_disconnected";

export interface IHistory {
  operation: string;
  result: string;
}
export interface ISocketContextState {
  socket: Socket | undefined;
  history: IHistory[];
  operationResult: string;
  error: boolean;
  errorMessage: string;
}
export type TSocketContextPayload = string | Socket;
export type TSocketContextActions =
  | UPDATE_SOCKET
  | CALCULATE
  | SOCKET_DISCONNECTED;

export interface ISocketContextActions {
  type: TSocketContextActions;
  payload?: TSocketContextPayload;
}
export interface ISocketContextProps {
  SocketState: ISocketContextState;
  SocketDispatch: React.Dispatch<ISocketContextActions>;
}
