import { useState } from "react";
import { Task } from "../handlers/TaskQueuer";

export default function useQueueTask() {
  const [queuedTasks, setQueuedTasks] = useState<Task[]>([]);

  return { queuedTasks, setQueuedTasks };
}
