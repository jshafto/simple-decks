import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';

import Browse from './components/Browse';
import NavBar from './components/NavBar';
import HomePlex from './components/HomePlex';
import AuthForm from './components/AuthForm';


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
