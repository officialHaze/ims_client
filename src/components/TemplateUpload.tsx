import React from "react";
import { FileUploader } from "react-drag-drop-files";
import Dropbox from "./Dropbox";

export default function TemplateUpload() {
  return (
    <div className="w-1/2 h-[17.5rem]">
      <FileUploader children={<Dropbox />} />
    </div>
  );
}
