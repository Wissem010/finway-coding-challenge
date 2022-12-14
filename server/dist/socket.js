"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerSocket = void 0;
const socket_io_1 = require("socket.io");
const event_enum_1 = require("./constants/event.enum");
const request_type_enum_1 = require("./constants/request-type.enum");
const response_status_enum_1 = require("./constants/response-status.enum");
const operation_service_1 = require("./services/operation.service");
class ServerSocket {
    constructor(server) {
        this.StartListeners = (socket) => {
            console.info("Message received from " + socket.id);
            socket.on(event_enum_1.ENUM_EVENT_NAME.ONBOARDING, () => __awaiter(this, void 0, void 0, function* () {
                console.log(socket.id, "here");
                this.SendMessage({
                    eventName: event_enum_1.ENUM_EVENT_NAME.SOCKET_CONNECTED,
                    socketId: socket.id,
                    payload: {
                        message: "onboarding happened to : " + socket.id,
                        status: response_status_enum_1.ENUM_RESPONSE_STATUS.CONNECTION_ESTABLISHED_STATUS,
                        type: request_type_enum_1.ENUM_REQUEST_TYPE.ONBOARDING,
                    },
                });
            }));
            socket.on(event_enum_1.ENUM_EVENT_NAME.CALCULATE, (operation) => __awaiter(this, void 0, void 0, function* () {
                if (operation.toLowerCase() === "history") {
                    const data = socket.id ? yield (0, operation_service_1.findHistory)(socket.id) : [];
                    this.SendMessage({
                        eventName: event_enum_1.ENUM_EVENT_NAME.RESULT,
                        socketId: socket.id,
                        payload: {
                            message: "sending history to : " + socket.id,
                            status: response_status_enum_1.ENUM_RESPONSE_STATUS.OPERATION_SUCCESS_STATUS,
                            type: request_type_enum_1.ENUM_REQUEST_TYPE.HISTORY,
                            data: data,
                        },
                    });
                    return;
                }
                const result = yield (0, operation_service_1.calculate)({
                    operationString: operation,
                    socketId: socket.id,
                });
                this.SendMessage({
                    eventName: event_enum_1.ENUM_EVENT_NAME.RESULT,
                    socketId: socket.id,
                    payload: {
                        message: "sending result to : " + socket.id,
                        status: result
                            ? response_status_enum_1.ENUM_RESPONSE_STATUS.OPERATION_SUCCESS_STATUS
                            : response_status_enum_1.ENUM_RESPONSE_STATUS.OPERATION_UNVALID_STATUS,
                        type: request_type_enum_1.ENUM_REQUEST_TYPE.CALCULATE,
                        data: result,
                    },
                });
            }));
            socket.on(event_enum_1.ENUM_EVENT_NAME.SOCKET_DISCONNECTED, () => {
                console.info("Disconnect received from: " + socket.id);
            });
        };
        this.SendMessage = ({ eventName, payload, socketId }) => {
            console.info("Emitting event: " + eventName + " to", socketId, payload);
            payload
                ? this.io.to(socketId).emit(eventName, payload)
                : this.io.to(socketId).emit(eventName);
        };
        ServerSocket.instance = this;
        this.io = new socket_io_1.Server(server, {
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
}
exports.ServerSocket = ServerSocket;
