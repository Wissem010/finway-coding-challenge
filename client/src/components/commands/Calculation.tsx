import React, { useContext, useState } from "react";
import { TextField, Button } from "@mui/material";
import SocketContext from "../../contexts/SocketContext";
import { RESET, SEND } from "../../utils/Strings";

export default function Calculation() {
  const { socket } = useContext(SocketContext).SocketState;

  const [value, setValue] = useState("");
  function handleChange(e: any) {
    setValue(e.target.value);
  }
  return (
    <div style={styles.container}>
      <TextField
        style={styles.textField}
        value={value}
        onChange={handleChange}
        focused={true}
        color="secondary"
        sx={{ input: { color: "white" } }}
        label="Type your command"
        placeholder="Command ..."
      />
      <Button
        style={styles.button}
        color="secondary"
        variant="contained"
        onClick={() => {
          socket?.emit("calculate", value);
        }}
      >
        {SEND}
      </Button>
      <Button
        style={styles.button}
        color="secondary"
        variant="outlined"
        onClick={() => {
          setValue("");
        }}
      >
        {RESET}
      </Button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  textField: {
    width: "40%",
    minWidth: 500,
    marginRight: 20,
  },
  button: {
    marginRight: 10,
    borderRadius: 16,
    width: 120,
  },
};
