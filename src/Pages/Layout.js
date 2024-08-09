import React, { useState,useEffect } from "react";
import './Layout.css';
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Button, Menu, MenuItem, IconButton,Typography } from "@mui/material";
import { useAuth } from './AuthContext';
import logo from './images/output-onlinegiftools (2).gif';
import Footer from './Footer.js';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import InventoryIcon from '@mui/icons-material/Inventory';
import CallIcon from '@mui/icons-material/Call';
import TimelineIcon from '@mui/icons-material/Timeline';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Avatar from '@mui/material/Avatar';
import SettingsIcon from '@mui/icons-material/Settings';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import axios from 'axios';
import { useItemHighlighted } from "@mui/x-charts";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
 
function Layout() {
  const { jwt, setJwt, role,setRole } = useAuth();
  const navigate = useNavigate();
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
  const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": 'application/json'
    }, // Change this to your actual backend URL
  });
  const [carddata, setcarddata] = useState();
  useEffect(() => {
    api.get('/account/profile')
      .then((response) => {
        console.log(response.data.User.userName);
        setcarddata(response.data.User.userName);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
 
  const [value, setValue] = React.useState('one');
 
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 
  const handleLogout = () => {
    localStorage.setItem('jwt', '');
    setJwt('');
    setRole(''); // or setRole('client');
    console.log(localStorage.getItem('jwt'));
    navigate("/"); // navigate to home page
    window.location.reload(); // force reload of the page
  };
  const handleStatusTrack = () => {
    navigate("/StatusTrack");
    handleClose();
  };
  const handleHistory = () => {
    navigate("/History");
    handleClose();
  };
  const settings = [
    { title: 'Status Track', icon: <TimelineIcon />, onClick: handleStatusTrack },
    { title: 'My Bookings', icon: <FactCheckIcon />, onClick: handleHistory },
    { title: 'Logout', icon: <LogoutIcon />, onClick: handleLogout },
  ];
  const [anchorEl, setAnchorEl] = useState(null);
 
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
 
  const handleClose = () => {
    setAnchorEl(null);
  };  
 
 
  return (
    <>
      {(role == 'client' || role == '') ?
       <nav className="main-header" style={{  width: '100%', top: '0',left:'0'}}>
       <img src={logo} width='150px' style={{ marginRight: '35px', marginLeft:'25px', top: '0',left:'0', float: 'left' }}></img>
       <div className="navlink-container" style={{backgroundColor:'whitesmoke',top:'0'}}>
          <NavLink className="homepage navlink" activeClassName="active" to="/" style={{ fontSize: '20px' }}><HomeIcon /><span>Home</span></NavLink>
          <NavLink className="aboutpage navlink" activeClassName="active" to="/About"><InfoIcon /><span>About Us</span></NavLink>
          <NavLink className="guidepage navlink" activeClassName="active" to="/Cart" ><MiscellaneousServicesIcon /><span>Service Booking</span></NavLink>
<NavLink className="packagepage navlink" activeClassName="active" to="/Package" ><InventoryIcon /><span>Packages</span></NavLink>
<NavLink className="servicepage navlink" activeClassName="active" to="/Service" ><AllInboxIcon /><span>Quick Book</span></NavLink>
          <NavLink className="packagepage navlink" activeClassName="active" to="/contact"><CallIcon /><span>Contact</span></NavLink>
          {!!jwt ?
            <div>
           <IconButton
  onClick={handleClick}
  color="inherit"
>
  <Avatar sx={{backgroundColor: '#bc0808'}}>
    <AccountCircleRoundedIcon />
  </Avatar>
</IconButton>
<Menu
  id="simple-menu"
  anchorEl={anchorEl}
  keepMounted
  open={Boolean(anchorEl)}
  onClose={handleClose}
>
  {settings.map((option, index) => (
    <MenuItem key={index} onClick={() => {option.onClick(); handleClose();}}>
      {option.icon}
      {option.title}
    </MenuItem>
  ))}
</Menu>    
          </div>    
            :
            <>
              <NavLink className="signup" activeClassName="active" to="/signup">
                <Button style={{
                  fontSize: 'medium',
                  backgroundColor: '#bc0808',
                  width: 104,
                  height: 50,
                  color: 'white',
                  borderRadius: 10,
                  border: 'none'
                }}>Sign Up</Button>
              </NavLink>
              <NavLink className="login" activeClassName="active" to="/login">
                <Button style={{
                  fontSize: 'medium',
                  backgroundColor: '#bc0808',
                  width: 100,
                  height: 50,
                  marginRight: 2,
                  color: 'white',
                  borderRadius: 10,
                  border: 'none',  
                }}>Log in</Button>
              </NavLink>
            </>
          }
          </div>
        </nav>
        :
        <div style={{backgroundColor:'whitesmoke',top:'0'}} >
        <nav className="main-header" style={{  width: '100%', top: '0',left:'0'}}>
        <img src={logo} width='150px' style={{ marginRight: '35px', marginLeft:'25px',position: 'sticky', top: '0',left:'0', float: 'left' }}></img>
          <NavLink className="dashboardpage navlink" activeClassName="active" to="/dashboard"><DashboardIcon /><span>Dashboard</span></NavLink>
          <NavLink className="bookingpage navlink" activeClassName="active" to='/booking'><ContentPasteSearchIcon /><span>Pending Orders</span></NavLink>
          <NavLink className="servicespage navlink" activeClassName="active" to='/services'><SettingsIcon /><span>Services</span></NavLink>
          <NavLink className="packagespage navlink" activeClassName="active" to='/packages'><InventoryIcon /><span>Packages</span></NavLink>
          <NavLink className="addbookingpage navlink" activeClassName="active" to='/addbooking'><AddBoxIcon /><span>Book Service</span></NavLink>
          <NavLink className="addbookingpage navlink" activeClassName="active" to='/queries'><AddBoxIcon /><span>Queries</span></NavLink>
          {!!jwt ?
            <NavLink className="login" activeClassName="active" to="/">
              <Button onClick={handleLogout} style={{
                fontSize: 'medium',
                backgroundColor: '#bc0808',
                width: 120,
                height: 50,
                marginRight: 1,
                color: 'white',
                borderRadius: 10,
                border: 'none',
              }}>Log out</Button>
            </NavLink>
            :
            <>
              <NavLink className="login" activeClassName="active" to="/login">
                <Button style={{
                  fontSize: 'medium',
                  backgroundColor: '#bc0808',
                  width: 120,
                  height: 50,
                  marginRight: 1,
                  color: 'white',
                  borderRadius: 10,
                  border: 'none',
                }}> Log in</Button>
              </NavLink>
            </>
          }
        </nav>
        </div>
      }
      <Outlet />
      <Footer />
    </>
  );
}
 
export default Layout;