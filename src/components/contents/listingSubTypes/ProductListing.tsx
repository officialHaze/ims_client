import React, { useContext } from "react";
import TemplateDownload from "../../TemplateDownload";
import TemplateUpload from "../../TemplateUpload";
import { PRODUCT_LISTING_TEMPLATE } from "../../../utils/Constants";
import UploadButton from "../../buttons/UploadButton";
import { QueueTaskContext } from "../../../App";
import TaskQueuer, { Task } from "../../../handlers/TaskQueuer";

export default function ProductListing() {
  const queueTaskCtx = useContext(QueueTaskContext);
  if (!queueTaskCtx) throw new Error("Queue task context is null!");

  const asyncTask = (): Promise<void> => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        rej("Error while completing task");
      }, 5000);
    });
  };

  const handleClick = () => {
    // Create a new task
    const task = new Task(asyncTask);

    // Call the taskQueuer to queue the task
    TaskQueuer.queueTask(task, queueTaskCtx.updateQueuedTasks);
  };

  return (
    <div className="p-6 h-full">
      <section className="flex items-center justify-center gap-6">
        {/* Template downloader */}
        <TemplateDownload templateType={PRODUCT_LISTING_TEMPLATE} />

        {/* Template uploader */}
        <TemplateUpload />
      </section>
      <section className="p-4 mt-20">
        <UploadButton onClick={handleClick} />
      </section>
    </div>
  );
}
