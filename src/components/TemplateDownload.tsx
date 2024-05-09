import React from "react";

interface Props {
  templateType: string;
}

export default function TemplateDownload({ templateType }: Props) {
  return (
    <div className="px-4 py-2 border-2 border-dashed border-gray-400 text-left ">
      <section className="instructions">
        <h1 className="text-xl font-bold p-2">Please read the instructions carefully:</h1>
        <ol className="list-inside list-disc">
          <li className="p-2 text-lg">
            Download the listing template by clicking the download button below
          </li>
          <li className="p-2 text-lg">List your products and save the file</li>
          <li className="p-2 text-lg">Upload the file in the upload section below</li>
        </ol>
        <div className="p-4">
          <button className="py-2 px-6 rounded-md bg-green-500 text-white hover:opacity-70">
            Download excel template
          </button>
        </div>
      </section>
    </div>
  );
}
