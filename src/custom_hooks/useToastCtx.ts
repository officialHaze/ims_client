import { useContext } from "react";
import { ToastContext } from "../App";

export default function useToastCtx() {
  const toastCtxPayload = useContext(ToastContext);
  if (!toastCtxPayload) throw new Error("Toast context payload is null!");

  return { ...toastCtxPayload };
}
