import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <div className='App'>
        <Header></Header>
        <main className='py-3'>
          <Container>
            <Route path='/:id' component={Profile} exact></Route>
          </Container>
        </main>

        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
