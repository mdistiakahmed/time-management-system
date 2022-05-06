import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller } from 'react-hook-form';

type FormInputDateProps = {
    name: string;
    control: any;
    label: string;
};

const FormInputDate = ({ name, control, label }: FormInputDateProps) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label={label}
                        value={value}
                        onChange={onChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                helperText={error ? error.message : null}
                                error={!!error}
                            />
                        )}
                    />
                </LocalizationProvider>
            )}
        />
    );
};

export default FormInputDate;
