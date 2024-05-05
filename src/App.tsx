import React, { createContext } from "react";
import "./App.css";
import useRoute from "./custom_hooks/useRoute";
import useAuthentication from "./custom_hooks/useAuthTokenChecker";
import { Navigate, Route, Routes } from "react-router-dom";
import { HOME, LANDING, LOGIN, REGISTER } from "./utils/Routes";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import useToastMessage from "./custom_hooks/useToastMessage";
import ToastPopup from "./components/ToastPopup";
import Register from "./pages/Register";

export const ToastContext = createContext<{
  displayToast: (message: string, status: string) => void;
  hideToast: () => void;
} | null>(null);

function App() {
  const pathname = useRoute();
  const { is_authenticated } = useAuthentication(pathname);
  const { isVisible, displayToast, hideToast, toastDetails } = useToastMessage();

  return (
    <ToastContext.Provider value={{ displayToast, hideToast }}>
      <div className="App relative">
        <Navbar path={pathname} />
        {isVisible && (
          <ToastPopup toastMessage={toastDetails.message} toastStatus={toastDetails.status} />
        )}
        <Routes>
          <Route path={LANDING} element={<Navigate to={LOGIN} />} />

          <Route path={LOGIN} element={is_authenticated ? <Navigate to={HOME} /> : <Login />} />
          <Route
            path={REGISTER}
            element={is_authenticated ? <Navigate to={HOME} /> : <Register />}
          />

          <Route path={HOME} element={is_authenticated ? <Dashboard /> : <Navigate to={LOGIN} />} />
        </Routes>
      </div>
    </ToastContext.Provider>
  );
}

export default App;
