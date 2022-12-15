import { useContext } from "react";
import SocketContext from "../../contexts/SocketContext";
import Calculation from "./Calculation";
import Guide from "./Guide";
import Result from "./Result";

export default function CommandComponent() {
  const props = useContext(SocketContext).SocketState;
  return (
    <>
      <Guide />
      <Calculation props={props} />
      <Result props={props} />
    </>
  );
}
