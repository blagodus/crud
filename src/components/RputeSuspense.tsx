import React, {ReactElement, Suspense, PropsWithChildren} from 'react'
import Loader from './Loader'

type RouteSuspenseProps = PropsWithChildren & {
    loading?: ReactElement;
}

const RouteSuspense = ({loading, children}: RouteSuspenseProps) => (
    <Suspense fallback={loading ? loading  : <Loader />}>
        {children}
    </Suspense>
)

export default RouteSuspense
