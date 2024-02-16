import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateOrder from "../pages/CreateOrder";
import Home from "../pages/Home";

import Navbar from "./Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/create-order" element={<CreateOrder />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
