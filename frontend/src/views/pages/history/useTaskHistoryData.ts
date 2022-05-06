import { useEffect, useState } from 'react';
import { PAGE_SIZE } from '../../../constants/GeneralConstants';
import { useAuth } from '../../../hooks/useAuth';
import {
    TaskDataRequestParam,
    TasksSummaryData,
} from '../../../model/TaskDataModel';
import { DateRangeFilter } from '../../../model/UserDataModel';
import useTaskService from '../../../services/useTaskService';
import { formatDate } from '../../../utils/DateUtil';

const useTaskHistoryData = () => {
    const { authenticatedUserEmail, isAdmin } = useAuth();
    const assignee = isAdmin ? '' : authenticatedUserEmail;
    const taskService = useTaskService();
    const [tasksSummaryData, setTasksSummaryData] = useState<TasksSummaryData>({
        taskSummaryList: [],
        pageNumber: 0,
        pageSize: 0,
        totalElements: 0,
        totalPages: 0,
    });

    const [dateRangeFilter, setDateRangeFilter] = useState<DateRangeFilter>({
        startDate: new Date(),
        endDate: new Date(),
    });
    const [isExportButtonDisabled, setIsExportButtonDisabled] =
        useState<boolean>(true);
    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
    const [dateFilterModalOpen, setDateFilterModalOpen] =
        useState<boolean>(false);

    const setPageNumber = (pageNo: number) => {
        setTasksSummaryData({
            ...tasksSummaryData,
            pageNumber: pageNo,
        });
    };

    const createTask = async (data: TaskDataRequestParam): Promise<any> => {
        return taskService
            .createTask(data)
            .then(async () => {
                await loadTaskSummary();
                return Promise.resolve();
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };

    const loadTaskSummary = async (): Promise<any> => {
        taskService
            .getTaskSummary({
                startDate: formatDate(dateRangeFilter.startDate),
                endDate: formatDate(dateRangeFilter.endDate),
                assignee: assignee,
                pageNumber: tasksSummaryData.pageNumber,
                pageSize: PAGE_SIZE,
            })
            .then((res: TasksSummaryData) => {
                if (res.taskSummaryList.length === 0) {
                    setIsExportButtonDisabled(true);
                    const newPageNumber = Math.max(0, res.pageNumber - 1);
                    setTasksSummaryData({ ...res, pageNumber: newPageNumber });
                } else {
                    setIsExportButtonDisabled(false);
                    setTasksSummaryData(res);
                }
                return Promise.resolve(res);
            });
    };

    const deleteTask = async (taskId: number): Promise<any> => {
        return taskService.deleteTask(taskId).then(async (result) => {
            await loadTaskSummary();
            return Promise.resolve(result);
        });
    };

    const updateCompletedTask = async (
        data: TaskDataRequestParam,
    ): Promise<any> => {
        await taskService.updateTask(data).then(async (res: any) => {
            await loadTaskSummary();
            return Promise.resolve(res);
        });
    };

    useEffect(() => {
        loadTaskSummary();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tasksSummaryData.pageNumber, dateRangeFilter]);

    return {
        tasksSummaryData,
        setTasksSummaryData,
        dateRangeFilter,
        setDateRangeFilter,
        setPageNumber,
        createTask,
        deleteTask,
        updateCompletedTask,
        isExportButtonDisabled,
        setIsExportButtonDisabled,
        assignee,
        taskService,
        createModalOpen,
        setCreateModalOpen,
        dateFilterModalOpen,
        setDateFilterModalOpen,
    };
};

export default useTaskHistoryData;
