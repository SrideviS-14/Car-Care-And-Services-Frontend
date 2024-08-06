import React from 'react';
import { BrowserRouter,Route,Routes} from 'react-router-dom';
import Layout from './Pages/Layout.js';
import Home from './Pages/Home.js'
import About from './Pages/About.js'
import Cart from './Pages/Cart.js'
import Service from './Pages/Service.js'
import Login from './Pages/Login.js';
import SignUp from './Pages/Signup.js';
import Package from './Pages/Package.js';
import Invoice from './Pages/Invoice.js';
import Payment from  './Pages/Payment.js';
import CarDetails from './Pages/CarDetails.js'
import Dashboard from './AdminPages/Dashboard.js';
import ConfirmBooking from './Pages/ConfirmBooking.js';
import Services from './AdminPages/Services.js';
import Booking from './AdminPages/Booking.js';
import Packages from './AdminPages/Packages.js';
import StatusTrack from './Pages/StatusTrack.js';
import AddBooking from './AdminPages/AddBooking.js';
import Contact from './Pages/Contact.js';
import Queries from './AdminPages/Queries.js'
import History from './Pages/HistoryBooking.js'

function App() {
  return (
    <div className="App" >
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
        <Route path='invoice' element={<Invoice />}></Route>
        <Route path='payment' element={<Payment />}></Route>
        <Route path='cardetails' element={<CarDetails />}></Route>
        <Route path='confirmbooking' element={<ConfirmBooking />}></Route>
        <Route path='booking' element={<Booking/>}></Route>
        <Route path='services' element={<Services />}></Route>
        <Route path='packages' element={<Packages />}></Route>
        <Route path='dashboard' element={<Dashboard />}></Route>
        <Route path='statustrack' element={<StatusTrack />}></Route>
        <Route path='addbooking' element={<AddBooking />}></Route>
        <Route path='contact' element={<Contact />}></Route>
        <Route path='queries' element={<Queries />}></Route>
        <Route path='history' element={<History />}></Route>
        </Route>
      </Routes>
      </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
