import React from 'react';
import {FullPageSpinner} from "./components"
import {useAuth} from "./context/auth";

const UnAuthenticatedApp = React.lazy(() => import("./components/unauthenticated-app"))
const AuthenticatedApp = React.lazy(() => import("./components/authenticated-app"))

function App() {

    const auth = useAuth();

    return (
        <React.Suspense fallback={<FullPageSpinner/>}>
            {auth.user ? <AuthenticatedApp/> : <UnAuthenticatedApp/>}
        </React.Suspense>
    )
}

export default App;
