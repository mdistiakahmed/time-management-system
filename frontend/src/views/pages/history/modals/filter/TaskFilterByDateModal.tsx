import { Box, Button, Grid } from '@mui/material';
import Modal from '../../../../common-components/Modal';
import FormInputDate from '../../../../common-components/forms/FormInputDate';
import useTaskFilterByDateModalData from './useTaskFilterByDateModalData';
import { UiTextMessages } from '../../../../../constants/UiTextMessages';

export const filterInputName = {
    startDate: 'startDate',
    endDate: 'endDate',
};

const TaskFilterByDateModal = ({
    isOpen,
    onCancel,
}: TaskFilterByDateModalProps) => {
    const { handleSubmit, control, onDialogClose, onSubmitDialog } =
        useTaskFilterByDateModalData({
            isOpen,
            onCancel,
        });

    const body = (
        <Box
            sx={{
                marginTop: 2,
            }}
        >
            <Grid
                container
                spacing={2}
                sx={{ display: 'flex', flexDirection: 'row' }}
            >
                <Grid item>
                    <FormInputDate
                        name={filterInputName.startDate}
                        control={control}
                        label={
                            UiTextMessages.historyPageMessages.startDateLabel
                        }
                    />
                </Grid>
                <Grid item>
                    <FormInputDate
                        name={filterInputName.endDate}
                        control={control}
                        label={UiTextMessages.historyPageMessages.endDateLabel}
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
                {UiTextMessages.historyPageMessages.applyButtonText}
            </Button>
        </div>
    );

    return (
        <Modal
            title={undefined}
            isOpen={isOpen}
            onClose={onDialogClose}
            body={body}
            modalActions={actions}
        />
    );
};

export default TaskFilterByDateModal;

export type TaskFilterByDateModalProps = {
    isOpen: boolean;
    onCancel: any;
};
