import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useContext } from 'react';
import { TaskHistoryDataContext } from '../../../../context/TaskHistoryDataContext';
import NoDataMessage from '../../../common-components/NoDataMessage';
import CollapsibleTaskSummaryTableRow from './CollapsibleTaskSummaryTableRow';
import DataTable from '../../../common-components/DataTable';
import { TasksSummaryData } from '../../../../model/TaskDataModel';

const CollapsibleTaskSummaryTable = ({
    tasksSummaryData,
}: CollapsibleTaskSummaryTableProps) => {
    const { setPageNumber } = useContext(TaskHistoryDataContext);
    const { taskSummaryList, pageNumber, pageSize, totalElements } =
        tasksSummaryData;

    const onChangePage = (event: any, page: number) => {
        setPageNumber(page);
    };

    const headerRow = (
        <TableRow>
            <TableCell />
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Assignee</TableCell>
            <TableCell align="right">Total Duration</TableCell>
            <TableCell align="right">Preferred Work Hour</TableCell>
            <TableCell align="right">Task Count</TableCell>
        </TableRow>
    );

    const dataRow = (
        <TableBody>
            {taskSummaryList.map((row) => (
                <CollapsibleTaskSummaryTableRow
                    key={row.completionDate.toString()+row.assignee}
                    {...row}
                />
            ))}
        </TableBody>
    );

    return (
        <div>
            {taskSummaryList.length > 0 ? (
                <DataTable
                    title="task summary table"
                    headerRow={headerRow}
                    dataRow={dataRow}
                    totalElements={totalElements}
                    pageNumber={pageNumber}
                    pageSize={pageSize}
                    onChangePage={onChangePage}
                />
            ) : (
                <NoDataMessage />
            )}
        </div>
    );
};

export default CollapsibleTaskSummaryTable;

type CollapsibleTaskSummaryTableProps = {
    tasksSummaryData: TasksSummaryData;
};
