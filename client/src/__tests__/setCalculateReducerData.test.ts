import { setCalculateReducerData } from "../utils/reducer";
import {
  CALCULATE_EVENT_TYPE,
  EMPTY_HISTORY,
  HISTORY_EVENT_TYPE,
  INVALID_OPERATION,
} from "../utils/Strings";

const stateMock = {
  socket: undefined,
  operationResult: "",
  history: [],
  error: false,
  errorMessage: "",
};
describe("setCalculateReducerData", () => {
  it("should return  Invalid Operation  error message", () => {
    const payloadMock = {
      status: 7002,
    };
    expect(setCalculateReducerData(stateMock, payloadMock)).toEqual({
      socket: undefined,
      error: true,
      errorMessage: INVALID_OPERATION,
      operationResult: "",
      history: [],
    });
  });
  it("should return Empty history error message", () => {
    const payloadMock = {
      status: 2000,
      type: HISTORY_EVENT_TYPE,
      data: [],
    };
    expect(setCalculateReducerData(stateMock, payloadMock)).toEqual({
      socket: undefined,
      error: true,
      errorMessage: EMPTY_HISTORY,
      operationResult: "",
      history: [],
    });
  });
  it("should return the correct history array", () => {
    const payloadMock = {
      status: 2000,
      type: HISTORY_EVENT_TYPE,
      data: [{ mock: "mock" }, { mock: "mock" }],
    };
    expect(setCalculateReducerData(stateMock, payloadMock)).toEqual({
      socket: undefined,
      error: false,
      errorMessage: "",
      operationResult: "",
      history: [{ mock: "mock" }, { mock: "mock" }],
    });
  });
  it("should return the operation result", () => {
    const payloadMock = {
      status: 2000,
      type: CALCULATE_EVENT_TYPE,
      data: 2,
    };
    expect(setCalculateReducerData(stateMock, payloadMock)).toEqual({
      socket: undefined,
      error: false,
      errorMessage: "",
      operationResult: "2",
      history: [],
    });
  });
});
