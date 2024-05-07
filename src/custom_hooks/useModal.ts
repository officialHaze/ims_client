import { useCallback, useState } from "react";

export default function useModal() {
  const [toDisplayModal, displayModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalPayload, setModalPayload] = useState<any | null>(null);

  const controlModalDisplay = useCallback(
    ({
      toDisplay,
      modalType,
      extraPayload,
    }: {
      toDisplay: boolean;
      modalType: string;
      extraPayload?: any;
    }) => {
      displayModal(toDisplay);
      setModalType(modalType);
      extraPayload && setModalPayload(extraPayload);
    },
    []
  );

  return { toDisplayModal, modalType, modalPayload, controlModalDisplay };
}
