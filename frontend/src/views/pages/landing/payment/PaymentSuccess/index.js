import { Container, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import PaymentAppBar from '../paymentAppBar';
import { useDispatch } from 'react-redux';
import { paymentFooter } from '../../../../../store/slices/landing/paymentMethod';
import PaymentSuccessModal from './PaymentSuccessModal';
import { bodyBgColor } from '../../../../../ui-component/landing/constants/style';

const PaymentSuccess = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(paymentFooter(true));
        return () => {
            dispatch(paymentFooter(false));
        };
    }, []);
    return (
        <Grid sx={{ ...bodyBgColor, height: '100vh' }}>
            <PaymentAppBar />
            <Container
                maxWidth="xl"
                sx={{
                    pt: { md: 18.5, sm: 20, xs: 15 },
                    px: {
                        xl: '132px !important',
                        lg: '130px !important',
                        md: '40px !important',
                        sm: '80px !important'
                    }
                }}
            >
                <PaymentSuccessModal />
            </Container>
        </Grid>
    );
};

export default PaymentSuccess;
