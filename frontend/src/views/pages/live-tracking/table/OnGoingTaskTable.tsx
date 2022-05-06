import { TableBody } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useContext } from 'react';
import { LiveTrackingDataContext } from '../../../../context/LiveTrackingDataContext';
import DataTable from '../../../common-components/DataTable';
import NoDataMessage from '../../../common-components/NoDataMessage';
import OnGoingTaskTableRow from './OnGoingTaskTableRow';

const OnGoingTaskTable = () => {
    const { tasksTableData, setPageNumber } = useContext(
        LiveTrackingDataContext,
    );
    const { taskList, pageNumber, pageSize, totalElements } = tasksTableData;

    const onChangePage = (event: any, page: number) => {
        setPageNumber(page);
    };

    const headerRow = (
        <TableRow>
            <TableCell>Assignee</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right"> Start Time </TableCell>
            <TableCell></TableCell>
        </TableRow>
    );

    const dataRow = (
        <TableBody>
            {taskList.map((task) => (
                <OnGoingTaskTableRow key={task.id} {...task} />
            ))}
        </TableBody>
    );

    return (
        <>
            {tasksTableData.taskList.length > 0 ? (
                <DataTable
                    title="ongoing task table"
                    headerRow={headerRow}
                    dataRow={dataRow}
                    totalElements={totalElements}
                    pageSize={pageSize}
                    pageNumber={pageNumber}
                    onChangePage={onChangePage}
                />
            ) : (
                <NoDataMessage />
            )}
        </>
    );
};

export default OnGoingTaskTable;
