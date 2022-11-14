import React from 'react'
import {Box, CircularProgress, CircularProgressProps} from '@mui/material'

const Loader = ({size = 108, thickness = 3.6, ...restOfProps}: CircularProgressProps) => (
    <Box sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    }}>
        <CircularProgress
            size={size}
            thickness={thickness}
            {...restOfProps} />
    </Box>
)

export default Loader
