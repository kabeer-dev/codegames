import { Button, Grid } from '@mui/material';
import React from 'react';

const DeleteBtn = () => {
    return (
        <Grid sx={{ pr: 2 }}>
            <Button variant="outlined" style={{ color: '#848484', border: '1px solid #848484' }} onClick={() => window.history.back()}>
                Back
            </Button>
        </Grid>
    );
};

export default DeleteBtn;
