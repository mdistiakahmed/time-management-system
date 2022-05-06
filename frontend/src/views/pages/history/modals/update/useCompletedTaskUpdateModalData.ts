import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TaskHistoryDataContext } from '../../../../../context/TaskHistoryDataContext';
import { TaskStatus } from '../../../../../model/TaskDataModel';
import { CompletedTaskUpdateModalProps } from './CompletedTaskUpdateModal';
import { COMPLETED_TASK_UPDATE_VALIDATION_SCHEMA } from './CompletedTaskUpdateValidationSchema';

type IFCompletedTaskUpdateInput = {
    description: string;
    duration: number;
};

const useCompletedTaskUpdateModalData = ({
    onCancel,
    taskEntity,
    loadTasks,
}: CompletedTaskUpdateModalProps) => {
    const { updateCompletedTask } = useContext(TaskHistoryDataContext);
    const { handleSubmit, control, reset } =
        useForm<IFCompletedTaskUpdateInput>({
            defaultValues: {
                description: taskEntity.description,
                duration: taskEntity.duration,
            },
            resolver: yupResolver(COMPLETED_TASK_UPDATE_VALIDATION_SCHEMA),
        });

    const onSubmitDialog = async (inputData: IFCompletedTaskUpdateInput) => {
        updateCompletedTask({
            id: taskEntity.id,
            assignee: taskEntity.assignee,
            status: TaskStatus.COMPLETED,
            completionDate: taskEntity.completionDate,
            description: inputData.description,
            duration: inputData.duration,
        }).then(async () => {
            loadTasks();
            onDialogClose();
        });
    };

    useEffect(() => {
        reset(taskEntity);
    }, [taskEntity, reset]);

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

export default useCompletedTaskUpdateModalData;
