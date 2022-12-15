import { createContext } from "react";
import { Socket } from "socket.io-client";
import { setCalculateReducerData } from "../utils/reducer";
import {
  CALCULATE,
  SOCKET_DISCONNECTED,
  UPDATE_SOCKET,
} from "../utils/Strings";
import {
  ISocketContextActions,
  ISocketContextProps,
  ISocketContextState,
} from "../utils/types";

export const defaultSocketContextState: ISocketContextState = {
  socket: undefined,
  operationResult: "",
  history: [],
  error: false,
  errorMessage: "",
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
      console.log(state, "==>");
      return setCalculateReducerData(state, action.payload);
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
