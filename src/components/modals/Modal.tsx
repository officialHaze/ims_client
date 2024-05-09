import React from "react";
import AddProductModal from "./AddProductModal";
import { ADD_PRODUCT_MODAL, CONFIRMATION_MODAL, EDIT_PRODUCT_MODAL } from "../../utils/Constants";
import EditProductModal from "./EditProductModal";
import ConfirmActionModal from "./ConfirmActionModal";

interface Props extends React.HTMLProps<HTMLElement> {
  modalType: string;
  modalPayload: any | null;
}

// const modalTypeMap: any = {
//   ADD_PRODUCT_MODAL: <AddProductForm />,
// };

export default function Modal({ className, modalType, modalPayload }: Props) {
  return (
    <div className="absolute w-full h-screen z-[12] bg-[#00000060] flex items-center justify-center">
      {modalType === ADD_PRODUCT_MODAL && <AddProductModal productQuery={modalPayload} />}
      {modalType === EDIT_PRODUCT_MODAL && <EditProductModal payload={modalPayload} />}
      {modalType === CONFIRMATION_MODAL && <ConfirmActionModal payload={modalPayload} />}
    </div>
  );
}
