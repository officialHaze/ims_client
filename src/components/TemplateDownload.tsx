import React from "react";
import { Link } from "react-router-dom";
// import { PRODUCT_LISTING_TEMPLATE } from "../utils/Constants";

interface Props {
  templateType: string;
}

const downloadLinkMap: any = {
  PRODUCT_LISTING_TEMPLATE: `${process.env.REACT_APP_API_BASE_URL}/download-listing-template/product`,
};

export default function TemplateDownload({ templateType }: Props) {
  return (
    <div className="px-4 py-2 border-2 border-dashed border-gray-400 text-left w-1/2">
      <section className="instructions">
        <h1 className="text-xl font-bold p-2">Please read the instructions carefully:</h1>
        <ol className="list-inside list-disc">
          <li className="p-2 text-lg">
            Download the listing template by clicking the download button below
          </li>
          <li className="p-2 text-lg">List your products and save the file</li>
          <li className="p-2 text-lg">Upload the file in the upload section beside</li>
        </ol>
        <div className="p-4">
          <Link
            to={downloadLinkMap[templateType]}
            className="py-2 px-6 rounded-md bg-green-500 text-white hover:opacity-70"
          >
            Download excel template
          </Link>
        </div>
      </section>
    </div>
  );
}
