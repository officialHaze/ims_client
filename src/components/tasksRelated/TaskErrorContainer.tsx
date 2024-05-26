import React from "react";
import TaskQueuer, { Task } from "../../handlers/TaskQueuer";
import useModalCtx from "../../custom_hooks/useModalCtx";
import { ERROR_MODAL } from "../../utils/Constants";
import { MdClose } from "react-icons/md";
import useQueueTaskCtx from "../../custom_hooks/useQueuedTaskCtx";

interface Props {
  task: Task;
}

export default function TaskErrorContainer({ task }: Props) {
  const { controlModalDisplay } = useModalCtx();
  const { updateQueuedTasks } = useQueueTaskCtx();

  // This function will handle displaying the error info
  // on a seperate modal
  const displayErrModal = () => {
    controlModalDisplay({
      toDisplay: true,
      modalType: ERROR_MODAL,
      extraPayload: {
        error: task.getTaskPayload().errorPayload?.message,
        heading: "File upload error",
      },
    });
  };

  const handleClosingErrTaskContainer = () => {
    TaskQueuer.removeTask(task.getTaskId(), updateQueuedTasks);
  };

  return (
    <div className="p-4 bg-red-500 text-white m-4 rounded-lg">
      <div className="flex justify-between items-center gap-4">
        <div>
          There was an error while uploading the file! Task Id:{" "}
          <span className="font-bold">{task.getTaskId().split("-")[0]}</span>
        </div>
        <MdClose onClick={handleClosingErrTaskContainer} className="cursor-pointer" />
      </div>
      <div
        id="modal-display-text"
        className="underline underline-offset-2 cursor-pointer font-bold text-blue-900 hover:text-white"
        onClick={displayErrModal}
      >
        Show details
      </div>
    </div>
  );
}
