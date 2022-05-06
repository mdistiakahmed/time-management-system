import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { CreateNewOngoingTaskModalProps } from './CreateNewOngoingTaskModal';
import { useContext } from 'react';
import { LiveTrackingDataContext } from '../../../../../context/LiveTrackingDataContext';
import { useAuth } from '../../../../../hooks/useAuth';
import { TaskStatus } from '../../../../../model/TaskDataModel';
import { CREATE_ONGOING_TASK_VALIDATION_SCHEMA } from './CreateOngoingTaskValidationSchema';

type IFCreateNewOngoingTasInput = {
    description: string;
};

const defaultValues = {
    description: '',
};

const useCreateNewOngoingTaskModalData = ({
    onCancel,
}: CreateNewOngoingTaskModalProps) => {
    const { authenticatedUserEmail } = useAuth();
    const { createOngoingTask } = useContext(LiveTrackingDataContext);
    const { handleSubmit, control, reset } =
        useForm<IFCreateNewOngoingTasInput>({
            defaultValues: defaultValues,
            resolver: yupResolver(CREATE_ONGOING_TASK_VALIDATION_SCHEMA),
        });

    const onSubmitDialog = async (inputData: IFCreateNewOngoingTasInput) => {
        createOngoingTask({
            assignee: authenticatedUserEmail,
            description: inputData.description,
            status: TaskStatus.ONGOING,
            startTimeInMillis: new Date().getTime(),
        }).then(() => {
            onDialogClose();
        });
    };

    const onDialogClose = () => {
        reset();
        onCancel();
    };

    return {
        handleSubmit,
        control,
        onDialogClose,
        onSubmitDialog,
    };
};

export default useCreateNewOngoingTaskModalData;
