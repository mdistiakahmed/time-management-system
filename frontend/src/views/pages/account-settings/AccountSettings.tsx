import { Paper, Button, Alert, Box, Grid, TextField } from '@mui/material';
import Topbar from '../../common-components/Topbar';
import { FormInputText } from '../../common-components/forms/FormInputText';
import useAccountSettingsData from './useAccountSettingsData';
import { UiTextMessages } from '../../../constants/UiTextMessages';

const AccountSettings = () => {
    const { handleSubmit, control, onSubmitDialog, userEntity, onReset } =
        useAccountSettingsData();

    return (
        <>
            <Topbar />
            <Alert severity={'info'}>
                {UiTextMessages.accountSettingsPage.pageTitle}
            </Alert>

            <Paper
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    mx: '50px',
                    padding: '50px',
                }}
            >
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginBottom: 2,
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                value={userEntity.email}
                                fullWidth
                                label="email"
                                type="text"
                                variant="outlined"
                                disabled={true}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormInputText
                                name="preferredWorkingHour"
                                control={control}
                                label={
                                    UiTextMessages.accountSettingsPage
                                        .preferredWorkingHourInputLabel
                                }
                                type="number"
                                required={true}
                            />
                        </Grid>
                    </Grid>
                </Box>

                <Button
                    variant="contained"
                    color="success"
                    sx={{ mb: '10px' }}
                    onClick={handleSubmit(onSubmitDialog)}
                >
                    {UiTextMessages.accountSettingsPage.updateButtonText}
                </Button>
                <Button variant="outlined" color="error" onClick={onReset}>
                    {UiTextMessages.accountSettingsPage.resetButtonText}
                </Button>
            </Paper>
        </>
    );
};

export default AccountSettings;
