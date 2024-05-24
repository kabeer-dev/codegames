import React from 'react';
import { FaFireAlt } from 'react-icons/fa';
import { Box, Chip } from '@mui/material';
import { hotChipSx } from '../constants/style';

const HotChip = ({ text }) => {
    return (
        <Chip
            label={
                <Box sx={{ display: 'flex', lineHeight: { sm: 'normal' } }}>
                    <FaFireAlt
                        style={{
                            width: '16px',
                            height: '16px',
                            paddingTop: '2px'
                        }}
                        className="hotImg"
                    />
                    <Box component="span">{text ? text : 'Hot'}</Box>
                </Box>
            }
            sx={{
                ...hotChipSx
            }}
            className="hotChip"
        />
    );
};

export default HotChip;
