import React, { useState } from 'react';
import { Card, Typography, FormControl, Checkbox, OutlinedInput, FormControlLabel, Tooltip } from '@mui/material';
import { boxStyle } from '../constants/style';
import { useSelector, useDispatch } from 'react-redux';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Skelton from './Skelton';
import { addEmail, setEmailError } from '../../../store/slices/landing/Email';
import { emailtitle, emailInput, emaildesc, checkText } from '../constants/style';
const skeltonSx = {
    width: '100%',
    height: { lg: '228px', md: '252px', sm: '228px', xs: '236px' }
};
const Email = ({ title, labal }) => {
    const dispatch = useDispatch();
    const { emailError, email } = useSelector((state) => state.email);
    const { productDetail } = useSelector((state) => state.productDetail);
    const { productGameDetail } = useSelector((state) => state.productDetail);
    //Payment and error
    // const [error, setError] = useState(false);
    const handelEmail = (inputEmail) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (inputEmail && emailRegex.test(inputEmail)) {
            dispatch(addEmail(inputEmail));
            dispatch(setEmailError(false));
        } else {
            dispatch(addEmail(null));
            dispatch(setEmailError(true));
        }
    };
    return (
        <>
            {productGameDetail && productDetail ? (
                <Card
                    sx={{
                        ...boxStyle
                    }}
                >
                    <Typography sx={{ ...emailtitle }}>1. Enter your email</Typography>
                    <Typography sx={{ ...emaildesc }}>{title}</Typography>
                    <FormControl error={emailError} sx={{ width: { sm: '70%', xs: '100%' }, pt: 1.5 }}>
                        <OutlinedInput
                            id="outlined-purchase-email"
                            type="email"
                            placeholder={email ? email : 'E-mail'}
                            name="email"
                            autoFocus={email ? false : true}
                            onChange={(e) => {
                                handelEmail(e.target.value);
                            }}
                            sx={{
                                ...emailInput,
                                border: '1px solid #5B6479',
                                background: productGameDetail.textQty ? '#1C2138' : 'rgba(131, 151, 195, 0.2)',
                                '& #outlined-purchase-email': {
                                    background: 'none',
                                    color: '#727374 !important'
                                },
                                '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#38FD63'
                                },
                                '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#38FD63'
                                },
                                // Webkit autofill styles
                                'input:-webkit-autofill': {
                                    WebkitBoxShadow: '0 0 0 0px rgba(131, 151, 195, 0.2) inset',
                                    transition: 'background-color 5000s ease-in-out 0s', // Adjust transition speed
                                    '-webkit-text-fill-color': '#848CA1'
                                }
                            }}
                            disabled={productGameDetail.textQty ? false : true}
                            inputProps={{}}
                            endAdornment={
                                <Tooltip
                                    title={
                                        <>
                                            <Typography>The content of the Question.</Typography>
                                            <Typography>The content of the Instruction.</Typography>
                                        </>
                                    }
                                    placement="top"
                                >
                                    <HelpOutlineIcon sx={{ color: '#848CA1', cursor: 'pointer' }} />
                                </Tooltip>
                            }
                        />
                    </FormControl>
                    <FormControlLabel
                        sx={{ pt: { sm: 2, xs: 1 } }}
                        control={
                            <Checkbox
                                defaultChecked
                                sx={{
                                    color: '#00EE34',
                                    '&.Mui-checked': {
                                        color: productGameDetail.textQty ? '#00EE34' : 'rgba(131, 151, 195, 0.2)'
                                    }
                                }}
                                disabled={productGameDetail.textQty ? false : true}
                            />
                        }
                        label={<Typography sx={{ ...checkText, color: productGameDetail.textQty ? '#BEBEBE' : '#5B6479' }}>{labal}</Typography>}
                    />
                </Card>
            ) : (
                <Skelton
                    style={{
                        ...skeltonSx
                    }}
                />
            )}
        </>
    );
};

export default Email;
