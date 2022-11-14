import React from 'react'
import {Box, Typography} from '@mui/material'

const NotFound = () => (
    <Box sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    }}>
        <Typography variant="h2" textAlign="center">
            Page Not Found.
        </Typography>
    </Box>
)

export default NotFound
