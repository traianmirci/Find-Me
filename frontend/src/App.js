import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Router>
      <div className='App'>
        <Header></Header>
        <main className='py-3'>
          <Container>
            <Switch>
              <Route path='/login' component={LoginPage}></Route>
              <Route path='/register' component={RegisterPage}></Route>
              <Route path='/dashboard' component={DashboardPage} exact></Route>
              <Route path='/:id' component={Profile} exact></Route>
            </Switch>
          </Container>
        </main>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
