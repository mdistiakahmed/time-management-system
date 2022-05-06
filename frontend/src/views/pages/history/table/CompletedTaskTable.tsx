import { TableBody, TableCell, TableRow } from '@mui/material';
import DataTable from '../../../common-components/DataTable';
import CompletedTaskTableRow from './CompletedTaskTableRow';
import { useEffect, useState } from 'react';
import useTaskService from '../../../../services/useTaskService';
import { TasksTableData, TaskStatus } from '../../../../model/TaskDataModel';
import { PAGE_SIZE } from '../../../../constants/GeneralConstants';

const CompletedTaskTable = ({
    assignee,
    completionDate,
    taskCount,
}: CompletedTaskTableProps) => {
    const taskService = useTaskService();
    const [tasksTableData, setTasksTableData] = useState<TasksTableData>({
        taskList: [],
        pageNumber: 0,
        pageSize: 0,
        totalElements: 0,
        totalPages: 0,
    });
    const setTaskTablePageNumber = (event: any, pageNo: number) => {
        setTasksTableData({
            ...tasksTableData,
            pageNumber: pageNo,
        });
    };
    const loadTasks = async (): Promise<any> => {
        taskService
            .getTasks({
                startDate: completionDate.toString(),
                endDate: completionDate.toString(),
                assignee: assignee,
                status: TaskStatus.COMPLETED,
                pageNumber: tasksTableData.pageNumber,
                pageSize: PAGE_SIZE,
            })
            .then((res: TasksTableData) => {
                if (res.taskList.length === 0) {
                    const newPageNumber = Math.max(0, res.pageNumber - 1);
                    setTasksTableData({ ...res, pageNumber: newPageNumber });
                } else {
                    setTasksTableData(res);
                }
                return Promise.resolve(res);
            });
    };

    useEffect(() => {
        loadTasks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tasksTableData.pageNumber, taskCount]);

    const headerRow = (
        <TableRow>
            <TableCell>Assignee</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right"> Duration </TableCell>
            <TableCell></TableCell>
        </TableRow>
    );

    const dataRow = (
        <TableBody>
            {tasksTableData.taskList.map((task) => (
                <CompletedTaskTableRow
                    key={task.id}
                    taskEntity={task}
                    loadTasks={loadTasks}
                />
            ))}
        </TableBody>
    );

    return (
        <DataTable
            title="task table"
            headerRow={headerRow}
            dataRow={dataRow}
            size="small"
            totalElements={tasksTableData.totalElements}
            pageSize={tasksTableData.pageSize}
            pageNumber={tasksTableData.pageNumber}
            onChangePage={setTaskTablePageNumber}
        />
    );
};

export default CompletedTaskTable;

type CompletedTaskTableProps = {
    assignee: string;
    completionDate: Date;
    taskCount: number;
};
