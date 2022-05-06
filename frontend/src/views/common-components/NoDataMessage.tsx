import { FC } from 'react';
import { Box, Typography } from '@mui/material';

const NoDataMessage: FC = () => {
    return (
        <Box>
            <Box
                component="img"
                alt="No Data"
                src="./empty_box.jpg"
                sx={{
                    mx: 'auto',
                    mt: '20px',
                    display: 'block',
                    width: 'min(40%,300px)',
                    opacity: '0.3',
                }}
            ></Box>
            <Typography variant="h5" fontFamily={'sans-serif'} color="#898989">
                No items
            </Typography>
        </Box>
    );
};

export default NoDataMessage;
