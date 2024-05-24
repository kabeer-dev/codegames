import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { boxStyle, charTitle } from '../../../../../ui-component/landing/constants/style';
import { Card, Grid } from '@mui/material';
import Replenishment from '../../../../../ui-component/landing/Components/Replenishment';
import FAQS from '../../../../../ui-component/landing/Components/Faqs';
import { steamInsrtTab } from '../../../../../ui-component/landing/constants/SteamSx';
function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{ py: { sm: 3, xs: 2 } }}>
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
export default function InstructionTabs() {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Card sx={{ ...boxStyle }}>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab
                            sx={{
                                ...steamInsrtTab
                            }}
                            label="Instructions"
                            {...a11yProps(0)}
                        />
                        <Tab
                            sx={{
                                ...steamInsrtTab
                            }}
                            label="FAQ"
                            {...a11yProps(1)}
                        />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <Grid sx={{ pt: { sm: 2, xs: 2 }, pb: 1 }}>
                        <Replenishment title="Replenishment instructions" />
                    </Grid>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <Grid>
                        <Typography sx={{ ...charTitle, pb: { sm: 4, xs: 2 } }}>FAQ on STEAM</Typography>
                        <FAQS />
                    </Grid>
                </CustomTabPanel>
            </Box>
        </Card>
    );
}
