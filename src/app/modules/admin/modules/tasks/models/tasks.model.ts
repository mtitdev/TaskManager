export interface TaskItem {
    position?: number;
    task: string;
    plannedDate: string;
    completedDate?: string;
    status?: string;
    id?: string;
}
export type TasksList = Array<TaskItem>;

export interface UserTasks {
    userId: string;
    tasks: TasksList;
}
export type TasksArray = Array<UserTasks>;