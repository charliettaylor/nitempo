import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createTheme from '@material-ui/core/styles/createTheme'; //this might have to be createMuiTheme at the end instead of createTheme
import jwtDecode from 'jwt-decode';

//Components import
import Navbar from './components/Navbar';
import AuthRoute from './components/AuthRoute';

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
  },
  form: {
    textAlign: 'center'
  },
  Logo: {
      margin: '20px auto 20px auto',
      height: 100
  },
  pageTitle: {
      margin: '10px auto 10px auto'
  },
  textField: {
      backgroundColor: "#3D4363",
      margin: '20px auto 20px auto',
  },
  button: {
      margin: '20px 20px 20px 20px',
      position: 'relative'
  },
  customError: {
      color: 'red',
      fontSize: '0.8rem',
      marginTop: 10
  },
  progress: {
      position: 'absolute'
  }
})

let authenticated;
const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  if (decodedToken.exp * 1000 < Date.now()){
    window.location.href = '/login'
    authenticated = false;
  } else {
    authenticated = true;
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navbar/>
          <div className='container'>
            <Switch>
              <Route exact path="/" component={home}/>
              <AuthRoute exact path="/auth/login" component={login} authenticated={authenticated}/>
              <AuthRoute exact path="/signup" component={signup} authenticated={authenticated}/>
              <Route path="/auth/getUserById/:id">
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider> 
  );
}

export default App;
