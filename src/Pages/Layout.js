import React, { useState,useEffect } from "react";
import './Layout.css';
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Button, Menu, MenuItem, IconButton } from "@mui/material";
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
import axios from 'axios';
import { useItemHighlighted } from "@mui/x-charts";

function Layout() {
  const { jwt, setJwt, role } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
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

  const handleLogout = () => {
    localStorage.setItem('jwt', '');
    setJwt('');
    console.log(localStorage.getItem('jwt'));
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStatusTrack = () => {
    navigate("/StatusTrack");
    handleClose();
  };

  return (
    <>
      {(role == 'client' || role == '') ?
      <div style={{backgroundColor:'whitesmoke',position:'sticky',top:'0'}}>
       <nav className="main-header" style={{ position: 'sticky', width: '90%', top: '0',left:'0'}}>
         <img src={logo} width='150px' style={{ marginTop: '10px', position: 'sticky', top: '0',left:'0', float: 'left' }}></img>
          <NavLink className="homepage navlink" activeClassName="active" to="/" style={{ fontSize: '20px' }}><HomeIcon /><span>Home</span></NavLink>
          <NavLink className="aboutpage navlink" activeClassName="active" to="/About"><InfoIcon /><span>About Us</span></NavLink>
          <NavLink className="guidepage navlink" activeClassName="active" to="/Cart"><MiscellaneousServicesIcon /><span>Service Booking</span></NavLink>
          <NavLink className="packagepage navlink" activeClassName="active" to="/Package"><InventoryIcon /><span>Packages</span></NavLink>
          <NavLink className="servicepage navlink" activeClassName="active" to="/Service"><AllInboxIcon /><span>Quick Book</span></NavLink>
          <NavLink className="packagepage navlink" activeClassName="active" to="/contact"><CallIcon /><span>Contact</span></NavLink>
          {!!jwt ?
            <div>
            <IconButton
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar sx={{backgroundColor: '#bc0808'}}>
                <AccountCircleRoundedIcon />
                </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleStatusTrack}><TimelineIcon />Status Track</MenuItem>
              <MenuItem onClick={handleLogout}><LogoutIcon />Logout</MenuItem>
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
        </nav>
        </div>
        :
        <div style={{backgroundColor:'whitesmoke',position:'sticky',top:'0'}} >
        <nav className="main-header1" style={{ position: 'sticky', width: '80%', top: '0' }}>
           <img src={logo} width='150px' height='150px' style={{ marginTop: '10px', position: 'sticky', top: '0' }}></img>
          <NavLink className="dashboardpage navlink" activeClassName="active" to="/dashboard"><DashboardIcon /><span>Dashboard</span></NavLink>
          <NavLink className="bookingpage navlink" activeClassName="active" to='/booking'><ContentPasteSearchIcon /><span>Orders Log</span></NavLink>
          <NavLink className="servicespage navlink" activeClassName="active" to='/services'><SettingsIcon /><span>Services</span></NavLink>
          <NavLink className="packagespage navlink" activeClassName="active" to='/packages'><InventoryIcon /><span>Packages</span></NavLink>
          <NavLink className="addbookingpage navlink" activeClassName="active" to='/addbooking'><AddBoxIcon /><span>Book Service</span></NavLink>
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
                marginLeft: 20
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
                  marginLeft: 20
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
