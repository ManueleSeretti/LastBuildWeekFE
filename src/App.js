import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import Welcome from "./component/Welcome";
import AddClient from "./component/AddClient";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/addClient" element={<AddClient />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
