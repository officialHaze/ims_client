export default interface QueueTaskPayload {
  taskId: string;
  status: string; // "success, inProgress, error"
  errorPayload?: {
    message: string; // Can be JSONified
  };
}
