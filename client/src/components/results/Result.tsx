import React from "react";
import { Stack } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { GREEN } from "../../utils/Strings";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: GREEN,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Result() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {false ? <div /> : <p>Result :</p>}
      <Stack spacing={1}>
        <Item>TEST</Item>
      </Stack>
    </div>
  );
}
