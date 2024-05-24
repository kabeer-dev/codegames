import { Card, Container, Grid } from '@mui/material';
import { boxStyle } from '../../../../../ui-component/landing/constants/style';
import React, { useState } from 'react';
import PaymentMethod from '../../../../../ui-component/landing/Components/PaymentMethod';
import SteamPaymentDetail from '../../../../../ui-component/landing/Components/SteamPaymentDetail';
import Email from '../../../../../ui-component/landing/Components/Email';
import Instruction from '../../../../../ui-component/landing/Components/Instruction';
import ChooseCurrency from '../../../../../ui-component/landing/Components/ChooseCurrency';
import { containerSpace } from '../../../../../ui-component/landing/constants/style';
import { XboxcurrancyArr } from '../../../../../ui-component/landing/Data/XboxData';

const XboxDetail = () => {
    const [stock, setstock] = useState(true);
    return (
        <Container
            maxWidth="xl"
            sx={{
                mt: 3,
                ...containerSpace
            }}
        >
            <Grid container spacing={1}>
                <Grid item lg={7.6} md={7.5} xs={12}>
                    <Email
                        stock={true}
                        title="An activation code will be sent to the specified email address."
                        labal="Сохранить e-mail для дальнейшего пополнения"
                    />
                    <Grid sx={{ pt: { sm: 3, xs: 2 } }}>
                        <ChooseCurrency
                            arr={XboxcurrancyArr}
                            subtitle="UC PUBG Mobile Activation Code (Global) can be used for all servers"
                            bg={false}
                        />
                    </Grid>
                    <Grid sx={{ pt: { sm: 3, xs: 2 } }}>
                        <PaymentMethod title="3. Payment Method" stock={stock} screen="steam_gift_purchase" />
                    </Grid>
                    <Grid sx={{ pt: { sm: 3, xs: 2 } }}>
                        <Instruction />
                    </Grid>
                </Grid>
                <Grid item lg={0.5} md={0.2} xs={12} />
                <Grid item lg={3.9} md={4.3} xs={12} sx={{ display: { md: 'block', xs: 'none' } }}>
                    <SteamPaymentDetail title="Xbox Ultimate 1 month (Tukey)" />
                    <Grid sx={{ pt: 2 }}>
                        <Card sx={{ ...boxStyle, py: '370px !important', textAlign: 'center' }}>ADS Frame</Card>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default XboxDetail;
