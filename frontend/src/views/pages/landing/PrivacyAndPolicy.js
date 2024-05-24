import { Card, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { data1, data2, data3, data4, data5, data6 } from '../../../ui-component/landing/Data/PrivacyData';
import { bodyBgColor } from '../../../ui-component/landing/constants/style';
import { useSelector } from 'react-redux';
import MobileLanding from './homePages/MobileLandingModel';
import MobileDropDown from './homePages/MobileDropDown';
import { containerSpace } from '../../../ui-component/landing/constants/style';
import DrawerAppBar from '../../../layout/landing/HomePageLayout';
import Footer from '../../../layout/landing/HomePageFooter';
const commonSx = {
    fontSize: { sm: '22px', xs: '18px' },
    fontWeight: 600,
    color: '#FFFF',
    lineHeight: '28px'
};

const PrivacyAndPolicy = () => {
    const { status } = useSelector((state) => state.changeMobileScreen);
    const { skeltonStatus } = useSelector((state) => state.changeSkelton);
    const { dropDownStatus } = useSelector((state) => state.mobileDropDown);
    const { payFooter } = useSelector((state) => state.paymentCompCheck);
    return (
        <Grid sx={{ ...bodyBgColor }}>
            <MobileDropDown />
            <Grid
                sx={{
                    display: dropDownStatus ? 'none' : 'block'
                }}
            >
                <MobileLanding />
                <Grid
                    sx={{
                        display: dropDownStatus || payFooter ? 'none' : 'block'
                    }}
                >
                    <DrawerAppBar />
                </Grid>
                <Grid
                    sx={{
                        display: status ? 'none' : 'block'
                    }}
                >
                    <Container
                        maxWidth="xl"
                        sx={{
                            ...containerSpace,
                            pt: skeltonStatus ? { md: 20.5, sm: 28, xs: 13.3 } : '20px',
                            pb: { lg: 12, md: 10, xs: 3 }
                        }}
                    >
                        <Card sx={{ background: '#1b2038', color: '#FFFF', boxShadow: 3, px: 5, py: 3 }}>
                            <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography
                                    sx={{
                                        ...commonSx,
                                        fontSize: { sm: '25px', xs: '18px' },
                                        pb: 1.5
                                    }}
                                >
                                    Privacy Policy
                                </Typography>
                            </Grid>
                            <Typography
                                sx={{
                                    fontSize: { sm: '18px', xs: '16px' },
                                    fontWeight: 500,
                                    color: '#FFFF',
                                    lineHeight: '28px',
                                    py: { sm: 2, xs: 1 }
                                }}
                            >
                                Last update date: 02/19/2024
                            </Typography>
                            <Grid>
                                <Typography
                                    sx={{
                                        ...commonSx
                                    }}
                                >
                                    Scope and Policy Principles
                                </Typography>
                                <Grid>
                                    <ul style={{ listStyleType: 'square' }}>
                                        {data1.map((data, index) => (
                                            <li key={index} style={{ fontSize: '17px', paddingBottom: '15px', lineHeight: '28px' }}>
                                                {data.content}
                                            </li>
                                        ))}
                                    </ul>
                                </Grid>
                            </Grid>
                            <Grid>
                                <Typography
                                    sx={{
                                        ...commonSx
                                    }}
                                >
                                    What data do we collect?
                                </Typography>
                                <Grid>
                                    <ul style={{ listStyleType: 'square' }}>
                                        {data2.map((data, index) => (
                                            <li key={index} style={{ fontSize: '17px', paddingBottom: '15px', lineHeight: '28px' }}>
                                                {data.content}
                                            </li>
                                        ))}
                                    </ul>
                                </Grid>
                            </Grid>
                            <Grid>
                                <Typography
                                    sx={{
                                        ...commonSx
                                    }}
                                >
                                    Collection of statistical data
                                </Typography>
                                <Grid>
                                    {data3.map((data, index) => (
                                        <Typography key={index} sx={{ fontSize: '17px', pt: 2, lineHeight: '28px' }}>
                                            {data.content}
                                        </Typography>
                                    ))}
                                </Grid>
                            </Grid>
                            <Grid sx={{ pt: 1.5 }}>
                                <Typography
                                    sx={{
                                        ...commonSx,
                                        pt: 1
                                    }}
                                >
                                    How we use your data
                                </Typography>
                                <Grid>
                                    {data4.map((data, index) => (
                                        <Typography key={index} sx={{ fontSize: '17px', pt: 1, lineHeight: '28px' }}>
                                            {data.content}
                                        </Typography>
                                    ))}
                                </Grid>
                            </Grid>
                            <Grid sx={{ pt: 2.5 }}>
                                <Typography
                                    sx={{
                                        ...commonSx
                                    }}
                                >
                                    Purposes of processing your data
                                </Typography>
                                <Grid>
                                    <ol type="a">
                                        {data5.map((data, index) => (
                                            <li key={index} style={{ fontSize: '17px', lineHeight: '28px' }}>
                                                {data.content}
                                            </li>
                                        ))}
                                    </ol>
                                </Grid>
                                <Grid>
                                    <Typography sx={{ fontSize: '17px', lineHeight: '28px' }}>
                                        Your data may be transferred for processing in connection with:
                                    </Typography>
                                    <Grid>
                                        <ol type="a">
                                            {data6.map((data, index) => (
                                                <li key={index} style={{ fontSize: '17px', lineHeight: '28px' }}>
                                                    {data.content}
                                                </li>
                                            ))}
                                        </ol>
                                    </Grid>
                                    <Typography sx={{ fontSize: '17px', lineHeight: '28px' }}>
                                        We ensure that the transfer of data is carried out in compliance with all necessary security and
                                        confidentiality measures and in strict accordance with applicable laws.
                                    </Typography>
                                </Grid>
                                <Grid sx={{ py: 2 }}>
                                    <Typography
                                        sx={{
                                            ...commonSx,
                                            pb: 2
                                        }}
                                    >
                                        How long is your information stored?
                                    </Typography>
                                    <Typography sx={{ fontSize: '17px', lineHeight: '28px', pb: 1.5 }}>
                                        At Code Games LLC, we understand that every piece of your personal information is important and
                                        should be handled and stored as such. Therefore, we have taken the following measures to store your
                                        data:
                                    </Typography>
                                    <Typography sx={{ fontSize: '17px', lineHeight: '28px', display: 'flex', pb: 1.5 }}>
                                        Financial Information: In accordance with our legal obligations and to ensure compliance with
                                        regulatory requirements, including anti-fraud, anti-money laundering and tax regulations, financial
                                        information collected during the course of our cooperation (for example, payment of commissions,
                                        etc.) will be stored in for approximately 10 years after the closure of your account.
                                    </Typography>
                                    <Typography sx={{ fontSize: '17px', lineHeight: '28px', display: 'flex' }}>
                                        We guarantee that your information will be stored securely throughout the retention period. After
                                        this period, the information will be deleted or destroyed as appropriate to ensure your privacy and
                                        security.
                                    </Typography>
                                </Grid>
                                <Grid>
                                    <Typography
                                        sx={{
                                            ...commonSx
                                        }}
                                    >
                                        Your rights
                                    </Typography>
                                    <Typography sx={{ fontSize: '17px', lineHeight: '28px', py: 1 }}>
                                        You have the right to request access to, correction or deletion of your Personal Data. You can also
                                        object to the processing of your data or request a restriction of processing.
                                    </Typography>
                                    <Typography
                                        sx={{
                                            ...commonSx
                                        }}
                                    >
                                        Data Security
                                    </Typography>
                                    <Typography sx={{ fontSize: '17px', lineHeight: '28px', py: 1 }}>
                                        We take all necessary measures to protect your data from unauthorized access, modification,
                                        disclosure or destruction.
                                    </Typography>
                                    <Typography sx={{ ...commonSx }}>Contact us</Typography>
                                    <Typography sx={{ fontSize: '17px', lineHeight: '28px', py: 1 }}>
                                        If you have questions or suggestions about our Privacy Policy, please contact us at
                                        support@codegames.gg
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Card>
                    </Container>
                    <Grid
                        sx={{
                            background: 'rgba(131, 151, 195, 0.1)',
                            borderRadius: { sm: 0, xs: '16px 16px 0px 0px' }
                        }}
                    >
                        <Footer />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default PrivacyAndPolicy;
