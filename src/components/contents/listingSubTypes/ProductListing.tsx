import React, { useContext, useState } from "react";
import TemplateDownload from "../../TemplateDownload";
import TemplateUpload from "../../TemplateUpload";
import { ERROR_TOAST, PRODUCT_LISTING_TEMPLATE } from "../../../utils/Constants";
import UploadButton from "../../buttons/UploadButton";
import { QueueTaskContext } from "../../../App";
import TaskQueuer, { Task } from "../../../handlers/TaskQueuer";
import ProductListingHelper from "../../../helpers/ProductListingHelper";
import useToastCtx from "../../../custom_hooks/useToastCtx";

export default function ProductListing() {
  const queueTaskCtx = useContext(QueueTaskContext);
  if (!queueTaskCtx) throw new Error("Queue task context is null!");

  const { displayToast } = useToastCtx();

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Handle sending the file to backend for further processing
  const handleClick = () => {
    if (!uploadedFile) return displayToast("Please select a file to upload!", ERROR_TOAST);

    const productListingHelper = new ProductListingHelper({
      template: uploadedFile,
      toastDisplayer: displayToast,
    });

    // productListingHelper.listProduct();

    // Create a new task
    const task = new Task(async () => productListingHelper.listProduct());

    // Call the taskQueuer to queue the task
    TaskQueuer.queueTask(task, queueTaskCtx.updateQueuedTasks);
  };

  return (
    <div className="p-6 h-full">
      <section className="flex items-center justify-center gap-6">
        {/* Template downloader */}
        <TemplateDownload templateType={PRODUCT_LISTING_TEMPLATE} />

        {/* Template uploader */}
        <TemplateUpload uploadedFile={uploadedFile} setUploadedFile={setUploadedFile} />
      </section>
      <section className="p-4 mt-20">
        <UploadButton onClick={handleClick} />
      </section>
    </div>
  );
}
