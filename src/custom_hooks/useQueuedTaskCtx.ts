import { useContext } from "react";
import { QueueTaskContext } from "../App";

export default function useQueueTaskCtx() {
  const queueTaskCtx = useContext(QueueTaskContext);
  if (!queueTaskCtx) throw new Error("Queue task ctx is null!");

  return queueTaskCtx;
}
