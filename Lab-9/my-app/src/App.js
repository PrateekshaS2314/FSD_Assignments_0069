import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import JSXDemo from "./pages/JSXDemo";
import WelcomeDemo from "./pages/WelcomeDemo";
import ReusableDemo from "./pages/ReusableDemo";
import PropsDemo from "./pages/PropsDemo";
import StateDemo from "./pages/StateDemo";
import EventDemo from "./pages/EventDemo";
import HooksDemo from "./pages/HooksDemo";
import FormDemo from "./pages/FormDemo";
import ConditionalDemo from "./pages/ConditionalDemo";
import APIDemo from "./pages/APIDemo";
import StudentManagement from "./pages/StudentManagement";
import UserDetails from "./pages/UserDetails";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <main className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jsx" element={<JSXDemo />} />
            <Route path="/welcome" element={<WelcomeDemo />} />
            <Route path="/components" element={<ReusableDemo />} />
            <Route path="/props" element={<PropsDemo />} />
            <Route path="/state" element={<StateDemo />} />
            <Route path="/events" element={<EventDemo />} />
            <Route path="/hooks" element={<HooksDemo />} />
            <Route path="/forms" element={<FormDemo />} />
            <Route path="/conditional" element={<ConditionalDemo />} />
            <Route path="/api" element={<APIDemo />} />
            <Route path="/students" element={<StudentManagement />} />
            <Route path="/user/:id" element={<UserDetails />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;