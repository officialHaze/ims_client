import { useCallback, useState } from "react";

export default function useToastMessage() {
  const [displayToastMessage, toDisplayToastMessage] = useState(false);

  const [toastDetails, setToastDetails] = useState({
    message: "",
    status: "",
  });

  const hideToast = useCallback(() => {
    toDisplayToastMessage(false);
    setToastDetails({
      message: "",
      status: "",
    });
  }, []);

  const displayToast = useCallback(
    (message: string, status: string) => {
      toDisplayToastMessage(true);
      setToastDetails({
        message,
        status,
      });

      // Hide the toast message once displayed after a delay

      const delay = message.length * 100; // Assuming each character takes 100 ms to read by a user.
      // Then the total delay for the entire message will be calculated accordingly
      setTimeout(() => {
        hideToast();
      }, delay);
    },
    [hideToast]
  );

  return { displayToast, hideToast, isVisible: displayToastMessage, toastDetails };
}
