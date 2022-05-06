import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TaskFilterByDateModalProps } from './TaskFilterByDateModal';
import { TASK_FILTER_BY_DATE_VALIDATION_SCHEMA } from './TaskFilterByDateValidationSchema';
import { useContext, useEffect } from 'react';
import { TaskHistoryDataContext } from '../../../../../context/TaskHistoryDataContext';
import { DateRangeFilter } from '../../../../../model/UserDataModel';
import { UiTextMessages } from '../../../../../constants/UiTextMessages';

const useTaskFilterByDateModalData = ({
    onCancel,
}: TaskFilterByDateModalProps) => {
    const { dateRangeFilter, setDateRangeFilter, setPageNumber } = useContext(
        TaskHistoryDataContext,
    );

    const { handleSubmit, control, reset, watch, setError, clearErrors } =
        useForm<DateRangeFilter>({
            defaultValues: dateRangeFilter,
            resolver: yupResolver(TASK_FILTER_BY_DATE_VALIDATION_SCHEMA),
        });

    const startDateValue = watch('startDate');
    const endDateValue = watch('endDate');

    useEffect(() => {
        if (startDateValue === null || isNaN(startDateValue.getTime())) {
            setError('startDate', {
                type: 'custom',
                message:
                    UiTextMessages.historyPageMessages.startDateInvalidMessage,
            });
        }

        if (
            startDateValue !== null &&
            !isNaN(startDateValue.getTime()) &&
            endDateValue !== null &&
            !isNaN(endDateValue.getTime())
        ) {
            if (startDateValue.toDateString() <= endDateValue.toDateString()) {
                clearErrors('endDate');
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [endDateValue, startDateValue]);

    const onSubmitDialog = async (inputData: DateRangeFilter) => {
        setPageNumber(0);
        setDateRangeFilter(inputData);
        onDialogClose();
    };

    useEffect(() => {
        reset(dateRangeFilter);
    }, [dateRangeFilter, reset]);

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

export default useTaskFilterByDateModalData;
