import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import Booking from "./pages/Booking";
import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.css";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
