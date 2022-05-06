import { Grid, IconButton, Tooltip } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useContext, useState } from 'react';
import TaskDeleteConfirmationModal from '../../../common-components/TaskDeleteConfirmationModal';
import { TaskEntity } from '../../../../model/TaskDataModel';
import { TaskHistoryDataContext } from '../../../../context/TaskHistoryDataContext';
import CompletedTaskUpdateModal from '../modals/update/CompletedTaskUpdateModal';

const CompletedTaskTableRow = ({
    taskEntity,
    loadTasks,
}: CompletedTaskTableRowProps) => {
    const { deleteTask } = useContext(TaskHistoryDataContext);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);

    const onDeleteConfirm = async () => {
        deleteTask(taskEntity.id).then(() => setDeleteModalOpen(false));
    };
    return (
        <>
            <TableRow>
                <TableCell component="th" scope="row">
                    {taskEntity.assignee}
                </TableCell>
                <TableCell>{taskEntity.description}</TableCell>
                <TableCell>{taskEntity.status}</TableCell>
                <TableCell align="right">{taskEntity.duration}</TableCell>
                <TableCell align="right">
                    <Grid
                        container
                        alignItems="center"
                        justifyContent="flex-end"
                    >
                        <Grid item>
                            <Tooltip title="Edit">
                                <IconButton
                                    onClick={() => setUpdateModalOpen(true)}
                                    aria-label="edit"
                                >
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <Tooltip title="Delete">
                                <IconButton
                                    onClick={() => setDeleteModalOpen(true)}
                                    aria-label="delete"
                                >
                                    <DeleteForeverIcon sx={{ fill: 'red' }} />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </TableCell>
            </TableRow>
            <TaskDeleteConfirmationModal
                isOpen={deleteModalOpen}
                onCancel={() => setDeleteModalOpen(false)}
                onDeleteConfirm={onDeleteConfirm}
                taskEntity={taskEntity}
            />
            <CompletedTaskUpdateModal
                isOpen={updateModalOpen}
                onCancel={() => setUpdateModalOpen(false)}
                taskEntity={taskEntity}
                loadTasks={loadTasks}
            />
        </>
    );
};

export default CompletedTaskTableRow;

type CompletedTaskTableRowProps = {
    taskEntity: TaskEntity;
    loadTasks: any;
};
