import React from "react";
import { FileUploader } from "react-drag-drop-files";
import Dropbox from "./Dropbox";

export default function TemplateUpload() {
  return (
    <div>
      <FileUploader children={<Dropbox />} />
    </div>
  );
}
