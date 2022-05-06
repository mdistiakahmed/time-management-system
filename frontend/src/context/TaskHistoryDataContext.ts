import { createContext } from 'react';
import { TaskDataRequestParam } from '../model/TaskDataModel';
import { DateRangeFilter } from '../model/UserDataModel';

export const TaskHistoryDataContext = createContext<TaskHistoryDataContextType>(
    {
        dateRangeFilter: { startDate: new Date(), endDate: new Date() },
        setDateRangeFilter: () => ({}),
        setPageNumber: () => ({}),
        createTask: () => {
            return Promise.resolve();
        },
        deleteTask: () => {
            return Promise.resolve();
        },
        updateCompletedTask: () => {
            return Promise.resolve();
        },
    },
);

export type TaskHistoryDataContextType = {
    dateRangeFilter: DateRangeFilter;
    setDateRangeFilter: (data: DateRangeFilter) => void;
    setPageNumber: (pageNo: number) => void;
    createTask: (data: any) => Promise<void>;
    deleteTask: (taskId: number) => Promise<any>;
    updateCompletedTask: (data: TaskDataRequestParam) => Promise<any>;
};
