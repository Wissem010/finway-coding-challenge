import {
    GUIDE_TEXT,
    HISTORY_INPUT_TEXT,
    INVALID_INPUT_TEXT,
    OPERATION_INPUT_TEXT,
  } from "../../utils/Strings";
  
  export default function Guide() {
    return (
      <ul style={{ marginBottom: 40 }}>
        <p>
          <strong>{GUIDE_TEXT} </strong>
        </p>
  
        <li>{OPERATION_INPUT_TEXT}</li>
        <li>{HISTORY_INPUT_TEXT} </li>
        <li style={{ color: "#ffb300" }}>{INVALID_INPUT_TEXT}</li>
      </ul>
    );
  }
  