import { Card, Container, Grid } from '@mui/material';
import { boxStyle } from '../../../../../ui-component/landing/constants/style';
import React from 'react';
import TabsDescription from './TabsDescription';
import Replenishment from '../../../../../ui-component/landing/Components/Replenishment';
import PaymentDetail from '../../../../../ui-component/landing/Components/PaymentDetail';
import PaymentMethod from '../../../../../ui-component/landing/Components/PaymentMethod';
import { useSelector } from 'react-redux';
import Skelton from '../../../../../ui-component/landing/Components/Skelton';
import Email from '../../../../../ui-component/landing/Components/Email';
import { containerSpace } from '../../../../../ui-component/landing/constants/style';
import ChooseCurrency from '../../../../../ui-component/landing/Components/ChooseCurrency';
const GameDetail = () => {
    const { productDetail } = useSelector((state) => state.productDetail);
    const { productGameDetail } = useSelector((state) => state.productDetail);
    return (
        <Container
            maxWidth="xl"
            sx={{
                mt: { sm: 2, xs: 1 },
                ...containerSpace
            }}
        >
            <Grid container spacing={1}>
                <Grid item lg={7.3} md={7.5} xs={12}>
                    <Email
                        // stock={productGameDetail ? productGameDetail.qty > 0 ? true : false : true}
                        title="The purchased game with instructions will be sent to the specified E-mail."
                        labal="Save e-mail for future replenishment"
                    />
                    <ChooseCurrency subtitle="UC PUBG Mobile Activation Code (Global) can be used for all servers" bg={true} />
                    <Grid sx={{ pt: { sm: 3, xs: 2 } }}>
                        <PaymentMethod
                            title={'2. Payment Method'}
                            // stock={productGameDetail ? productGameDetail.qty > 0 ? true : false : false}
                            screen="game_purchase"
                            // modalData={<PaymentDetail stock="true" />}
                        />
                    </Grid>
                    <Grid sx={{ pt: { sm: 3, xs: 2 } }}>
                        <TabsDescription />
                    </Grid>
                    <Grid sx={{ pt: { sm: 3, xs: 2 } }}>
                        {productGameDetail && productDetail ? (
                            <Card
                                sx={{
                                    ...boxStyle
                                }}
                            >
                                <Replenishment title="3. Replenishment instructions" />
                            </Card>
                        ) : (
                            <Skelton
                                style={{
                                    width: '100%',
                                    height: {
                                        lg: '372px',
                                        md: '429px',
                                        sm: '426px',
                                        xs: '428px'
                                    }
                                }}
                            />
                        )}
                    </Grid>
                </Grid>
                <Grid item lg={0.8} md={0.2} xs={12} />
                <Grid item lg={3.9} md={4.28} xs={12} sx={{ display: { md: 'block', xs: 'none' } }}>
                    <PaymentDetail
                    //  stock={productGameDetail ? productGameDetail.qty > 0 ? true : false: false} priceCommission={priceCommission}
                    />
                    <Grid sx={{ pt: 2 }}>
                        <Card sx={{ ...boxStyle, py: '370px !important', textAlign: 'center' }}>ADS Frame</Card>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default GameDetail;
