import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Grid, Typography } from '@mui/material';
import { Faqs } from '../Data/Data';
import { faqWrap, faqTitle, faqDesc } from '../constants/style';

export default function FAQS({ padd }) {
    return (
        <Grid>
            {Faqs.map((data, index) => (
                <Accordion
                    defaultExpanded={index === 0 ? true : false}
                    sx={{
                        ...faqWrap,
                        p: padd,
                        '::before': {
                            background: 'none'
                        }
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: '#FFFF' }} />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{
                            ...faqTitle
                        }}
                    >
                        {data.title}
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography
                            sx={{
                                ...faqDesc
                            }}
                        >
                            {data.desc}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Grid>
    );
}
