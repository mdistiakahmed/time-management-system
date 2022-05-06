import { Alert, Button } from '@mui/material';
import { useContext } from 'react';
import { UiTextMessages } from '../../../../../constants/UiTextMessages';
import { LiveTrackingDataContext } from '../../../../../context/LiveTrackingDataContext';
import { TaskEntity, TaskStatus } from '../../../../../model/TaskDataModel';
import ConfirmationDataTable from '../../../../common-components/ConfirmationDataTable';
import Modal from '../../../../common-components/Modal';

const TaskCompletedConfirmationModal = ({
    isOpen,
    onCancel,
    taskEntity,
}: TaskCompletedConfirmationModalProps) => {
    const { updateOngoingTask } = useContext(LiveTrackingDataContext);

    const onUpdateConfirm = async () => {
        updateOngoingTask({
            id: taskEntity.id,
            assignee: taskEntity.assignee,
            status: TaskStatus.ONGOING,
            endTimeInMillis: new Date().getTime(),
            description: taskEntity.description,
        }).then(() => onCancel());
    };

    const title = (
        <Alert severity={'info'}>
            {UiTextMessages.liveTrackingPageMessages.updateModalTitle}
        </Alert>
    );
    const body = <ConfirmationDataTable taskEntity={taskEntity} />;

    const actions = (
        <div>
            <Button onClick={onCancel}>
                {UiTextMessages.liveTrackingPageMessages.modalCloseButtonText}
            </Button>
            <Button onClick={onUpdateConfirm}>
                {
                    UiTextMessages.liveTrackingPageMessages
                        .updateModalOkButtonText
                }
            </Button>
        </div>
    );

    return (
        <Modal
            title={title}
            isOpen={isOpen}
            onClose={onCancel}
            body={body}
            modalActions={actions}
        />
    );
};

export default TaskCompletedConfirmationModal;

type TaskCompletedConfirmationModalProps = {
    isOpen: boolean;
    onCancel: () => void;
    taskEntity: TaskEntity;
};
