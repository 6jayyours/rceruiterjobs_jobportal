import { Outlet } from "react-router";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";

function App() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Outlet/>
      <Footer />
    </div>
  );
}

export default App;
