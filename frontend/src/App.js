import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className='App'>
      <Header></Header>
      <Container>
        <h1>Welcome to Fiind.me</h1>
      </Container>
      <Footer></Footer>
    </div>
  );
}

export default App;
