import { Stack } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { GREEN } from "../../utils/Strings";
import { IHistory, ISocketContextState } from "../../utils/types";

/** Custom styled paper */
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: GREEN,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Result: React.FunctionComponent<{ props: ISocketContextState }> = ({
  props,
}) => {
  const { history, operationResult, error, errorMessage } = props;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div>
        {operationResult && (
          <div>
            <p>Result :</p>
            <Stack spacing={1}>
              <Item>
                <strong>{operationResult}</strong>
              </Item>
            </Stack>
          </div>
        )}
      </div>
      <div>
        {history.length !== 0 && (
          <div>
            <p>History:</p>
            <Stack spacing={1}>
              {history.map((h: IHistory, i: number) => {
                return (
                  <Item key={i}>
                    <strong>{h.operation + " = " + h.result}</strong>
                  </Item>
                );
              })}
            </Stack>
          </div>
        )}
      </div>
      <div>
        {error && (
          <div style={{ color: "red", fontWeight: 700 }}>{errorMessage}</div>
        )}
      </div>
    </div>
  );
};
export default Result;
