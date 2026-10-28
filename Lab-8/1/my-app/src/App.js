import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import EvenUsers from "./EvenUsers";
import OddUsers from "./OddUsers";
import SearchUser from "./SearchUser";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <main className="page-content">
          <Routes>
            <Route path="/even-users" element={<EvenUsers />} />
            <Route path="/odd-users" element={<OddUsers />} />
            <Route path="/search-user" element={<SearchUser />} />
            <Route path="*" element={<Navigate to="/even-users" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;