import React, { PropsWithChildren, useEffect, useReducer } from "react";
import { useSocket } from "../hooks/useSocket";
import {
  CALCULATE,
  SOCKET_DISCONNECTED,
  UPDATE_SOCKET,
} from "../utils/Strings";
import {
  defaultSocketContextState,
  SocketContextProvider,
  SocketReducer,
} from "./SocketContext";

export interface ISocketContextComponentProps extends PropsWithChildren {}

const SocketContextComponent: React.FunctionComponent<
  ISocketContextComponentProps
> = (props) => {
  const { children } = props;

  const socket = useSocket("ws://localhost:1337", {
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    autoConnect: false,
  });

  const [SocketState, SocketDispatch] = useReducer(
    SocketReducer,
    defaultSocketContextState
  );

  useEffect(() => {
    socket.connect();
    SocketDispatch({ type: UPDATE_SOCKET, payload: socket });
    StartListeners();
    // eslint-disable-next-line
  }, []);

  const StartListeners = () => {
    console.log("listener start");
    socket.on(SOCKET_DISCONNECTED, () => {
      console.info("User disconnected message received");
      SocketDispatch({ type: SOCKET_DISCONNECTED });
    });
    socket.on("result", (data) => {
      SocketDispatch({ type: CALCULATE, payload: data });
    });
  };

  return (
    <SocketContextProvider value={{ SocketState, SocketDispatch }}>
      {children}
    </SocketContextProvider>
  );
};

export default SocketContextComponent;
