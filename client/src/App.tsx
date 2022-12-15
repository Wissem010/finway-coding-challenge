import "./App.css";
import Navbar from "./components/Navbar";
import { BLUE } from "./utils/Strings";
import Calculation from "./components/commands/Calculation";
import Result from "./components/results/Result";

function App() {
  return (
    <div>
      <Navbar />
      <div
        style={{
          backgroundColor: BLUE,
          height: "100vh",
          padding: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 100,
          }}
        >
          <Calculation />
          <Result />
        </div>
      </div>
    </div>
  );
}

export default App;
