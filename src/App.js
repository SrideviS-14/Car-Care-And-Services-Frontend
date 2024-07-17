import React from 'react';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Layout from './Pages/Layout.js';
import Home from './Pages/Home.js'
import About from './Pages/About.js'
import Cart from './Pages/Cart.js'
import Service from './Pages/Service.js'
import Login from './Pages/Login.js';
import SignUp from './Pages/Signup.js';
import Package from './Pages/Package.js';
import ConfirmBooking from './Pages/ConfirmBooking.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
        <Route index element={<Home />}></Route>
        <Route path='about' element={<About />}></Route>
        <Route path='cart' element={<Cart />}></Route>
        <Route path='package' element={<Package />}></Route>
        <Route path='service' element={<Service />}></Route>
        <Route path='login' element={<Login />}></Route>
        <Route path='signup' element={<SignUp />}></Route>
        <Route path='confirmBooking' element={<ConfirmBooking />}></Route>
        </Route>
      </Routes>
      </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
