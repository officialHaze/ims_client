import React from "react";
import AddProductForm from "./AddProductForm";
import { ADD_PRODUCT_MODAL } from "../../utils/Constants";

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
      {modalType === ADD_PRODUCT_MODAL && <AddProductForm productQuery={modalPayload} />}
    </div>
  );
}
