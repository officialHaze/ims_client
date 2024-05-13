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
import { Task } from "./handlers/TaskQueuer";
import useQueueTask from "./custom_hooks/useQueueTask";

const queryClient = new QueryClient();

// Toast context
export const ToastContext = createContext<{
  displayToast: (message: string, status: string) => void;
  hideToast: () => void;
} | null>(null);

// Modal context
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

// Queue task context
export const QueueTaskContext = createContext<{
  updateQueuedTasks: React.Dispatch<React.SetStateAction<Task[]>>;
} | null>(null);

function App() {
  const pathname = useRoute();
  const { is_authenticated } = useAuthentication(pathname);
  const { isVisible, displayToast, hideToast, toastDetails } = useToastMessage();
  const { toDisplayModal, modalType, modalPayload, controlModalDisplay } = useModal();

  const { queuedTasks, setQueuedTasks: updateQueuedTasks } = useQueueTask();
  console.log(queuedTasks);

  const navigate = useNavigate();

  // Set all default values
  useEffect(() => {
    LogoutHelper.setNavigateFn(navigate);
  }, [navigate]);

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContext.Provider value={{ displayToast, hideToast }}>
        <ModalContext.Provider value={{ controlModalDisplay }}>
          <QueueTaskContext.Provider value={{ updateQueuedTasks }}>
            <div className="App relative">
              <Navbar path={pathname} />
              {/* Toast message */}
              {isVisible && (
                <ToastPopup toastMessage={toastDetails.message} toastStatus={toastDetails.status} />
              )}
              {/* Modal */}
              {toDisplayModal && <Modal modalType={modalType} modalPayload={modalPayload} />}

              {/* Queue Task status */}
              <div className="absolute bottom-0 right-0 z-50">
                {queuedTasks.map(task => (
                  <div className="p-4 bg-red-500 text-white m-4" key={task.getTaskId()}>
                    {task.getTaskPayload().status}
                  </div>
                ))}
              </div>

              <Routes>
                <Route path={LANDING} element={<Navigate to={LOGIN} />} />

                <Route
                  path={LOGIN}
                  element={is_authenticated ? <Navigate to={HOME} /> : <Login />}
                />
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
          </QueueTaskContext.Provider>
        </ModalContext.Provider>
      </ToastContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
