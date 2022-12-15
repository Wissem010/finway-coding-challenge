import {
  CALCULATE_EVENT_TYPE,
  EMPTY_HISTORY,
  HISTORY_EVENT_TYPE,
  INVALID_OPERATION,
} from "./Strings";
import { ISocketContextState } from "./types";

/** Checks the request status and type and return new state accordingly */
export const setCalculateReducerData = (
  state: ISocketContextState,
  payload: any
) => {
  if (payload.status === 7002) {
    return {
      ...state,
      error: true,
      errorMessage: INVALID_OPERATION,
      operationResult: "",
      history: [],
    };
  }
  if (payload.status === 2000) {
    if (payload.data.length === 0) {
      return { ...state, error: true, errorMessage: EMPTY_HISTORY };
    }
    if (payload.type === HISTORY_EVENT_TYPE) {
      return {
        ...state,
        history: payload.data,
        operationResult: "",
        error: false,
      };
    }
    if (payload.type === CALCULATE_EVENT_TYPE) {
      return {
        ...state,
        history: [],
        operationResult: String(payload.data),
        error: false,
      };
    }
  }
};
