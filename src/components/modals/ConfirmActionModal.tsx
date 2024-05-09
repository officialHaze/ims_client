import React, { ReactNode, useContext } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { ModalContext } from "../../App";
import { CONFIRMATION_MODAL } from "../../utils/Constants";

interface Props {
  payload: {
    queryFn: () => void;
    message: string | ReactNode;
  };
}

export default function ConfirmActionModal({ payload }: Props) {
  const modalCtxPayload = useContext(ModalContext);
  if (!modalCtxPayload) return <pre>Modal context payload is null</pre>;

  const closeModal = () => {
    // Close the modal and do nothing
    modalCtxPayload.controlModalDisplay({
      toDisplay: false,
      modalType: CONFIRMATION_MODAL,
    });
  };

  // When clicked on cancel button
  const handleCanellation = () => {
    closeModal();
  };

  // When clicked on confirm button
  const handleConfirmation = () => {
    // Run the query function provided in the payload
    payload.queryFn();
    //  Close the modal
    closeModal();
  };

  return (
    <div className="rounded-xl overflow-hidden w-1/2 shadow-xl">
      <section className="header bg-red-500 text-left py-3 px-4 text-xl font-bold text-white flex items-center justify-between">
        Confirm action
        <span>
          <IoMdCloseCircle
            id="close-modal"
            className="text-2xl cursor-pointer"
            onClick={
              () =>
                modalCtxPayload.controlModalDisplay({
                  toDisplay: false,
                  modalType: CONFIRMATION_MODAL,
                }) // Close the modal
            }
          />
        </span>
      </section>
      <section className="body flex items-center justify-center bg-white px-10 py-10">
        {payload.message}
      </section>
      <footer className="bg-white py-4 px-6 text-right">
        <button
          className="cancel-btn py-2 px-4 rounded-lg text-white bg-red-500"
          onClick={handleCanellation}
        >
          Cancel
        </button>
        <button
          className="confirm-btn py-2 px-4 ml-4 rounded-lg bg-blue-700 text-white"
          onClick={handleConfirmation}
        >
          Confirm
        </button>
      </footer>
    </div>
  );
}
