import {
  Box,
  createMuiTheme,
  CssBaseline,
  ThemeProvider,
  makeStyles,
} from '@material-ui/core';
import { AppProps } from 'next/app';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from 'src/store';
import { theme } from 'src/theme';

const useStyles = makeStyles((theme) => ({
  main: {
    width: '100vw',
    height: '100vh',
    backgroundColor: theme.palette.primary.dark,
  },
}));

function MyApp({ Component, pageProps }: AppProps) {
  const classes = useStyles();
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={classes.main}>
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
