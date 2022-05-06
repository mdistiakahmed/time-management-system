import { createContext } from 'react';
import { TaskDataRequestParam, TasksTableData } from '../model/TaskDataModel';

export const LiveTrackingDataContext =
    createContext<LiveTrackingDataContextType>({
        tasksTableData: {
            taskList: [],
            pageNumber: 0,
            pageSize: 0,
            totalElements: 0,
            totalPages: 0,
        },
        setPageNumber: () => ({}),
        createOngoingTask: () => {
            return Promise.resolve();
        },
        loadOngoingTasks: () => {
            return Promise.resolve();
        },
        deleteOngoingTask: () => {
            return Promise.resolve();
        },
        updateOngoingTask: () => {
            return Promise.resolve();
        },
    });

export type LiveTrackingDataContextType = {
    tasksTableData: TasksTableData;
    setPageNumber: (pageNo: number) => void;
    createOngoingTask: (data: any) => Promise<void>;
    loadOngoingTasks: () => Promise<any>;
    deleteOngoingTask: (taskId: number) => Promise<any>;
    updateOngoingTask: (data: TaskDataRequestParam) => Promise<any>;
};
