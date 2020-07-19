import React from 'react';
import { HashRouter } from 'react-router-dom';
import './App.css';

import { ToastContainer } from 'react-toastify';

import Logo from '../Components/Logo/Logo';
import Nav from '../Components/Nav/Nav';
import Routes from './routes';
import Footer from '../Components/Footer/Footer';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Logo />
        <Nav />
        <Routes />
        <Footer />
        <ToastContainer autoClose={3000} />
      </div>
    </HashRouter>
  );
}

export default App;
