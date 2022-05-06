import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { FormInputText } from '../../../../common-components/forms/FormInputText';
import useCompletedTaskUpdateModalData from './useCompletedTaskUpdateModalData';
import Modal from '../../../../common-components/Modal';
import { TaskEntity } from '../../../../../model/TaskDataModel';
import { UiTextMessages } from '../../../../../constants/UiTextMessages';
import { containerStyles } from '../../../../../styles/ModalStyle';

const CompletedTaskUpdateModal = ({
    isOpen,
    onCancel,
    taskEntity,
    loadTasks,
}: CompletedTaskUpdateModalProps) => {
    const { handleSubmit, control, onDialogClose, onSubmitDialog } =
        useCompletedTaskUpdateModalData({
            isOpen,
            onCancel,
            taskEntity,
            loadTasks,
        });

    const title = (
        <Alert severity={'info'}>
            {UiTextMessages.historyPageMessages.updateModalTitle}
        </Alert>
    );

    const body = (
        <Box sx={containerStyles}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormInputText
                        name="description"
                        control={control}
                        label={
                            UiTextMessages.historyPageMessages
                                .descriptionInputLabel
                        }
                        required={true}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormInputText
                        name="duration"
                        control={control}
                        label={
                            UiTextMessages.historyPageMessages
                                .durationInputLabel
                        }
                        type="number"
                        required={true}
                    />
                </Grid>
            </Grid>
        </Box>
    );

    const actions = (
        <div>
            <Button onClick={onDialogClose}>
                {' '}
                {UiTextMessages.historyPageMessages.modalCloseText}{' '}
            </Button>
            <Button onClick={handleSubmit(onSubmitDialog)}>
                {UiTextMessages.historyPageMessages.updateButtonText}
            </Button>
        </div>
    );

    return (
        <Modal
            title={title}
            isOpen={isOpen}
            onClose={onDialogClose}
            body={body}
            modalActions={actions}
        />
    );
};

export default CompletedTaskUpdateModal;

export type CompletedTaskUpdateModalProps = {
    isOpen: boolean;
    onCancel: any;
    taskEntity: TaskEntity;
    loadTasks: any;
};
