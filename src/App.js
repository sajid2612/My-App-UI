import React, { Component } from 'react';
import SignUp from './Views/SignUp';
import SignIn from './Views/SignIn';
import Home from './Views/Home';
import AccountSettings from './Views/AccountSettings';
import SecuritySetting from './Views/SecuritySetting';
import UserData from './Views/UserData';
import ForgotPassword from './Views/ForgotPassword';
import PasswordRecovery from './Views/PasswordRecovery';

import {BrowserRouter, Route} from 'react-router-dom';
const email = 'Welcome to React';
class App extends Component {


  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path='/' render={() => (
            <div className="App">
              <Home />
            </div>
          )}/>
          <Route exact={true} path='/signin' render={() => (
            <div className="App">
              <SignIn />
            </div>
          )}/>
        <Route exact={true} path='/userdata'  render={() => (
            <div className="App">
              <UserData userEmail = {email}/>
            </div>
          )}/>
          <Route exact={true} path='/signup' render={() => (
            <div className="Content">
              <SignUp />
            </div>
          )}/>
        <Route exact={true} path='/accountsettings' render={() => (
              <div className="App">
                <AccountSettings />
              </div>
            )}/>
          <Route exact={true} path='/security' render={() => (
            <div className="App">
              <SecuritySetting />
            </div>
          )}/>
        <Route exact={true} path='/forgotpassword' render={() => (
              <div className="App">
                <ForgotPassword />
              </div>
          )}/>
        <Route exact={true} path='/recoverpassword' render={() => (
              <div className="App">
                <PasswordRecovery />
              </div>
          )}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
