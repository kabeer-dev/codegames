import { Box, useMediaQuery } from '@mui/material';
import React from 'react';

const DescriptionLength = ({ title }) => {
    const smallScreen = useMediaQuery('(max-width:600px)');
    const largeScreen = useMediaQuery('(min-width:600px)');
    return (
        <Box>
            {smallScreen && title.length > 100
                ? title.substring(0, 100) + '...'
                : largeScreen && title.length > 110
                ? title.substring(0, 110) + '...'
                : title}
        </Box>
    );
};

export default DescriptionLength;
