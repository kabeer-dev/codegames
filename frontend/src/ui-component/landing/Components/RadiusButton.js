import { Button } from '@mui/material';
import React from 'react'

const RadiusButton = ({name, onClick}) => {
  return (
    <Button 
        onClick={onClick}
        sx={{
            mt: 1,
            backgroundColor: "#00EE34",
            color: '#000000',
            fontSize: { sm: '14px', xs: '11px' },
            fontWeight: 600,
            borderRadius: '55px',
            // py: 1,
            px: {md: 3, sm: 0},
            '&:hover': {
                backgroundColor: '#00EE34',
            },
        }}
    >
        {name}
    </Button>
  )
}

export default RadiusButton