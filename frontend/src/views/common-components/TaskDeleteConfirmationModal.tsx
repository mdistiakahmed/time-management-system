import { Alert, Button } from '@mui/material';
import { TaskEntity } from '../../model/TaskDataModel';
import ConfirmationDataTable from './ConfirmationDataTable';
import Modal from './Modal';

const TaskDeleteConfirmationModal = ({
    isOpen,
    onCancel,
    onDeleteConfirm,
    taskEntity,
}: TaskDeleteConfirmationModalProps) => {
    const title = (
        <Alert severity={'error'}>Sure want to delete this task?</Alert>
    );
    const body = <ConfirmationDataTable taskEntity={taskEntity} />;

    const actions = (
        <div>
            <Button onClick={onCancel}>Cancel</Button>
            <Button onClick={onDeleteConfirm}>Delete</Button>
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

export default TaskDeleteConfirmationModal;

type TaskDeleteConfirmationModalProps = {
    isOpen: boolean;
    onCancel: () => void;
    onDeleteConfirm: () => void;
    taskEntity: TaskEntity;
};
