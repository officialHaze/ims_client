import { useContext } from "react";
import { ModalContext } from "../App";

export default function useModalCtx() {
  const modalCtx = useContext(ModalContext);
  if (!modalCtx) throw new Error("Modal ctx payload is null!");

  return modalCtx;
}
