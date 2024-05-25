import React from "react";
import { FileUploader } from "react-drag-drop-files";
import Dropbox from "./Dropbox";
import useToastCtx from "../custom_hooks/useToastCtx";
import { ERROR_TOAST } from "../utils/Constants";

interface Props {
  uploadedFile: File | null;
  setUploadedFile: React.Dispatch<React.SetStateAction<File | null>>;
}

export default function TemplateUpload({ uploadedFile, setUploadedFile }: Props) {
  const { displayToast } = useToastCtx();

  // This funtion will handle any error occured due to uploading wrong file type
  const handleTypeError = (err: string) => {
    // Show a toast message with the error
    displayToast(err, ERROR_TOAST);
  };

  // Handle when user uploads a file more than the max size
  const handleSizeError = (file: File) => {
    displayToast("File is too big", ERROR_TOAST);
  };

  // Handle when a file is uploaded
  const handleUpload = (file: File) => {
    console.log(file);
    setUploadedFile(file);
  };

  return (
    <div className="w-1/2 h-[17.5rem]">
      <FileUploader
        types={["xls", "xlsx"]}
        maxSize={10}
        children={<Dropbox file={uploadedFile} />}
        onTypeError={handleTypeError}
        onSizeError={handleSizeError}
        handleChange={handleUpload}
      />
    </div>
  );
}
