import React, { useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import DetailCard from './DetailCard';
import { useDispatch } from 'react-redux';
import { paymentFooter } from '../../../../store/slices/landing/paymentMethod';
import { useLocation, useNavigate } from 'react-router-dom';
import PaymentAppBar from './paymentAppBar';
import { bodyBgColor } from '../../../../ui-component/landing/constants/style';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { pGameDetail, pPrice, pId, token, pName } = location.state;
    if ((!pGameDetail, !pId)) {
        navigate('/');
    }
    // To manage page refresh
    // useEffect(() => {
    //     if (localStorage.getItem('paymentStatus') === 'false') {
    //         navigate(-1);
    //     }
    //     return () => {
    //         localStorage.setItem('paymentStatus', false);
    //     };
    // }, []);
    useEffect(() => {
        if (localStorage.getItem('paymentStatus') === 'true') {
            const options = {
                clientToken: token,
                callbacks: {
                    onPaymentSuccess: () => {
                        localStorage.setItem('pId', pId);
                        localStorage.setItem('pName', pName);
                        navigate(`/payment-success`);
                    }
                },
                style: {},
                config: {
                    redirectionTarget: 'new_window', // optional -> "self" or "new_window"
                    popup: false, // optional -> true or false // by default iframe will be embedded
                    origins: '/payment' // required only, if Tazapay iframe embedded site (your site) is loaded inside another site/iframe (your host site).
                }
            };
            window.tazapay.checkout(options);
            // localStorage.setItem('paymentStatus', false);
        }
    }, [token]);
    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(paymentFooter(true));

        return () => {
            dispatch(paymentFooter(false));
        };
    }, []);
    return (
        <Grid>
            <PaymentAppBar />
            <Container
                maxWidth="xl"
                sx={{
                    pt: { md: 18.5, sm: 20, xs: 9.3 },
                    px: {
                        xl: '132px !important',
                        lg: '130px !important',
                        md: '40px !important',
                        sm: '80px !important'
                    },
                    ...bodyBgColor
                }}
            >
                <DetailCard pGameDetail={pGameDetail} pPrice={pPrice} />
            </Container>
        </Grid>
    );
};

export default Payment;
