import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import UserList from './components/UsersList';
// import LoginForm from './components/LoginForm';
// import LogoutButton from './components/LogoutButton'
import NavBar from './components/NavBar'
// import SplashPage from './components/SplashPage';
import HomePlex from './components/HomePlex';
import AuthForm from './components/AuthForm'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import Browse from './components/Browse'



function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                simple decks
        </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function App() {

    return (
        <>
            <CssBaseline />
            <BrowserRouter>
                <NavBar />
                <Switch>
                    <Route exact path={["/signin", "/signup"]}>
                        <AuthForm />
                    </Route>
                    <Route exact path="/browse">
                        <Browse/>
                    </Route>
                    <Route exact path="/">
                        <HomePlex />
                    </Route>
                </Switch>
            </BrowserRouter>
            <Box mt={8}>
                <Copyright />
            </Box>
        </>
    );
}

export default App;
