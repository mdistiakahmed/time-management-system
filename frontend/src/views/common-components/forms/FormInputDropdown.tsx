import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Controller } from 'react-hook-form';

type IFDropdownProps = {
    name: string;
    control: any;
    label: string;
    isRequired?: boolean;
    dropDownOptions: string[];
};

const FormInputDropdown = ({
    name,
    control,
    label,
    isRequired = false,
    dropDownOptions = [],
}: IFDropdownProps) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <FormControl fullWidth required={isRequired}>
                    <InputLabel>{label}</InputLabel>
                    <>
                        <Select
                            variant="outlined"
                            label={label}
                            onChange={onChange}
                            value={value}
                            error={!!error}
                        >
                            {dropDownOptions.map((item) => (
                                <MenuItem key={item.toLowerCase()} value={item}>
                                    {item}
                                </MenuItem>
                            ))}
                        </Select>
                        {error && (
                            <FormHelperText error={!!error}>
                                {error ? error.message : null}
                            </FormHelperText>
                        )}
                    </>
                </FormControl>
            )}
        />
    );
};

export default FormInputDropdown;
