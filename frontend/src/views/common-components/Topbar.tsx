import {
    AppBar,
    Box,
    ButtonGroup,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import React, { useContext, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppReducerActionKind } from '../../hooks/useAppReducer';
import { ApplicationContext } from '../../context/AppContext';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useAuth } from '../../hooks/useAuth';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { palette } = createTheme();
const theme = createTheme({
    palette: {
        primary: {
            main: '#e3f2fd',
        },
        secondary: {
            main: '#4db6ac',
        },
    },
});

const Topbar = () => {
    const { dispatch } = useContext(ApplicationContext);
    const { isAdmin, isManager } = useAuth();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        dispatch({ type: AppReducerActionKind.REMOVE_TOKEN, payload: {} });
    };

    const pageNevigation = (
        <React.Fragment>
            <Button
                sx={getButtonStyle(pathname === '/')}
                onClick={() => navigate('/')}
            >
                History
            </Button>
            <Button
                sx={getButtonStyle(pathname === '/tracking')}
                onClick={() => navigate('/tracking')}
            >
                Live Tracking
            </Button>
            {isAdmin || isManager ? (
                <Button
                    sx={getButtonStyle(pathname === '/users')}
                    onClick={() => navigate('/users')}
                >
                    Users
                </Button>
            ) : null}
        </React.Fragment>
    );

    const accountSettings = (
        <React.Fragment>
            <Tooltip title="Settings">
                <IconButton size="large" onClick={handleMenu} color="primary">
                    <AccountCircle />
                </IconButton>
            </Tooltip>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => navigate('/settings')}>
                    Settings
                </MenuItem>
                <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
            </Menu>
        </React.Fragment>
    );

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" color={'black'}>
                    Time Management System{' '}
                </Typography>
                <ThemeProvider theme={theme}>
                    <ButtonGroup
                        size="large"
                        variant="text"
                        aria-label="text button group"
                        sx={{ marginLeft: '10px', flexGrow: 1 }}
                    >
                        {pageNevigation}
                    </ButtonGroup>
                    <Box sx={{ flexGrow: 0 }}>{accountSettings}</Box>
                </ThemeProvider>
            </Toolbar>
        </AppBar>
    );
};

export default Topbar;

const getButtonStyle = (isSelected: boolean) => {
    return isSelected ? selectedButtonStyle : unselectedButtonStyle;
};

const unselectedButtonStyle = {
    '&.MuiButton-text': {
        color: 'white',
        fontWeight: 'bold',
        fontSize: '15px',
    },
    '&.MuiButton-text:hover': { color: 'black' },
};

const selectedButtonStyle = {
    '&.MuiButton-text': { color: '#acafcb' },
};
