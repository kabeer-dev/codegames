import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Button, Card, Grid, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { boxStyle } from '../../../../ui-component/landing/constants/style';
import { plateForm } from '../../../../ui-component/landing/Data/gameCatalog';
import { catalogfilterbtn, labalTxt, PlatformTxt } from '../../../../ui-component/landing/constants/GameCatSx';

export default function BottomModal({ open, close, setSelect, select }) {
    const createHandleMenuClick = (menuItem) => {
        setSelect((prev) => {
            const prevData = prev.includes(menuItem);
            if (prevData) {
                const updatedArray = prev.filter((item) => item !== menuItem);
                return updatedArray;
            } else {
                return [...prev, menuItem];
            }
        });
    };
    const drawerContent = (
        <Box sx={{ width: 'auto', background: 'rgba(44, 50, 77, 1)' }} role="presentation" onKeyDown={close}>
            <Card sx={{ ...boxStyle, pt: 3, pb: 2 }}>
                <Typography sx={{ ...PlatformTxt }}>Platforms</Typography>
                <Grid>
                    {plateForm.map((data, index) => (
                        <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography
                                sx={{
                                    ...labalTxt
                                }}
                            >
                                {data}
                            </Typography>
                            <FormControlLabel
                                onClick={() => createHandleMenuClick(data)}
                                sx={{ mr: '0px !important' }}
                                control={
                                    <Checkbox
                                        sx={{
                                            color: '#848CA1',
                                            '&.Mui-checked': {
                                                color: '#00EE34'
                                            }
                                        }}
                                        checked={select.includes(data) ? true : false}
                                    />
                                }
                            />
                        </Grid>
                    ))}
                </Grid>

                <Button
                    onClick={close}
                    fullWidth
                    sx={{
                        ...catalogfilterbtn
                    }}
                >
                    Choose filter
                </Button>
            </Card>
        </Box>
    );

    return (
        <Grid>
            <Drawer anchor="bottom" open={open} onClose={close}>
                {drawerContent}
            </Drawer>
        </Grid>
    );
}
