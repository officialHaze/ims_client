import React from "react";
import { Task } from "../../handlers/TaskQueuer";

interface Props {
  task: Task;
}

export default function TaskCompleteContainer({ task }: Props) {
  return (
    <div className="p-4 bg-green-500 text-white m-4 rounded-lg font-bold shadow-lg">
      <div>
        <div>
          File upload complete! Task Id:{" "}
          <span className="font-bold">{task.getTaskId().split("-")[0]}</span>
        </div>
        {/* <MdClose onClick={handleClosingErrTaskContainer} className="cursor-pointer" /> */}
      </div>
    </div>
  );
}
