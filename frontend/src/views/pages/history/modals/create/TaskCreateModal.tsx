import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Modal from '../../../../common-components/Modal';
import { FormInputText } from '../../../../common-components/forms/FormInputText';
import FormInputDate from '../../../../common-components/forms/FormInputDate';
import useTaskCreateModalData from './useTaskCreateModalData';
import { UiTextMessages } from '../../../../../constants/UiTextMessages';
import { containerStyles } from '../../../../../styles/ModalStyle';

const TaskCreateModal = ({ isOpen, onCancel }: TaskCreateModalProps) => {
    const { handleSubmit, control, onDialogClose, onSubmitDialog } =
        useTaskCreateModalData({
            isOpen,
            onCancel,
        });

    const title = (
        <Alert severity={'info'}>
            {UiTextMessages.historyPageMessages.taskCreateModalTitle}
        </Alert>
    );

    const body = (
        <Box sx={containerStyles}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormInputDate name="date" control={control} label="Date" />
                </Grid>
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
                {UiTextMessages.historyPageMessages.createModalAddText}
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

export default TaskCreateModal;

export type TaskCreateModalProps = {
    isOpen: boolean;
    onCancel: any;
};
