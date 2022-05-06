import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { TASK_CREATE_VALIDATION_SCHEMA } from './TaskCreateValidationSchema';
import { TaskCreateModalProps } from './TaskCreateModal';
import { useContext } from 'react';
import { TaskHistoryDataContext } from '../../../../../context/TaskHistoryDataContext';
import { useAuth } from '../../../../../hooks/useAuth';
import { formatDate } from '../../../../../utils/DateUtil';
import { TaskStatus } from '../../../../../model/TaskDataModel';

type IFTaskCreateInput = {
    date: Date;
    description: string;
    duration: number;
};

const defaultValues = {
    date: new Date(),
    description: '',
    duration: 1,
};

const useTaskCreateModalData = ({ onCancel }: TaskCreateModalProps) => {
    const { authenticatedUserEmail } = useAuth();
    const { createTask } = useContext(TaskHistoryDataContext);

    const { handleSubmit, control, reset } = useForm<IFTaskCreateInput>({
        defaultValues: defaultValues,
        resolver: yupResolver(TASK_CREATE_VALIDATION_SCHEMA),
    });

    const onSubmitDialog = async (inputData: IFTaskCreateInput) => {
        const completionDateAsString = formatDate(inputData.date);
        createTask({
            assignee: authenticatedUserEmail,
            description: inputData.description,
            status: TaskStatus.COMPLETED,
            completionDate: completionDateAsString,
            duration: inputData.duration,
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

export default useTaskCreateModalData;
