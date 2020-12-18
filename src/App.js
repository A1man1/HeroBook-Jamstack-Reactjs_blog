import React, { Fragment, Suspense, lazy } from "react";
import GlobalStyles from './GlobalStyles';
import theme from './theme';
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Pace from "./shared/components/Pace";
import * as serviceWorker from "./serviceWorker";

function App() {

  const Main = lazy(() => import("./Main"));

  return (
    <BrowserRouter>
     <MuiThemeProvider theme={theme}>
     <CssBaseline />
     <GlobalStyles />
      <Pace color={theme.palette.primary.light} >
       <Suspense fallback={<Fragment />}>
        <Switch>
            <Route>
              <Main />
            </Route>
          </Switch>
        </Suspense>
      </Pace>
     </MuiThemeProvider>
    </BrowserRouter>
  );
}
serviceWorker.register();

export default App;
