import React from 'react'
import Container from '@mui/material/Container'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import HomeIcon from '@mui/icons-material/Home'
import {Outlet, useLocation, Link as RouterLink} from 'react-router-dom'

function App() {
    const location = useLocation()
    return (
        <Container maxWidth="lg">
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            component={RouterLink}
                            to={'/'}
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <HomeIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Crud App
                        </Typography>
                        {location.pathname === '/' ? (
                            <Button
                                component={RouterLink}
                                to={'/new'}
                                color="inherit"
                            >
                                Create
                            </Button>
                        ) : null}
                    </Toolbar>
                </AppBar>
            </Box>
            <Outlet />
        </Container>
    )
}

export default App
