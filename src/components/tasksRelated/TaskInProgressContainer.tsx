import React from "react";
import { Task } from "../../handlers/TaskQueuer";
import { LuLoader2 } from "react-icons/lu";

interface Props {
  task: Task;
}

export default function TaskInProgressContainer({ task }: Props) {
  return (
    <div className="p-4 bg-gray-300 text-gray-700 m-4 rounded-lg shadow-lg font-bold">
      <div className="flex items-center gap-3">
        <LuLoader2 className="animate-spin text-2xl" />
        {/* <div className="loader p-4 h-5 w-5 border animate-spin" /> */}
        File upload in progress. Please do not leave or close this window! Task Id:{" "}
        <span className="font-bold">{task.getTaskId().split("-")[0]}</span>
      </div>
    </div>
  );
}
