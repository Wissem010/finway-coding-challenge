import {
  CALCULATE_EVENT_TYPE,
  EMPTY_HISTORY,
  HISTORY_EVENT_TYPE,
  INVALID_OPERATION,
} from "./Strings";

/** Checks the request status and type and return new state accordingly */
export const setCalculateReducerData = (state: any, payload: any) => {
  switch (payload.status) {
    case 7002:
      return {
        ...state,
        error: true,
        errorMessage: INVALID_OPERATION,
        operationResult: "",
        history: [],
      };
    case 2000:
      if (payload.type === HISTORY_EVENT_TYPE) {
        console.log(payload, "histtt");
        if (payload.data.length === 0) {
          return { ...state, error: true, errorMessage: EMPTY_HISTORY };
        }

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
