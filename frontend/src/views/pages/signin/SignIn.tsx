import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import useSignInData from './useSignInData';
import LoadingButton from '@mui/lab/LoadingButton';
import LoginIcon from '@mui/icons-material/Login';
import { FormInputText } from '../../common-components/forms/FormInputText';
import { UiTextMessages } from '../../../constants/UiTextMessages';
import { useNavigate } from 'react-router-dom';
import { containerStyles } from '../../../styles/ModalStyle';

const SignIn = () => {
    const { handleSubmit, control, handleSignInFormSubmit, busy } =
        useSignInData();
    const navigate = useNavigate();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box sx={{ ...containerStyles, marginTop: 8 }}>
                <Typography component="h1" variant="h5">
                    {UiTextMessages.signInPageMessages.title}
                </Typography>

                <Box
                    component="form"
                    noValidate
                    sx={{ mt: 1 }}
                    onSubmit={handleSubmit(handleSignInFormSubmit)}
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
                        {UiTextMessages.signInPageMessages.submitButtonText}
                    </LoadingButton>
                    <Grid container>
                        <Grid item>
                            <Link
                                variant="body2"
                                sx={{ cursor: 'pointer' }}
                                onClick={() => navigate('/signup')}
                            >
                                {
                                    UiTextMessages.signInPageMessages
                                        .switchToSignUpPage
                                }
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default SignIn;
