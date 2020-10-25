import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { Container } from 'semantic-ui-react';

import MenuBar from './components/MenuBar';
import RouteValue from './consts/route';
import { AuthProvider } from './context/auth';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SinglePost from './pages/SinglePost';
import AuthRoute from './util/AuthRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path={RouteValue.HOME} component={Home} />
          <AuthRoute exact path={RouteValue.LOGIN} component={Login} />
          <AuthRoute exact path={RouteValue.REGISTER} component={Register} />
          <Route exact path={RouteValue.POST} component={SinglePost} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
