import React from 'react';
import { Card, Grid, Typography, Divider, Button } from '@mui/material';
import { boxStyle } from '../constants/style';
import LockIcon from '@mui/icons-material/Lock';
import { useSelector } from 'react-redux';
import Skelton from './Skelton';
import ClearIcon from '@mui/icons-material/Clear';
import {
    steamPayDetailComm,
    steamPayDetailWrap,
    steamPayDetailTitle,
    steamPayDetailBtn,
    steamPayDetailTotal,
    steamPayDetailDivider,
    steamPayDetailDisplay,
    steamPayDetailBox
} from '../constants/style';
import { useNavigate } from 'react-router-dom';
const SteamPaymentDetail = ({ title, close }) => {
    const { skeltonStatus } = useSelector((state) => state.changeSkelton);
    const navigate = useNavigate();
    return skeltonStatus ? (
        <Card
            sx={{
                ...boxStyle,
                ...steamPayDetailBox
            }}
        >
            <Grid sx={{ ...steamPayDetailDisplay }}>
                <Typography
                    sx={{
                        ...steamPayDetailTitle
                    }}
                >
                    {title}
                </Typography>
                <ClearIcon onClick={close} sx={{ display: { md: 'none', xs: 'flex' } }} />
            </Grid>
            <Grid
                sx={{
                    ...steamPayDetailWrap
                }}
            >
                <Typography
                    sx={{
                        fontSize: { sm: '16px', xs: '14px' },
                        fontWeight: { sm: 700, xs: 400 },
                        lineHeight: '22px'
                    }}
                >
                    Will be added to your Steam balance
                </Typography>
                <Typography
                    sx={{
                        fontSize: { sm: '16px', xs: 14 },
                        fontWeight: { sm: 700, xs: 500 },
                        lineHeight: '22px'
                    }}
                >
                    1000 ₽
                </Typography>
            </Grid>
            <Divider
                sx={{
                    ...steamPayDetailDivider
                }}
            />
            <Grid sx={{ ...steamPayDetailDisplay }}>
                <Typography sx={{ ...steamPayDetailComm }}>Commission</Typography>
                <Typography sx={{ ...steamPayDetailComm }}>200.50 ₽</Typography>
            </Grid>
            <Grid sx={{ ...steamPayDetailDisplay, pt: 1.5 }}>
                <Typography
                    sx={{
                        ...steamPayDetailTotal
                    }}
                >
                    Total price
                </Typography>
                <Typography
                    sx={{
                        ...steamPayDetailTotal
                    }}
                >
                    1200.50 ₽
                </Typography>
            </Grid>
            <Button
                onClick={() => navigate('/payment')}
                fullWidth
                sx={{
                    ...steamPayDetailBtn
                }}
            >
                Buy — 1200.50 ₽
            </Button>
            <Grid sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
                <LockIcon sx={{ fontSize: '16px', color: '#848CA0' }} />{' '}
                <Typography sx={{ fontSize: '14px', color: '#848CA0' }}>&nbsp;&nbsp;Payments are securely protected</Typography>
            </Grid>
        </Card>
    ) : (
        <Skelton
            style={{
                width: '100%',
                height: { lg: '302px', md: '358px', sm: '', xs: '' }
            }}
        />
    );
};

export default SteamPaymentDetail;
