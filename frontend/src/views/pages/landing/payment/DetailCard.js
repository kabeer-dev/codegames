import { Button, Card, CardMedia, Divider, Grid, Typography } from '@mui/material';
// import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
// import React, { useState, useEffect } from 'react';
import { boxStyle } from '../../../../ui-component/landing/constants/style';
// import imageIcon from '../../../../assets/images/landing/Pubg/icon.png';
// import apple from '../../../../assets/images/landing/paymentMethod/ApplePay.png';
// import card from '../../../../assets/images/landing/paymentMethod/CardPay.png';
// import LockIcon from '@mui/icons-material/Lock';
// import PaymentModal from '../../../../ui-component/landing/Components/PaymentModal';
// import img from '../../../../assets/images/landing/paymentMethod/tick.png';
// import img1 from '../../../../assets/images/landing/paymentMethod/modalImg.png';
// import img2 from '../../../../assets/images/landing/paymentMethod/modalImg1.png';
// import img3 from '../../../../assets/images/landing/paymentMethod/modalImage2.png';
import PaymentInvoice from './PaymentInvoice';
// import InvoiceModal from '../../../../ui-component/landing/Components/InvoiceModal';
// import PaymentModal2 from '../../../../ui-component/landing/Components/PaymentModal2';
import {
    // paymentSx,
    paymentWrap,
    paymentTitle,
    paymentTitleBtn
    // paymentCardNo,
    // paymentCardNoInp,
    // paymentTermInp,
    // paymentTerms,
    // paymentCVV,
    // paymentCVVInp,
    // paymentLockTxt,
    // paymentBtn,
    // paymentStrip,
    // paymentImg
} from '../../../../ui-component/landing/constants/PaymentSx';
import { useSelector } from 'react-redux';
import defaultImage from '../../../../assets/images/landing/default-noImage.jpg';
import { useEffect } from 'react';
// import myAxios from '../../../../axios';

//stripe
// import {
//   PaymentElement,
//   useStripe,
//   useElements
// } from "@stripe/react-stripe-js";
// import { useNavigate } from 'react-router-dom';
// import { CoPresentOutlined } from '@mui/icons-material';

const DetailCard = ({ pGameDetail, pPrice }) => {

    useEffect(() => {
        document.body.style.backgroundColor = '#101328';
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    // const navigate = useNavigate();
    // const stripe = useStripe();
    // const elements = useElements();
    // const [message, setMessage] = useState(null);
    // const [isLoading, setIsLoading] = useState(false);
    // const [select, setSelect] = useState('card');
    // const { email } = useSelector((state) => state.email);

    return (
        pGameDetail && (
            <>
                <Grid container>
                    <Grid item xl={6} lg={6.4} md={6} xs={12} sx={{ pt: { md: 0, xs: 3 } }} order={{ md: 1, xs: 2 }}>
                        <Card
                            sx={{
                                ...boxStyle,
                                pt: { sm: 4, xs: 2 },
                                pl: { sm: 4, xs: 2 },
                                pr: { sm: 4, xs: 2 }
                            }}
                        >
                            <Grid container>
                                <Grid
                                    item
                                    sm={8}
                                    xs={12}
                                    sx={{
                                        ...paymentWrap
                                    }}
                                    order={{ sm: 1, xs: 2 }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={
                                            pGameDetail.images && pGameDetail.images.cover && pGameDetail.images.cover.thumbnail
                                                ? pGameDetail.images.cover.thumbnail
                                                : pGameDetail.images && pGameDetail.images.cover && pGameDetail.images.cover.url
                                                    ? pGameDetail.images.cover.url
                                                    : pGameDetail.coverImageOriginal
                                                        ? pGameDetail.coverImageOriginal
                                                        : pGameDetail.coverImage
                                                            ? pGameDetail.coverImage
                                                            : pGameDetail.screenshots && pGameDetail.screenshots[0]
                                                                ? pGameDetail.screenshots[0].url
                                                                : pGameDetail.images && pGameDetail.images.screenshots && pGameDetail.images.screenshots[0]
                                                                    ? pGameDetail.images.screenshots[0].url
                                                                    : pGameDetail.screenshots && pGameDetail.screenshots[0]
                                                                        ? pGameDetail.screenshots[0].url
                                                                        : defaultImage
                                        }
                                        alt="not"
                                        sx={{ objectFit: 'fill', height: '48px', width: '48px' }}
                                    />
                                    <Typography
                                        sx={{
                                            ...paymentTitle
                                        }}
                                    >
                                        {/* Replenishment of codes PUBG Mobile */}
                                        {pGameDetail.originalName ? pGameDetail.originalName : pGameDetail.name}
                                    </Typography>
                                </Grid>
                                <Grid item sm={4} xs={12} sx={{ display: 'flex', justifyContent: 'end' }} order={{ sm: 2, xs: 1 }}>
                                    <Button
                                        sx={{
                                            ...paymentTitleBtn
                                        }}
                                    >
                                        0:15:01
                                    </Button>
                                </Grid>
                            </Grid>
                            <Divider width="100%" sx={{ py: 1, borderColor: '#303542' }} />

                            <PaymentInvoice pGameDetail={pGameDetail} pPrice={pPrice} />
                        </Card>
                    </Grid>

                    <Grid item xl={5} md={5} xs={12} sx={{ ml: { xl: 10, md: 5, xs: 0 }, pt: { md: 0, xs: 3 } }} order={{ md: 2, xs: 1 }}>
                        <div id="tz-checkout"></div>
                    </Grid>
                </Grid>

                {/* <Grid sx={{ display: { sm: "flex", xs: "block" }, my: 4 }}>
        <PaymentModal
          btntext="Payment Modal 2"
          image={img1}
          height="183px"
          width={{ sm: "520px", xs: "200px" }}
        />
        <PaymentModal
          btntext="Payment Modal 3"
          image={img2}
          height="208px"
          width={{ sm: "520px", xs: "200px" }}
        />
        <InvoiceModal />
        <PaymentModal2
          btntext="Payment Modal 4"
          image={img3}
          height="208px"
          width={{ sm: "520px", xs: "270px" }}
        />
      </Grid> */}
            </>
        )
    );
};

export default DetailCard;
