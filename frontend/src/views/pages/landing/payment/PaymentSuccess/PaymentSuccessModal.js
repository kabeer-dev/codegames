import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import image from '../../../../../assets/images/landing/paymentMethod/tick.png';
import { CardMedia, Divider, Grid } from '@mui/material';
import { PaymentModalBtn, PaymentModalBtn2, PaymentSuccessModalstyle } from '../../../../../ui-component/landing/constants/style';
import { useNavigate } from 'react-router-dom';
import Skelton from '../../../../../ui-component/landing/Components/Skelton';
import myAxios from '../../../../../axios';

export default function PaymentSuccessModal() {
    const navigate = useNavigate();
    const [paymentData, setPaymentData] = useState(null);
    const pId = localStorage.getItem('pId');
    const pName = localStorage.getItem('pName');
    useEffect(() => {
        const getData = async () => {
            if (pName === 'wooppay') {
                const response = await myAxios.post('/payment/change-woopkassa-payment-status', { pId: pId });
            } else if (pName === 'qiwi') {
                const response = await myAxios.post('/payment/update-citypay-payment-status', { pId: pId });
            }
            const response = await myAxios.get('/payment/get-payment-data', {
                params: {
                    pId: pId
                }
            });
            if (response.status === 200) {
                const data = response.data.data.payment_data;
                setPaymentData(data);
            }
        };
        getData();
    }, []);
    return (
        <>
            {paymentData ? (
                <div>
                    <Box sx={PaymentSuccessModalstyle}>
                        <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
                            {' '}
                            <CardMedia component="img" image={image} alt="not" sx={{ objectFit: 'fill', height: '72px', width: '72px' }} />
                        </Grid>
                        <Typography variant="h2" sx={{ pt: 1, color: 'white' }}>
                            Payment Completed!
                        </Typography>
                        <Typography sx={{ pt: 1, fontSize: { sm: '16px', xs: '14px' } }}>
                            {paymentData.product.originalName ? paymentData.product.originalName : paymentData.product.name}
                        </Typography>
                        <Typography sx={{ pt: 1 }}>{paymentData.amountPaid} €</Typography>
                        <Divider sx={{ width: '100%', borderColor: '#303542', py: 1 }} />
                        <Typography sx={{ py: 2 }}>Activation code sent</Typography>
                        <Grid>
                            <Button
                                sx={{
                                    ...PaymentModalBtn
                                }}
                            >
                                {paymentData.userEmail}
                            </Button>
                        </Grid>
                        <Grid>
                            <Button
                                onClick={() => {
                                    navigate('/');
                                }}
                                sx={{
                                    ...PaymentModalBtn2
                                }}
                            >
                                Detail order{' '}
                            </Button>
                        </Grid>
                    </Box>
                </div>
            ) : (
                <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Skelton width={550} height={350} />
                </Grid>
            )}
        </>
    );
}
