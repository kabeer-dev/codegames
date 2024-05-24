import { Skeleton } from '@mui/material';
import React from 'react';
const Skelton = ({ height, width, style }) => {
    return <Skeleton variant="rectangular" width={width} height={height} sx={{ backgroundColor: '#1B2037', borderRadius: 3, ...style }} />;
};

export default Skelton;
