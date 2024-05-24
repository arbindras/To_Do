import Header from "./components/partials/Header.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/Home.jsx";
function App() {

  return (
    <>
      <BrowserRouter>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;