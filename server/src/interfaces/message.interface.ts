import { ENUM_EVENT_NAME } from "../constants/event.enum";
import { IResponse } from "./response.interface";

export interface IMessage {
  eventName: ENUM_EVENT_NAME;
  socketId: string;
  payload?: IResponse;
}
