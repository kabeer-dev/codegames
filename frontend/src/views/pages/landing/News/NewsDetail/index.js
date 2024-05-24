import { Card, Container, Grid } from '@mui/material';
import { boxStyle } from '../../../../../ui-component/landing/constants/style';
import React from 'react';
import Section1 from './Section1';
import WarSection from './WarSection';
import { containerSpace } from '../../../../../ui-component/landing/constants/style';

const NewsDetail = () => {
    return (
        <Container
            maxWidth="xl"
            sx={{
                mt: { lg: 2.5, xs: 1 },
                ...containerSpace
            }}
        >
            <Grid container spacing={1}>
                <Grid item lg={7.6} md={7.5} xs={12} sx={{ mt: 2 }}>
                    <Section1 />
                    <Grid sx={{ pt: { sm: 2, xs: 2 } }}>
                        <WarSection />
                    </Grid>
                </Grid>
                <Grid item lg={0.5} md={0.2} xs={12} />
                <Grid item lg={3.9} md={4.3} xs={12} sx={{ display: { md: 'block', xs: 'none' } }}>
                    <Grid sx={{ pt: 2 }}>
                        <Card sx={{ ...boxStyle, py: '370px !important', textAlign: 'center' }}>ADS Frame</Card>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default NewsDetail;
