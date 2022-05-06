import { useContext } from 'react';
import { ApiEndpoints } from '../constants/ApiEndpoints';
import { UiTextMessages } from '../constants/UiTextMessages';
import { ApplicationContext } from '../context/AppContext';
import {
    GetTasksTableDataRequestParam,
    TaskDataRequestParam,
    TasksSummaryData,
    TasksTableData,
    TaskSummaryRequestParam,
} from '../model/TaskDataModel';
import { ApiHandler } from './helpers/ApiHandler';
import HttpErrorHandler from './helpers/HttpErrorHandler';
import useUtilService from './useUtilService';

const useTaskService = () => {
    const { dispatch } = useContext(ApplicationContext);
    const { setLoader, setMessage } = useUtilService();
    const { _post, _get, _delete, _put } = ApiHandler();

    const createTask = async (data: TaskDataRequestParam): Promise<any> => {
        setLoader(true);
        return _post(ApiEndpoints.task.createTask, data)
            .then(() => {
                setMessage(
                    UiTextMessages.httpSuccessMessages.taskCreateSuccess,
                );
            })
            .catch((error: any) => {
                HttpErrorHandler(error, dispatch);
                return Promise.reject(error);
            })
            .finally(() => {
                setLoader(false);
            });
    };

    const updateTask = async (data: TaskDataRequestParam): Promise<any> => {
        setLoader(true);
        return _put(ApiEndpoints.task.updateTask, data)
            .then(() => {
                setMessage(
                    UiTextMessages.httpSuccessMessages.taskUpdateSuccess,
                );
            })
            .catch((error: any) => {
                HttpErrorHandler(error, dispatch);
                return Promise.reject(error);
            })
            .finally(() => {
                setLoader(false);
            });
    };

    const getTasks = async (
        params: GetTasksTableDataRequestParam,
    ): Promise<TasksTableData> => {
        setLoader(true);
        return await _get(ApiEndpoints.task.getTasks, {
            params: { ...params },
        })
            .catch((error: any) => {
                HttpErrorHandler(error, dispatch);
                return Promise.reject(error);
            })
            .finally(() => {
                setLoader(false);
            });
    };

    const getTaskSummary = async (
        params: TaskSummaryRequestParam,
    ): Promise<TasksSummaryData> => {
        setLoader(true);
        return await _get(ApiEndpoints.task.getTaskSummary, {
            params: { ...params },
        })
            .catch((error: any) => {
                HttpErrorHandler(error, dispatch);
                return Promise.reject(error);
            })
            .finally(() => {
                setLoader(false);
            });
    };

    const deleteTask = async (taskId: number): Promise<any> => {
        setLoader(true);
        return _delete(ApiEndpoints.task.deleteTask(taskId))
            .then((res: any) => {
                setMessage(
                    UiTextMessages.httpSuccessMessages.taskDeleteSuccess,
                );
                return Promise.resolve(res);
            })
            .catch((error: any) => {
                HttpErrorHandler(error, dispatch);
                return Promise.reject(error);
            })
            .finally(() => {
                setLoader(false);
            });
    };

    return { createTask, getTasks, getTaskSummary, deleteTask, updateTask };
};

export default useTaskService;
