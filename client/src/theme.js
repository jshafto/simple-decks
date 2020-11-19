export const lightThemeObj = {
  palette: {
    primary: {
      main: "#6C969D",
    },
    nav: "#6C969D",
    navIcon: "rgba(255, 255, 255, 0.87)",
    secondary: {
      main: "#C65B7C",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
    },
    type: 'light'
  },
  typography: {

    fontFamily: `"Lato", "Helvetica", sans-serif `
},
};

export const darkThemeObj = {
  palette: {
    primary: {
      main: "#A9C1C6",
    },
    nav: "#424242",
    navIcon: "rgba(255, 255, 255, 0.7)",
    secondary: {
      main: "#DFA4B7",
    },
    text: {
      primary: "#fff"
    },
    type: 'dark'
  },
  typography: {
    fontFamily: `"Lato", "Helvetica", sans-serif `
},
};


export const themeObj = {
  light: lightThemeObj,
  dark: darkThemeObj
}
