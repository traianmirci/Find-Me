import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import Profile from './pages/Profile';

function App() {
  return (
    <div className='App'>
      <Header></Header>
      <main className='py-3'>
        <Container>
          <Profile></Profile>
        </Container>
      </main>

      <Footer></Footer>
    </div>
  );
}

export default App;
