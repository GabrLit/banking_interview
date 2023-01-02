import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Transactions from "./views/Transactions/Transactions";
import styles from "./App.module.scss";

function App() {
  return (
    <section className={styles.rootSection}>
      <Navbar />
      <Transactions />
      <Footer />
    </section>
  );
}

export default App;
