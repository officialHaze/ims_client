import React, { createContext, useEffect } from "react";
import "./App.css";
import useRoute from "./custom_hooks/useRoute";
import useAuthentication from "./custom_hooks/useAuthTokenChecker";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { HOME, LANDING, LOGIN, REGISTER } from "./utils/Routes";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import useToastMessage from "./custom_hooks/useToastMessage";
import ToastPopup from "./components/ToastPopup";
import Register from "./pages/Register";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import LogoutHelper from "./helpers/LogoutHelper";
import useModal from "./custom_hooks/useModal";
import Modal from "./components/modals/Modal";

const queryClient = new QueryClient();

export const ToastContext = createContext<{
  displayToast: (message: string, status: string) => void;
  hideToast: () => void;
} | null>(null);

export const ModalContext = createContext<{
  controlModalDisplay: ({
    toDisplay,
    modalType,
    extraPayload,
  }: {
    toDisplay: boolean;
    modalType: string;
    extraPayload?: any;
  }) => void;
} | null>(null);

function App() {
  const pathname = useRoute();
  const { is_authenticated } = useAuthentication(pathname);
  const { isVisible, displayToast, hideToast, toastDetails } = useToastMessage();
  const { toDisplayModal, modalType, modalPayload, controlModalDisplay } = useModal();

  const navigate = useNavigate();

  // Set all default values
  useEffect(() => {
    LogoutHelper.setNavigateFn(navigate);
  }, [navigate]);

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContext.Provider value={{ displayToast, hideToast }}>
        <ModalContext.Provider value={{ controlModalDisplay }}>
          <div className="App relative">
            <Navbar path={pathname} />
            {/* Toast message */}
            {isVisible && (
              <ToastPopup toastMessage={toastDetails.message} toastStatus={toastDetails.status} />
            )}
            {/* Modal */}
            {toDisplayModal && <Modal modalType={modalType} modalPayload={modalPayload} />}
            <Routes>
              <Route path={LANDING} element={<Navigate to={LOGIN} />} />

              <Route path={LOGIN} element={is_authenticated ? <Navigate to={HOME} /> : <Login />} />
              <Route
                path={REGISTER}
                element={is_authenticated ? <Navigate to={HOME} /> : <Register />}
              />

              <Route
                path={HOME}
                element={is_authenticated ? <Dashboard /> : <Navigate to={LOGIN} />}
              />
            </Routes>
          </div>
        </ModalContext.Provider>
      </ToastContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
