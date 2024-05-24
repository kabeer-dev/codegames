import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { boxStyle, charTitle } from '../../../../../ui-component/landing/constants/style';
import { Card, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import Skelton from '../../../../../ui-component/landing/Components/Skelton';
import { gamePurDetTab, gamePurDetTabTxt } from '../../../../../ui-component/landing/constants/GamePurchaseSX';
function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{ pt: { sm: 3, xs: 3 }, pb: { sm: 3, xs: 0.5 } }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
};
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}
export default function BasicTabs() {
    const [value, setValue] = React.useState(0);
    const { productDetail } = useSelector((state) => state.productDetail);
    const { productGameDetail } = useSelector((state) => state.productDetail);
    const [productDescriptionCharacters, setProductDescriptionCharacters] = React.useState(250);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return productDetail && productGameDetail ? (
        <Card sx={{ ...boxStyle }}>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab
                            sx={{
                                ...gamePurDetTab
                            }}
                            label="Description"
                            {...a11yProps(0)}
                        />
                        <Tab
                            sx={{
                                ...gamePurDetTab
                            }}
                            label="Characteristics"
                            {...a11yProps(1)}
                        />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <Typography sx={{ ...charTitle, pb: { sm: 1.5, xs: 1 } }}>Game Description</Typography>
                    <Typography
                        sx={{
                            color: '#FFFF',
                            fontSize: { sm: '18px', xs: '13px' },
                            lineHeight: { sm: '32px', xs: '22px' },
                            pr: { md: 7, xs: 3 }
                        }}
                    >
                        {productGameDetail.description ? productGameDetail.description : 'N/A'}
                    </Typography>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <Grid>
                        <Typography sx={{ ...charTitle }}>Game characteristics</Typography>
                        <Grid container sx={{ pt: { sm: 1.5, xs: 3.5 } }}>
                            <Grid item sm={4.5} xs={4} sx={{ ...gamePurDetTabTxt }}>
                                {' '}
                                Platform{' '}
                            </Grid>
                            <Grid item sm={7.5} xs={8} sx={{ ...gamePurDetTabTxt, fontWeight: { sm: 500, xs: 400 } }}>
                                {' '}
                                {productGameDetail.platform ? productGameDetail.platform : 'N/A'}
                            </Grid>
                        </Grid>
                        <Grid container sx={{ pt: { sm: 1.5, xs: 3.5 } }}>
                            <Grid item sm={4.5} xs={4} sx={{ ...gamePurDetTabTxt }}>
                                {' '}
                                Genres{' '}
                            </Grid>
                            <Grid item sm={7.5} xs={8} sx={{ ...gamePurDetTabTxt, fontWeight: { sm: 500, xs: 400 } }}>
                                {' '}
                                {productGameDetail.genres && productGameDetail.genres.length > 0
                                    ? productGameDetail.genres.map((genre, index) =>
                                          index !== productGameDetail.genres.length - 1 ? genre + ', ' : genre
                                      )
                                    : 'N/A'}
                            </Grid>
                        </Grid>
                        <Grid container sx={{ pt: { sm: 1.5, xs: 3.5 } }}>
                            <Grid item sm={4.5} xs={4} sx={{ ...gamePurDetTabTxt }}>
                                {' '}
                                Description{' '}
                            </Grid>
                            <Grid item sm={7.5} xs={8} sx={{ ...gamePurDetTabTxt, fontWeight: { sm: 500, xs: 400 } }}>
                                {' '}
                                {productGameDetail.description && productGameDetail.description.length > productDescriptionCharacters
                                    ? productGameDetail.description.substring(0, productDescriptionCharacters) + '...'
                                    : productGameDetail.description
                                    ? productGameDetail.description
                                    : '«Призрачная свобода» — это сюжетное дополнение, привносящее элементы шпионского триллера в игру Cyberpunk 2077'}
                            </Grid>
                        </Grid>
                        <Grid container sx={{ pt: { sm: 1.5, xs: 3.5 } }}>
                            <Grid item sm={4.5} xs={4} sx={{ ...gamePurDetTabTxt }}>
                                {' '}
                                Publisher{' '}
                            </Grid>
                            <Grid item sm={7.5} xs={8} sx={{ ...gamePurDetTabTxt, fontWeight: { sm: 500, xs: 400 } }}>
                                {' '}
                                {productGameDetail.publishers && productGameDetail.publishers.length > 0
                                    ? productGameDetail.publishers.map((publisher, index) =>
                                          index !== productGameDetail.publishers.length - 1 ? publisher + ', ' : publisher
                                      )
                                    : 'N/A'}
                            </Grid>
                        </Grid>
                        <Grid container sx={{ pt: { sm: 1.5, xs: 3.5 } }}>
                            <Grid item sm={4.5} xs={4} sx={{ ...gamePurDetTabTxt }}>
                                {' '}
                                Release Date{' '}
                            </Grid>
                            <Grid item sm={7.5} xs={8} sx={{ ...gamePurDetTabTxt, fontWeight: { sm: 500, xs: 400 } }}>
                                {' '}
                                {productGameDetail.releaseDate ? productGameDetail.releaseDate : 'N/A'}
                            </Grid>
                        </Grid>
                        <Grid container sx={{ pt: { sm: 1.5, xs: 3.5 } }}>
                            <Grid item sm={4.5} xs={4} sx={{ ...gamePurDetTabTxt }}>
                                {' '}
                                Language{' '}
                            </Grid>
                            <Grid item sm={7.5} xs={8} sx={{ ...gamePurDetTabTxt, fontWeight: { sm: 500, xs: 400 } }}>
                                {' '}
                                {productGameDetail.languages && productGameDetail.languages.length > 0
                                    ? productGameDetail.languages.map((language, index) =>
                                          index !== productGameDetail.languages.length - 1 ? language + ', ' : language
                                      )
                                    : 'N/A'}
                            </Grid>
                        </Grid>
                        <Grid container sx={{ pt: { sm: 1.5, xs: 3.5 } }}>
                            <Grid item sm={4.5} xs={4} sx={{ ...gamePurDetTabTxt }}>
                                {' '}
                                Audio{' '}
                            </Grid>
                            <Grid item sm={7.5} xs={8} sx={{ ...gamePurDetTabTxt, fontWeight: { sm: 500, xs: 400 } }}>
                                {' '}
                                {productGameDetail.Audio ? productGameDetail.Audio : 'N/A'}
                            </Grid>
                        </Grid>
                    </Grid>
                </CustomTabPanel>
            </Box>
        </Card>
    ) : (
        <Skelton
            style={{
                width: '100%',
                height: { lg: '561px', md: '657px', sm: '633px', xs: '861px' }
            }}
        />
    );
}
