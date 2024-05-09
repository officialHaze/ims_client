import React from "react";
import { SiMicrosoftexcel } from "react-icons/si";

export default function Dropbox() {
  return (
    <div className="p-10 border-2 border-gray-400 border-dashed flex flex-col justify-center items-center cursor-pointer">
      <SiMicrosoftexcel className="text-5xl text-green-400" />
      <h2 className="text-lg text-gray-500">Drag and drop or click to upload</h2>
      <em className="text-sm text-gray-400">(Supported file types: xls, xlsx)</em>
    </div>
  );
}
