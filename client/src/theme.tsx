import { createTheme } from "@mui/material/styles";
import { BLUE, GREEN } from "./utils/Strings";

export const theme = createTheme({
  palette: {
    primary: {
      main: BLUE,
    },
    secondary: {
      main: GREEN,
    },
  },
});
