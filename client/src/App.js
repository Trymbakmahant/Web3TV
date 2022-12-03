import logo from "./logo.svg";
import "./App.css";

import Navbar from "./components/pages/Navbar";
import Path from "./components/routes/Path";
import Footer from "./components/Footer/Footer";
function App() {
  return (
    <>
      <Navbar />

      <Path />
      <Footer />
    </>
  );
}

export default App;
