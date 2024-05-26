import React, { useEffect } from "react";
import AddProductModal from "./AddProductModal";
import {
  ADD_PRODUCT_MODAL,
  CONFIRMATION_MODAL,
  EDIT_PRODUCT_MODAL,
  ERROR_MODAL,
} from "../../utils/Constants";
import EditProductModal from "./EditProductModal";
import ConfirmActionModal from "./ConfirmActionModal";
import ErrorModal from "./ErrorModal";
import useModalCtx from "../../custom_hooks/useModalCtx";

interface Props extends React.HTMLProps<HTMLElement> {
  modalType: string;
  modalPayload: any | null;
}

// const modalTypeMap: any = {
//   ADD_PRODUCT_MODAL: <AddProductForm />,
// };

export default function Modal({ className, modalType, modalPayload }: Props) {
  const { controlModalDisplay } = useModalCtx();

  // This hook will monitor any click outside the modal main container to close it
  useEffect(() => {
    const handleClick = (e: any) => {
      let currentElem = e.target;
      let id = currentElem.id ?? null;
      // Drill up the elements to look for an element with id
      while (!id) {
        currentElem = currentElem.parentElement;
        id = currentElem.id;
      }

      if (!id.includes("modal")) controlModalDisplay({ toDisplay: false, modalType: ERROR_MODAL }); // Close the modal
    };

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, [controlModalDisplay]);

  return (
    <div className="absolute w-full h-screen z-[20] bg-[#00000060] flex items-center justify-center">
      {modalType === ADD_PRODUCT_MODAL && <AddProductModal productQuery={modalPayload} />}
      {modalType === EDIT_PRODUCT_MODAL && <EditProductModal payload={modalPayload} />}
      {modalType === CONFIRMATION_MODAL && <ConfirmActionModal payload={modalPayload} />}
      {modalType === ERROR_MODAL && (
        <ErrorModal error={modalPayload.error} heading={modalPayload.heading} />
      )}
    </div>
  );
}
