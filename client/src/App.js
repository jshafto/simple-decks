import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux'

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles'

import Browse from './components/Browse';
import NavBar from './components/NavBar';
import HomePlex from './components/HomePlex';
import AuthForm from './components/AuthForm';
import Footer from './components/Footer';
import DeckViewEdit from './components/DeckViewEdit'
import { lightThemeObj, darkThemeObj, themeObj } from './theme'
import PracticeMode from './components/PracticeMode';
import QuizMode from './components/QuizMode'
import SearchBrowser from './components/SearchBrowser'
import Cookies from 'js-cookie';

import { createMuiTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    site: {
        minHeight: 'calc(100vh - 75px)',
    },
}));

function App() {
    const classes = useStyles();
    const darkMode = useSelector(state => state.ui.darkTheme)
    const themeType = Cookies.get('paletteType');

    const [theme, setTheme] = useState(createMuiTheme(themeObj[themeType]));

    useEffect(() => {
        const newTheme = (darkMode) ? createMuiTheme(darkThemeObj) : createMuiTheme(lightThemeObj)
        setTheme(newTheme);
    }, [darkMode])




    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
            <div className={classes.site}>
                <NavBar />
                <Switch>
                    <Route exact path={["/signin", "/signup"]}>
                        <AuthForm />
                    </Route>
                    <Route exact path="/browse">
                        <Browse />
                    </Route>
                    <Route exact path="/categories/:categoryId">
                        <Browse />
                    </Route>
                    <Route path="/search">
                        <SearchBrowser />
                    </Route>
                    <Route path="/decks/:deckId">
                        <DeckViewEdit />
                    </Route>
                    <Route path="/practice/:deckId">
                        <PracticeMode />
                    </Route>
                    <Route path="/quiz/:deckId">
                        <QuizMode />
                    </Route>
                    <Route exact path="/">
                        <HomePlex />
                    </Route>
                </Switch>
                </div>
            <Footer />
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
