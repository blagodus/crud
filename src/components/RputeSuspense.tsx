import React, {ReactElement, Suspense, PropsWithChildren} from 'react'

type RouteSuspenseProps = PropsWithChildren & {
    loading?: ReactElement;
}

const RouteSuspense = ({loading, children}: RouteSuspenseProps) => (
    <Suspense fallback={loading ? loading  : (<div>Loading...</div>)}>
        {children}
    </Suspense>
)

export default RouteSuspense
