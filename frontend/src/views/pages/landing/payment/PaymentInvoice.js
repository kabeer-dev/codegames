import React from 'react';
import { Button, CardMedia, Grid, Typography } from '@mui/material';
import {
    payInvdetaialSx1,
    payInvdetaialSx2,
    payInvdetaialSx3,
    payInvbtnColor,
    payInvimageSx
} from '../../../../ui-component/landing/constants/PaymentSx';
import pay1 from '../../../../assets/images/landing/paymentMethod/Pay1.png';
import pay2 from '../../../../assets/images/landing/paymentMethod/pay2.png';
import { useSelector } from 'react-redux';

const PaymentInvoice = ({ pGameDetail, pPrice }) => {
    const { email } = useSelector((state) => state.email);
    return (
        <Grid sx={{ pt: 2 }}>
            <Grid container>
                <Grid item sm={4} xs={6}>
                    <Typography sx={{ ...payInvdetaialSx1 }}>Order number</Typography>
                </Grid>
                <Grid item sm={8} xs={6}>
                    <Typography sx={{ ...payInvdetaialSx2 }}>232321003232</Typography>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item sm={4} xs={6}>
                    <Typography sx={{ ...payInvdetaialSx1 }}>Info accaunt</Typography>
                </Grid>
                <Grid item sm={8} xs={6}>
                    <Typography
                        sx={{
                            ...payInvdetaialSx3,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {email}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item sm={4} xs={6}>
                    <Typography sx={{ ...payInvdetaialSx1 }}>Dealer</Typography>
                </Grid>
                <Grid item sm={8} xs={6}>
                    <Typography sx={{ ...payInvdetaialSx2 }}>PUBG Mobile UC Vouchers</Typography>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item sm={4} xs={6}>
                    <Typography sx={{ ...payInvdetaialSx1 }}>Saler</Typography>
                </Grid>
                <Grid item sm={8} xs={6}>
                    <Typography sx={{ ...payInvdetaialSx2 }}>PUBG</Typography>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item sm={4} xs={6}>
                    <Typography sx={{ ...payInvdetaialSx1 }}>Payment method</Typography>
                </Grid>
                <Grid item sm={8} xs={6} sx={{ display: { sm: 'flex', xs: 'block' } }}>
                    <Typography
                        sx={{
                            pt: 1,
                            ...payInvdetaialSx3
                        }}
                    >
                        Card Payments Kazakhstan{' '}
                    </Typography>
                    <Grid sx={{ pt: { sm: 0, xs: 1 }, display: 'flex' }}>
                        <Button
                            sx={{
                                ...payInvbtnColor,
                                ml: { sm: 1, xs: 0 }
                            }}
                        >
                            <CardMedia component="img" image={pay1} alt="not" sx={{ ...payInvimageSx }} />
                        </Button>
                        <Button
                            sx={{
                                ...payInvbtnColor
                            }}
                        >
                            <CardMedia component="img" image={pay2} alt="not" sx={{ ...payInvimageSx }} />
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item sm={4} xs={6}>
                    <Typography sx={{ ...payInvdetaialSx1 }}>Total amount</Typography>
                </Grid>
                <Grid item sm={8} xs={6}>
                    <Typography sx={{ ...payInvdetaialSx2 }}>{pPrice} €</Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default PaymentInvoice;
