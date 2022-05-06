import { TableBody, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { TaskEntity } from '../../model/TaskDataModel';
import DataTable from './DataTable';

const ConfirmationDataTable = ({ taskEntity }: ConfirmationDataTableProps) => {
    const headerRow = (
        <TableRow>
            <TableCell>Assignee</TableCell>
            <TableCell>Description</TableCell>
        </TableRow>
    );
    const dataRow = (
        <TableBody>
            <TableRow>
                <TableCell component="th" scope="row">
                    {taskEntity.assignee}
                </TableCell>
                <TableCell>{taskEntity.description}</TableCell>
            </TableRow>
        </TableBody>
    );
    return (
        <DataTable
            title="delete task confirmation table"
            headerRow={headerRow}
            dataRow={dataRow}
            supportsPagination={false}
            size={'small'}
        />
    );
};

export default ConfirmationDataTable;

type ConfirmationDataTableProps = {
    taskEntity: TaskEntity;
};
