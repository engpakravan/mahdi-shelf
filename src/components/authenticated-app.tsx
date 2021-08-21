import React from 'react';
import styles from "./app.module.scss"
import {Button, FullPageErrorFallback} from "./index"
import {useAuth} from "../context/auth";
import {Switch, useRouteMatch, Route, Link, Redirect} from "react-router-dom"
import {ErrorBoundary} from "react-error-boundary";
import {createBrowserHistory} from "history"
import {ROUTE_DISCOVERY, ROUTE_FINISHED, ROUTE_LIST} from "../constants/routes";

type Props = {

};

const NavLink : React.FC<{to:string}> = (props) => {
    const match = useRouteMatch(props.to)
    return (
        <Link
            style={{
                borderLeft : match ? "5px solid #3f51b5" : "none"
            }}
            {...props}
        />
    )
}
const Sidebar : React.FC = () => {
    return (
        <div className={`${styles.Sidebar} col-4`}>
            <ul>
                <li>
                    <NavLink to={ROUTE_LIST}>Reading List</NavLink>
                </li>
                <li>
                    <NavLink to={ROUTE_FINISHED}>Finished Books</NavLink>
                </li>
                <li>
                    <NavLink to={ROUTE_DISCOVERY}>Discovery</NavLink>
                </li>
            </ul>
        </div>
    )
}

const ContentBar : React.FC = () => {
    return (
        <div className="col-8">
            <AppRoutes/>
        </div>
    )
}

const AuthenticatedApp : React.FC = () => {

    const {user , logout} = useAuth()

    return (
        <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
            <header className={styles.header}>
                <span> {user.displayName} </span>
                <Button variant={"secondary"} onClick={() => logout()}>Logout</Button>
            </header>
            <div className={styles.Authenticated_App}>
                <div className="container row">
                    <Sidebar/>
                    <ContentBar/>
                </div>
            </div>
        </ErrorBoundary>
    )
}


function AppRoutes() {
    return (
        <Switch>
            <Route exact path={"/"}>
                <Redirect to={ROUTE_LIST}/>
            </Route>
            <Route path={ROUTE_LIST} exact>
                <div>List</div>
            </Route>
            <Route path={ROUTE_FINISHED} exact>
                <div>Finished</div>
            </Route>
            <Route path={ROUTE_DISCOVERY} exact>
                <div>Discovery</div>
            </Route>
            <Route path={"*"}>
                <div>404</div>
            </Route>
        </Switch>
    )
}

export default AuthenticatedApp;
