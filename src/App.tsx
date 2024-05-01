import React from "react";
import "./App.css";
import useRoute from "./custom_hooks/useRoute";
import useAuthentication from "./custom_hooks/useAuthTokenChecker";
import { Navigate, Route, Routes } from "react-router-dom";
import { HOME, LANDING, LOGIN } from "./utils/Routes";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";

function App() {
  const pathname = useRoute();
  const { is_authenticated } = useAuthentication(pathname);

  return (
    <div className="App relative">
      <Navbar path={pathname} />
      <Routes>
        <Route path={LANDING} element={<Navigate to={LOGIN} />} />
        <Route path={LOGIN} element={is_authenticated ? <Navigate to={HOME} /> : <Login />} />
        <Route path={HOME} element={is_authenticated ? <Dashboard /> : <Navigate to={LOGIN} />} />
      </Routes>
    </div>
  );
}

export default App;

