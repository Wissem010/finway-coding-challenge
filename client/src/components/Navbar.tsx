import logo from "../assets/logos/finway.png";

export default function Navbar() {
  return (
    <div style={styles.container}>
      <img src={logo} alt="" />
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    padding: 20,
  },
  logo: {
    justfiyContent: "flex-start",
  },
};
