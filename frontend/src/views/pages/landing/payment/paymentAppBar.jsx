import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import logo from '../../../../assets/images/landing/WhiteLogo.svg';
import { CardMedia, Container, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { containerSpace } from '../../../../ui-component/landing/constants/style';
import LockIcon from '@mui/icons-material/Lock';
import { HeaderLogoWrap, HeaderLogoImg } from '../../../../ui-component/landing/constants/LayoutSx';
function PaymentAppBar({ children }) {
    return (
        <Box>
            <CssBaseline />
            <AppBar component="nav" sx={{ background: '#1C2138 !important' }}>
                <Container
                    maxWidth="xl"
                    sx={{
                        ...containerSpace
                    }}
                >
                    <Grid
                        sx={{
                            pt: 2.5,
                            pb: { sm: 2.5, xs: 0.9 },
                            display: 'flex',
                            justifyContent: { sm: 'space-between', xs: 'center' }
                        }}
                    >
                        <Grid
                            sx={{
                                ...HeaderLogoWrap,
                                display: 'flex',
                                pb: 0
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={logo}
                                alt="not"
                                sx={{
                                    ...HeaderLogoImg
                                }}
                            />
                        </Grid>
                        <Grid sx={{ display: { sm: 'flex', xs: 'none' }, alignSelf: 'center' }}>
                            <Box
                                sx={{
                                    background: 'rgba(131, 151, 195, 0.15)',
                                    color: '#8C95AD',
                                    borderRadius: '7px',
                                    p: '5px 4px 0px 4px',
                                    mr: 1
                                }}
                            >
                                <LockIcon sx={{ width: '21px', height: '21px', mb: '-3px' }} />
                            </Box>
                            <Typography
                                sx={{
                                    fontSize: '12px',
                                    fontWeight: 800,
                                    lineHeight: '16px',
                                    color: '#8C95AD',
                                    display: 'flex',
                                    alignItems: 'center',
                                    textTransform: 'uppercase'
                                }}
                            >
                                Secure Transaction
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </AppBar>
            {children}
        </Box>
    );
}
PaymentAppBar.propTypes = {
    children: PropTypes.node,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func
};

export default PaymentAppBar;
