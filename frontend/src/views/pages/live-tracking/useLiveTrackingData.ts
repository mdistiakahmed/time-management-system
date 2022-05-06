import { useEffect, useState } from 'react';
import { PAGE_SIZE } from '../../../constants/GeneralConstants';
import { useAuth } from '../../../hooks/useAuth';
import {
    TaskDataRequestParam,
    TasksTableData,
    TaskStatus,
} from '../../../model/TaskDataModel';
import useTaskService from '../../../services/useTaskService';

const useLiveTrackingData = () => {
    const { authenticatedUserEmail, isAdmin } = useAuth();
    const taskService = useTaskService();
    const [createOngoingTaskModalOpen, setCreateOngoingTaskModalOpen] =
        useState<boolean>(false);
    const [tasksTableData, setTasksTableData] = useState<TasksTableData>({
        taskList: [],
        pageNumber: 0,
        pageSize: 0,
        totalElements: 0,
        totalPages: 0,
    });

    const setPageNumber = (pageNo: number) => {
        setTasksTableData({
            ...tasksTableData,
            pageNumber: pageNo,
        });
    };

    const createOngoingTask = async (
        data: TaskDataRequestParam,
    ): Promise<any> => {
        return taskService
            .createTask(data)
            .then(async () => {
                await loadOngoingTasks();
                return Promise.resolve();
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };

    const loadOngoingTasks = async (): Promise<any> => {
        const assignee = isAdmin ? '' : authenticatedUserEmail;

        taskService
            .getTasks({
                assignee: assignee,
                status: TaskStatus.ONGOING,
                pageNumber: tasksTableData.pageNumber,
                pageSize: PAGE_SIZE,
            })
            .then((res: TasksTableData) => {
                if (res.taskList.length === 0) {
                    const newPageNumber = Math.max(0, res.pageNumber - 1);
                    setTasksTableData({
                        ...res,
                        pageNumber: newPageNumber,
                    });
                } else {
                    setTasksTableData(res);
                }
                return Promise.resolve(res);
            });
    };

    const deleteOngoingTask = async (taskId: number): Promise<any> => {
        return taskService.deleteTask(taskId).then(async (result) => {
            return loadOngoingTasks();
        });
    };

    const updateOngoingTask = async (
        data: TaskDataRequestParam,
    ): Promise<any> => {
        await taskService.updateTask(data).then(async (res: any) => {
            loadOngoingTasks();
            return Promise.resolve(res);
        });
    };

    useEffect(() => {
        loadOngoingTasks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tasksTableData.pageNumber]);

    return {
        createOngoingTaskModalOpen,
        setCreateOngoingTaskModalOpen,
        tasksTableData,
        setTasksTableData,
        setPageNumber,
        createOngoingTask,
        loadOngoingTasks,
        deleteOngoingTask,
        updateOngoingTask,
    };
};

export default useLiveTrackingData;
