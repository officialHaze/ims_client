import QueueTaskPayload from "../interfaces/QueueTaskPayload";

export class Task {
  private taskId: string;
  private payload: QueueTaskPayload;
  private asynTask: () => Promise<void>;

  constructor(asyncTask: () => Promise<void>) {
    this.taskId = crypto.randomUUID();
    this.payload = {
      taskId: this.taskId,
      status: "",
    };

    this.asynTask = asyncTask;
  }

  // Getter
  public getTaskId() {
    return this.taskId;
  }

  public getTaskPayload() {
    return this.payload;
  }

  public getAsyncTask() {
    return this.asynTask;
  }

  // Setter
  public setPayload(payload: QueueTaskPayload) {
    this.payload = payload;
  }
}

export default class TaskQueuer {
  private static queduedTasks: Task[] = [];

  public static async queueTask(
    task: Task,
    updateQueuedTasksState: React.Dispatch<React.SetStateAction<Task[]>>
  ) {
    try {
      const inProgressPayload: QueueTaskPayload = {
        ...task.getTaskPayload(),
        status: "inProgress",
      };
      task.setPayload(inProgressPayload);

      this.queduedTasks.push(task);

      updateQueuedTasksState([...this.queduedTasks]);

      // Run the async task
      await task.getAsyncTask()();

      // After the async task is successfully performed
      // update the task payload status
      const successPayload: QueueTaskPayload = {
        ...task.getTaskPayload(),
        status: "success",
      };
      task.setPayload(successPayload);

      // Update the queued tasks state
      updateQueuedTasksState([...this.queduedTasks]);

      // Remove the finished task after 2 secs
      setTimeout(() => {
        this.removeTask(task.getTaskId(), updateQueuedTasksState);
      }, 2000);
    } catch (err: any) {
      // Update the task payload status to error
      const errorPayload: QueueTaskPayload = {
        ...task.getTaskPayload(),
        status: "error",
        errorPayload: {
          message: err.message || "Something went wrong while completing this task",
        },
      };
      task.setPayload(errorPayload);

      // Update the queued tasks state
      updateQueuedTasksState([...this.queduedTasks]);
    }
  }

  public static removeTask(
    taskId: string,
    updateQueuedTasksState: React.Dispatch<React.SetStateAction<Task[]>>
  ) {
    const filteredQueuedTasks = this.queduedTasks.filter(task_ => task_.getTaskId() !== taskId);
    this.queduedTasks = [...filteredQueuedTasks];

    // Update the state
    updateQueuedTasksState([...this.queduedTasks]);
  }
}
