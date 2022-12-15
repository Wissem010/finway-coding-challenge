import "./App.css";
import Navbar from "./components/Navbar";
import { BLUE } from "./utils/Strings";
import CommandComponent from "./components/commands/CommandComponent";

function App() {
  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <div style={{ ...styles.commandContainer, flexDirection: "column" }}>
          <CommandComponent />
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    backgroundColor: BLUE,
    height: "100vh",
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  commandContainer: {
    display: "flex",
  },
};

export default App;
