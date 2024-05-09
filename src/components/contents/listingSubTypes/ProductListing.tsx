import React from "react";
import TemplateDownload from "../../TemplateDownload";
import TemplateUpload from "../../TemplateUpload";
import { PRODUCT_LISTING_TEMPLATE } from "../../../utils/Constants";

export default function ProductListing() {
  return (
    <div className="p-6 flex flex-col justify-center gap-6">
      {/* Template downloader */}
      <TemplateDownload templateType={PRODUCT_LISTING_TEMPLATE} />

      {/* Template uploader */}
      <TemplateUpload />
    </div>
  );
}
