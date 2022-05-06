import Typography from '@mui/material/Typography';
import { FormInputText } from '../../common-components/forms/FormInputText';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LoginIcon from '@mui/icons-material/Login';
import LoadingButton from '@mui/lab/LoadingButton';
import { Link } from '@mui/material';
import useSignUpData from './useSignUpData';
import { UiTextMessages } from '../../../constants/UiTextMessages';
import { useNavigate } from 'react-router-dom';
import { containerStyles } from '../../../styles/ModalStyle';

const SignUp = () => {
    const { handleSubmit, control, handleSignUpFormSubmit, busy } =
        useSignUpData();
    const navigate = useNavigate();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box sx={{ ...containerStyles, marginTop: 8 }}>
                <Typography component="h1" variant="h5">
                    {UiTextMessages.signUpPageMessages.title}
                </Typography>
                <Box
                    component="form"
                    noValidate
                    sx={{ mt: 3 }}
                    onSubmit={handleSubmit(handleSignUpFormSubmit)}
                    id="signupForm"
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormInputText
                                name="email"
                                control={control}
                                label="Email"
                                required={true}
                                type="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormInputText
                                name="password"
                                control={control}
                                label="Password"
                                type="password"
                                required={true}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormInputText
                                name="confirmPassword"
                                control={control}
                                label="Confirm Password"
                                type="password"
                                required={true}
                            />
                        </Grid>
                    </Grid>
                    <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        loading={busy}
                        endIcon={<LoginIcon />}
                        loadingPosition="end"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {UiTextMessages.signUpPageMessages.submitButtonText}
                    </LoadingButton>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link
                                variant="body2"
                                sx={{ cursor: 'pointer' }}
                                onClick={() => navigate('/signin')}
                            >
                                {
                                    UiTextMessages.signUpPageMessages
                                        .switchToSignInPage
                                }
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default SignUp;
