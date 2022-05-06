export type TaskDataRequestParam = {
    id?: number;
    assignee: string;
    description: string;
    status: TaskStatus;
    startTimeInMillis?: number;
    endTimeInMillis?: number;
    completionDate?: Date;
    duration?: number;
};

export type TaskEntity = {
    id: number;
    assignee: string;
    description: string;
    status: string;
    startTimeInMillis: number;
    completionDate: Date;
    duration: number;
    version: number;
};

export type TasksTableData = {
    taskList: TaskEntity[];
    totalElements: number;
    pageSize: number;
    pageNumber: number;
    totalPages: number;
};

export type GetTasksTableDataRequestParam = {
    startDate?: string;
    endDate?: string;
    assignee: string;
    status: string;
    pageNumber: number;
    pageSize: number;
};

export type TaskSummaryEntity = {
    id: number;
    assignee: string;
    completionDate: Date;
    totalDuration: number;
    taskCount: number;
    currentPreferredWorkingHour: number;
    version: number;
};

export type TasksSummaryData = {
    taskSummaryList: TaskSummaryEntity[];
    totalElements: number;
    pageSize: number;
    pageNumber: number;
    totalPages: number;
};

export type TaskSummaryRequestParam = {
    startDate: string;
    endDate: string;
    assignee?: string;
    pageNumber: number;
    pageSize: number;
};

export enum TaskStatus {
    COMPLETED = 'COMPLETED',
    ONGOING = 'ONGOING',
}
