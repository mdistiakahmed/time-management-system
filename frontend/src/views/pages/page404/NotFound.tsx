import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CSS from 'csstype';
import { Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import { UiTextMessages } from '../../../constants/UiTextMessages';

const imageUrl = './not_found_404.gif';

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <Container maxWidth="xl">
            <Box style={imageContainerStyle}>
                <Typography variant="h1">
                    {UiTextMessages.notFoundPageMessages.errorCode}
                </Typography>
            </Box>
            <Box style={navigationContainerStyle}>
                <Typography variant="h5">
                    {UiTextMessages.notFoundPageMessages.errorMessageHeader}{' '}
                </Typography>
                <Typography paragraph={true}>
                    {UiTextMessages.notFoundPageMessages.errorMessageBody}
                </Typography>
                <Button
                    variant="outlined"
                    startIcon={<HomeIcon />}
                    onClick={() => navigate('/')}
                >
                    {UiTextMessages.notFoundPageMessages.goHomeButtonText}
                </Button>
            </Box>
        </Container>
    );
};

export default NotFound;

const imageContainerStyle: CSS.Properties = {
    backgroundImage: `url(${imageUrl})`,
    height: '400px',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    marginTop: '40px',
};

const navigationContainerStyle: CSS.Properties = {
    marginTop: '-50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};
