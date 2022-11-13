import React, {ReactElement, Suspense, PropsWithChildren} from 'react'
import {Box, CircularProgress} from '@mui/material'

type RouteSuspenseProps = PropsWithChildren & {
    loading?: ReactElement;
}

const RouteSuspense = ({loading, children}: RouteSuspenseProps) => (
    <Suspense fallback={loading ? loading  : (
        <Box width={'100%'} height={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <CircularProgress size={108} thickness={3.6} />
        </Box>
    )}>
        {children}
    </Suspense>
)

export default RouteSuspense
