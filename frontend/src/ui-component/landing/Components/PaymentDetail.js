import React, { useState } from 'react';
import { Card, Grid, Typography, Divider, Button } from '@mui/material';
import { boxStyle } from '../constants/style';
import LockIcon from '@mui/icons-material/Lock';
import { useSelector } from 'react-redux';
import Skelton from './Skelton';
import ClearIcon from '@mui/icons-material/Clear';
import {
    gamePurDetTitle,
    gamePurDetLineH,
    gamePurDetWrap,
    gamePurDetBtn,
    gamePurDetTotal,
    gamePurDetDivi,
    gamePurDetPrice,
    gamePurDetDis
} from '../constants/GamePurchaseSX';
import { useNavigate } from 'react-router-dom';
import myAxios from '../../../axios';
import CircularProgress from '@mui/material/CircularProgress';

const PaymentDetail = ({ close }) => {
    const navigate = useNavigate();
    const { productDetail } = useSelector((state) => state.productDetail);
    const { productGameDetail } = useSelector((state) => state.productDetail);
    const { productCustomPrice } = useSelector((state) => state.productDetail);
    const { email } = useSelector((state) => state.email);
    const { activePayment } = useSelector((state) => state.paymentCompCheck);
    const [loading, setLoading] = useState(false);
    // for product name showing

    let [headingName, name] = '';
    if (productGameDetail) {
        [headingName, name] = productGameDetail.name.split(':');
    }
    const handleBuy = async () => {
        setLoading(true);
        if (email) {
            if (activePayment === 'card') {
                const response = await myAxios.post('/payment/create-tazapay-session', {
                    name: 'abc',
                    email: email,
                    country: 'US',
                    invoice_currency: 'EUR',
                    amount: productCustomPrice,
                    transaction_description: `For Buying Product from Kinguin. Product Name is ${productGameDetail.name}`,
                    productId: productGameDetail._id
                });
                if (response.status === 200) {
                    localStorage.setItem('paymentStatus', true);
                    navigate('/payment', {
                        state: {
                            pGameDetail: productGameDetail,
                            pPrice: productCustomPrice,
                            pId: response.data.data.pId,
                            token: response.data.data.token,
                            pName: activePayment
                        }
                    });
                    setLoading(false);
                } else {
                }
            } else if (activePayment === 'wooppay') {
                const response = await myAxios.post('/payment/create-woopkassa-invoice', {
                    amount: `${productCustomPrice}`,
                    back_url: `${process.env.REACT_APP_URL}/payment-success`,
                    option: 5,
                    user_phone: '03000000000',
                    productId: productGameDetail._id,
                    email: email
                });
                if (response.status === 200) {
                    const data = response.data.data;
                    localStorage.setItem('pId', data.pId);
                    localStorage.setItem('pName', activePayment);
                    setLoading(false);
                    window.location.href = data.operational_url;
                } else {
                    setLoading(false);
                }
            } else if (activePayment === 'qiwi') {
                const response = await myAxios.post('/payment/create-citypay-payment', {
                    amount: productCustomPrice,
                    productId: productGameDetail._id,
                    email: email
                });
                if (response.status === 200) {
                    const data = response.data.data;
                    localStorage.setItem('pId', data.pId);
                    localStorage.setItem('pName', activePayment);
                    window.location.href = data.payment_url;
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };
    return productGameDetail && productDetail && productCustomPrice ? (
        <Card sx={{ ...boxStyle, pt: { sm: 2.2, xs: 1.5 }, pb: { sm: 2.2, xs: 1.5 } }}>
            <Grid sx={{ ...gamePurDetDis }}>
                {name ? (
                    <Typography
                        sx={{
                            ...gamePurDetTitle
                        }}
                    >
                        {headingName}: <br />
                        {name}
                    </Typography>
                ) : (
                    <Typography
                        sx={{
                            ...gamePurDetTitle
                        }}
                    >
                        {productGameDetail.name}
                    </Typography>
                )}
                <ClearIcon onClick={close} sx={{ display: { md: 'none', xs: 'flex' } }} />
            </Grid>
            {productGameDetail.textQty ? (
                <>
                    <Grid
                        sx={{
                            ...gamePurDetWrap
                        }}
                    >
                        <Typography sx={{ ...gamePurDetLineH }}>Price</Typography>
                        <Typography sx={{ textDecoration: 'line-through', ...gamePurDetLineH }}>{productCustomPrice} €</Typography>
                    </Grid>
                    <Typography sx={{ ...gamePurDetPrice }}>{productCustomPrice} €</Typography>
                    <Divider
                        sx={{
                            ...gamePurDetDivi
                        }}
                    />
                    <Grid sx={{ ...gamePurDetDis }}>
                        <Typography sx={{ ...gamePurDetLineH }}>Commission</Typography>
                        <Typography sx={{ ...gamePurDetLineH }}>{0} €</Typography>
                    </Grid>
                    <Grid sx={{ ...gamePurDetDis, pt: 1 }}>
                        <Typography
                            sx={{
                                ...gamePurDetTotal
                            }}
                        >
                            Total price
                        </Typography>
                        <Typography
                            sx={{
                                ...gamePurDetTotal
                            }}
                        >
                            {productCustomPrice} €
                        </Typography>
                    </Grid>
                </>
            ) : (
                ''
            )}
            <Button
                onClick={() => handleBuy()}
                fullWidth
                style={{
                    background: productGameDetail.textQty ? '#00EE34' : '#5B6479',
                    color: '#000000'
                }}
                sx={{
                    ...gamePurDetBtn
                }}
                disabled={productGameDetail.textQty ? false : true}
            >
                {loading ? (
                    <CircularProgress sx={{ color: '#1b2038' }} />
                ) : productGameDetail.textQty ? (
                    `Buy — ${productCustomPrice} €`
                ) : (
                    'Not available'
                )}
                {/* {stock ? `Buy — ${(productDetail.price + priceCommission).toFixed(2)} ₽` : "Нет в наличии"} */}
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
                height: { lg: '402px', md: '352px' }
            }}
        />
    );
};

export default PaymentDetail;
