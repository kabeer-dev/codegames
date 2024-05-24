import React from 'react'
import { CardMedia, Grid, Typography, Button } from '@mui/material';
import { bodyBgColor } from 'ui-component/landing/constants/style';
import NotFoundImage from 'assets/images/landing/404_edited_2.png'
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate()

    return (
        <Grid container sx={{ ...bodyBgColor, height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Grid item md={4} sm={6} xs={12} sx={{ padding: { sm: 0, xs: 3 } }}>
                <CardMedia component="img" image={NotFoundImage} alt="404 page" />
                <Grid sx={{ textAlign: 'center', mt: 2 }}>
                    <Typography sx={{ color: '#FFFFFF', fontFamily: 'Nunito Sans', fontSize: { sm: '32px', xs: '26px' }, fontWeight: '700' }}>
                        Oops! Page Not Found.
                    </Typography>
                    <Typography sx={{ color: '#FFFFFF', fontFamily: 'Nunito Sans', fontSize: { sm: '16px', xs: '14px' }, fontWeight: '400', mt: 2 }}>
                        It looks like the page you were seeking has vanished or doesn't exist. Let's get you back on track!
                    </Typography>
                    <Button onClick={() => navigate('/')} sx={{ backgroundColor: '#00EE34', '&:hover': { backgroundColor: '#00EE34' }, borderRadius: '16px', padding: { sm: '10px 120px', xs: '8px 90px' }, mt: 2, color: '#000000', fontFamily: 'Nunito Sans', fontSize: '20px', fontWeight: '700' }}>
                        Go Home
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default NotFound