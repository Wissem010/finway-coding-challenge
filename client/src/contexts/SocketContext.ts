import { createContext } from "react";
import { Socket } from "socket.io-client";
import {
  CALCULATE,
  SOCKET_DISCONNECTED,
  UPDATE_SOCKET,
} from "../utils/Strings";
import {
  IHistory,
  ISocketContextActions,
  ISocketContextProps,
  ISocketContextState,
} from "../utils/types";

export const defaultSocketContextState: ISocketContextState = {
  socket: undefined,
  operationResult: "",
  history: [],
};

export const SocketReducer = (
  state: ISocketContextState,
  action: ISocketContextActions
) => {
  console.log(
    "Message recieved - Action: " + action.type + " - Payload: ",
    action.payload
  );

  switch (action.type) {
    case UPDATE_SOCKET:
      return { ...state, socket: action.payload as Socket };
    case CALCULATE:
      return { ...state, history: action.payload as IHistory[] };
    case SOCKET_DISCONNECTED:
      return { ...state, socket: undefined };
    default:
      return state;
  }
};

const SocketContext = createContext<ISocketContextProps>({
  SocketState: defaultSocketContextState,
  SocketDispatch: () => {},
});

export const SocketContextConsumer = SocketContext.Consumer;
export const SocketContextProvider = SocketContext.Provider;

export default SocketContext;
