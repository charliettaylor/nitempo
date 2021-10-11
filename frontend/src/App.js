import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createTheme from '@material-ui/core/styles/createTheme'; //this might have to be createMuiTheme at the end instead of createTheme

//Components import
import Navbar from './components/Navbar';

//pages
import home from './views/home'
import login from './views/login'
import signup from './views/signup'

const theme = createTheme({
  palette: {
    primary: {
      light: "#FAFAFB",
      main: "#669EA3",
      dark: "#3D4363",
      contrastText: "#fff"
    }
  },
  typography: {
    useNextVariants: true
  }
})

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navbar/>
          <div className='container'>
            <Switch>
              <Route exact path="/" component={home}/>
              <Route exact path="/login" component={login}/>
              <Route exact path="/signup" component={signup}/>
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider> 
  );
}

export default App;
