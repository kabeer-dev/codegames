import { Card, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { bodyBgColor } from '../../../ui-component/landing/constants/style';
import { useSelector } from 'react-redux';
import MobileLanding from './homePages/MobileLandingModel';
import MobileDropDown from './homePages/MobileDropDown';
import { containerSpace } from '../../../ui-component/landing/constants/style';
import DrawerAppBar from '../../../layout/landing/HomePageLayout';
import Footer from '../../../layout/landing/HomePageFooter';
import { UserAg1 } from '../../../ui-component/landing/Data/PrivacyData';

const commonSx = {
    fontSize: { sm: '22px', xs: '18px' },
    fontWeight: 600,
    color: '#FFFF',
    lineHeight: '28px'
};
const dataSx = {
    fontSize: { sm: '16px', xs: '14px' },
    fontWeight: 400,
    color: '#FFFF',
    lineHeight: '28px'
};
export const data01 = [
    { content: 'Do not violate the rights of third parties.' },
    { content: 'Do not use the site to distribute illegal content.' },
    { content: 'Do not use programs that simulate human actions without permission from Code Games LLC.' }
];
export const data02 = [
    { content: 'Provide access to the site 24/7, with the exception of time for maintenance.' },
    { content: "Protect the user's personal data in accordance with the privacy policy." }
];

const UserAgreemant = () => {
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
                                    Code Games LLC User Agreement
                                </Typography>
                            </Grid>
                            <Grid>
                                <Grid>
                                    <Typography
                                        sx={{
                                            ...commonSx,
                                            pb: 1
                                        }}
                                    >
                                        Introduction
                                    </Typography>

                                    <Typography sx={{ fontSize: '17px', lineHeight: '28px', display: 'flex', pb: 2 }}>
                                        Please carefully read this user agreement (hereinafter referred to as the Agreement) before using
                                        the codegames.gg website and its services. Use of the site constitutes your unconditional acceptance
                                        of the terms of this Agreement. If you do not agree to the terms, please do not use the site and its
                                        services.
                                    </Typography>
                                </Grid>
                                <Grid>
                                    <Typography
                                        sx={{
                                            ...commonSx,
                                            pb: 1
                                        }}
                                    >
                                        Definitions
                                    </Typography>
                                    <Typography sx={{ fontSize: '17px', lineHeight: '28px', display: 'flex', pb: 1.5 }}>
                                        Code Games LLC is a company providing services through the website codegames.gg. User – an
                                        individual using the codegames.gg website. Website – a set of web pages hosted in the codegames.gg
                                        domain and its subdomains. Subject of the Agreement
                                    </Typography>
                                    <Typography sx={{ fontSize: '17px', lineHeight: '28px', display: 'flex', pb: 1.5 }}>
                                        Code Games LLC provides the user with access to various services, games, and opportunities to
                                        purchase digital goods and services intended for personal, non-commercial use.
                                    </Typography>
                                </Grid>
                                <Grid>
                                    <Typography
                                        sx={{
                                            ...commonSx,
                                            pb: 0
                                        }}
                                    >
                                        Rights and obligations of the parties
                                    </Typography>
                                    <Grid>
                                        <ul>
                                            <li style={{ fontSize: '20px', lineHeight: '28px' }}>
                                                The user undertakes:
                                                <ul style={{ paddingTop: '10px' }}>
                                                    {data01.map((data, index) => (
                                                        <li
                                                            style={{
                                                                lineHeight: '22px',
                                                                fontSize: '17px',
                                                                pb: 1.5
                                                            }}
                                                        >
                                                            {data.content}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                            <li style={{ fontSize: '20px', lineHeight: '28px', paddingTop: '15px' }}>
                                                Code Games LLC undertakes to:
                                                <ul style={{ paddingTop: '10px' }}>
                                                    {data02.map((data, index) => (
                                                        <li
                                                            style={{
                                                                lineHeight: '22px',
                                                                fontSize: '17px',
                                                                pb: 1.5
                                                            }}
                                                        >
                                                            {data.content}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                        </ul>
                                    </Grid>
                                </Grid>
                                <Grid>
                                    <Typography sx={{ ...commonSx, pb: 0 }}>Use of the Services</Typography>
                                    <Grid>
                                        <ol type="1">
                                            {UserAg1.map((data, index) => (
                                                <li key={index} style={{ fontSize: '17px', lineHeight: '28px' }}>
                                                    {data.content}
                                                </li>
                                            ))}
                                        </ol>
                                    </Grid>
                                </Grid>
                                <Grid>
                                    <Typography sx={{ ...commonSx, pb: 1 }}>Payment and Return Policy Code Games LLC</Typography>
                                    <Typography
                                        sx={{
                                            fontSize: { sm: '18px', xs: '16px' },
                                            fontWeight: 500,
                                            color: '#FFFF',
                                            lineHeight: '28px',
                                            // pt: 1,
                                            pb: 1
                                        }}
                                    >
                                        Making payments and returns:
                                    </Typography>
                                    <Grid>
                                        <Typography sx={{ ...dataSx }}>
                                            Payment: You agree to pay all fees, taxes, bank charges and charges imposed by third parties in
                                            connection with your purchases.
                                        </Typography>
                                        <Typography sx={{ ...dataSx }}>
                                            Refunds: Refunds are only possible if the funds paid have not been credited to your Steam
                                            account within 10 calendar days. In all other cases, no refunds are provided. Payment system
                                            fees may be withheld when returning funds. If you have any issues with your refund, please
                                            contact our support team for assistance.
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: { sm: '17px', xs: '14px' },
                                                fontWeight: 600,
                                                color: '#FFFF',
                                                lineHeight: '28px',
                                                py: 0.8
                                            }}
                                        >
                                            Additionally:
                                        </Typography>
                                        <Typography sx={{ ...dataSx }}>
                                            We reserve the right to require additional transaction confirmations to prevent fraud. Users are
                                            required to notify Customer Service of any transaction problems within a reasonable time.
                                        </Typography>
                                        <Typography sx={{ ...dataSx }}>
                                            When using the Code Games LLC Site, you have the opportunity to purchase licenses for digital
                                            assets for personal use, which include, but are not limited to:
                                        </Typography>
                                        <Typography sx={{ ...dataSx }}>Consumer rights Protection</Typography>
                                        <Typography sx={{ ...dataSx }}>
                                            Product Descriptions: While we strive to ensure that product descriptions are accurate, we do
                                            not warrant their completeness or accuracy.
                                        </Typography>
                                        <Typography sx={{ ...dataSx }}>
                                            Returns: Transactions are final. Refunds will only be issued if expressly stated in these Terms
                                            or upon successful resolution of the dispute.
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: { sm: '18px', xs: '16px' },
                                                fontWeight: 600,
                                                color: '#FFFF',
                                                lineHeight: '28px',
                                                py: 0.8
                                            }}
                                        >
                                            Responsibility of the parties
                                        </Typography>
                                        <Typography sx={{ ...dataSx }}>
                                            The user is personally responsible for any actions performed using his account. Code Games LLC
                                            is not responsible for temporary failures and interruptions in the operation of the site and the
                                            loss of information caused by them.
                                        </Typography>
                                        <Typography sx={{ ...dataSx }}>
                                            Code Games LLC is not responsible for damages arising from the use or inability to use our
                                            services, except as required by law
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid>
                                    <Typography
                                        sx={{
                                            ...commonSx,
                                            py: 1
                                        }}
                                    >
                                        Changes to the Agreement
                                    </Typography>

                                    <Typography sx={{ fontSize: '17px', lineHeight: '28px', display: 'flex', pb: 1.5 }}>
                                        Code Games LLC has the right to change the terms of the Agreement at any time without special notice
                                        to the user; the new version of the Agreement comes into force from the moment it is posted on the
                                        website, unless otherwise provided by the new version of the Agreement.
                                    </Typography>
                                </Grid>
                                <Grid>
                                    <Typography
                                        sx={{
                                            ...commonSx,
                                            pb: 1
                                        }}
                                    >
                                        Additional terms
                                    </Typography>

                                    <Typography sx={{ fontSize: '17px', lineHeight: '28px', display: 'flex', pb: 1.5 }}>
                                        Code Games LLC has the right to set restrictions on the use of the site for all users or certain
                                        categories of users (depending on place of residence, language, etc.), including:
                                        availability/unavailability of certain functions of the site, maximum number of messages for a
                                        certain period of time, maximum the size of disk space, the maximum number of calls to the service
                                        over a certain period of time, and others.
                                    </Typography>
                                </Grid>
                                <Grid>
                                    <Typography
                                        sx={{
                                            ...commonSx,
                                            pb: 1
                                        }}
                                    >
                                        Final provisions
                                    </Typography>
                                    <Typography sx={{ fontSize: '17px', lineHeight: '28px', display: 'flex', pb: 1.5 }}>
                                        This Agreement shall be governed by and construed in accordance with the laws of Georgia. All
                                        possible disputes arising from the relations governed by this Agreement are resolved in the manner
                                        established by the legislation of Georgia, in accordance with the norms of Georgia.
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

export default UserAgreemant;
