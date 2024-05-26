import React from "react";
import { SiMicrosoftexcel } from "react-icons/si";

interface Props {
  file: File | null;
}

export default function Dropbox({ file }: Props) {
  return (
    <div className="h-full p-10 border-2 border-gray-400 border-dashed flex flex-col justify-center items-center cursor-pointer">
      <SiMicrosoftexcel className="text-5xl text-green-400" />
      {!file ? (
        <>
          <h2 className="text-lg text-gray-500">Drag and drop a file or click to upload</h2>
          <em className="text-sm text-gray-400">(Supported file types: xls, xlsx)</em>
        </>
      ) : (
        <p className="p-2">{file.name}</p>
      )}
    </div>
  );
}
