import { Grid, IconButton, TableCell, TableRow, Tooltip } from '@mui/material';
import { TaskEntity } from '../../../../model/TaskDataModel';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { convertToLocalDateIsoString } from '../../../../utils/DateUtil';
import TaskDeleteConfirmationModal from '../../../common-components/TaskDeleteConfirmationModal';
import { useContext, useEffect, useState } from 'react';
import { LiveTrackingDataContext } from '../../../../context/LiveTrackingDataContext';
import TaskCompletedConfirmationModal from '../modals/update/TaskCompletedConfirmationModal';
import { UiTextMessages } from '../../../../constants/UiTextMessages';

const OnGoingTaskTableRow = (taskEntity: TaskEntity) => {
    const { deleteOngoingTask } = useContext(LiveTrackingDataContext);
    const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] =
        useState<boolean>(false);
    const [updateConfirmModalOpen, setUpdateConfirmModalOpen] =
        useState<boolean>(false);
    const onDeleteConfirm = async () => {
        deleteOngoingTask(taskEntity.id).then(() =>
            setDeleteConfirmModalOpen(false),
        );
    };

    const creationDate = new Date(taskEntity.startTimeInMillis);
    const formattedCreationDate = convertToLocalDateIsoString(
        creationDate,
    ).substring(0, 16);

    useEffect(() => {
        return () => {
            setDeleteConfirmModalOpen(false);
        };
    }, []);

    return (
        <>
            <TableRow>
                <TableCell component="th" scope="row">
                    {taskEntity.assignee}
                </TableCell>
                <TableCell>{taskEntity.description}</TableCell>
                <TableCell>{taskEntity.status}</TableCell>
                <TableCell align="right">{formattedCreationDate}</TableCell>
                <TableCell align="right">
                    <Grid
                        container
                        alignItems="center"
                        justifyContent="flex-end"
                    >
                        <Grid item>
                            <Tooltip
                                title={
                                    UiTextMessages.liveTrackingPageMessages
                                        .markAsDoneIconToolTipText
                                }
                            >
                                <IconButton
                                    onClick={() =>
                                        setUpdateConfirmModalOpen(true)
                                    }
                                    aria-label="edit"
                                >
                                    <DoneOutlineIcon sx={{ fill: 'green' }} />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <Tooltip
                                title={
                                    UiTextMessages.liveTrackingPageMessages
                                        .deleteIconTooltipText
                                }
                            >
                                <IconButton
                                    onClick={() =>
                                        setDeleteConfirmModalOpen(true)
                                    }
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
                isOpen={deleteConfirmModalOpen}
                onCancel={() => setDeleteConfirmModalOpen(false)}
                onDeleteConfirm={onDeleteConfirm}
                taskEntity={taskEntity}
            />
            <TaskCompletedConfirmationModal
                isOpen={updateConfirmModalOpen}
                onCancel={() => setUpdateConfirmModalOpen(false)}
                taskEntity={taskEntity}
            />
        </>
    );
};

export default OnGoingTaskTableRow;
