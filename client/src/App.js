import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles'

import Browse from './components/Browse';
import NavBar from './components/NavBar';
import HomePlex from './components/HomePlex';
import AuthForm from './components/AuthForm';
import Footer from './components/Footer';
import DeckViewEdit from './components/DeckViewEdit'
import theme from './theme'
import PracticeMode from './components/PracticeMode'



function App() {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <NavBar />
                <Switch>
                    <Route exact path={["/signin", "/signup"]}>
                        <AuthForm />
                    </Route>
                    <Route exact path="/browse">
                        <Browse />
                    </Route>
                    <Route path="/decks/:deckId">
                        <DeckViewEdit />
                    </Route>
                    <Route path="/practice/:deckId">
                        <PracticeMode />
                    </Route>
                    <Route exact path="/">
                        <HomePlex />
                    </Route>
                </Switch>
            </BrowserRouter>
            <Footer />
        </ThemeProvider>
    );
}

export default App;
