import { Outlet,NavLink} from "react-router-dom";
import './Login.js';
import './Signup.js';
import './Layout.css';
import { Button } from "@mui/material";
import { useAuth } from './AuthContext';
import logo from './images/WheelsUp-2--unscreen.gif';
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

function Layout(){
 
  const { jwt, setJwt , role} = useAuth();
 
  const handleLogout = () => {
   localStorage.setItem('jwt', '');
   setJwt('');
   console.log(localStorage.getItem('jwt'));
  }
  
return(
    <>
     <img src={logo}width='150px'height='150px'style={{marginTop:'10px',marginLeft:'15px'}}></img>
     {(role=='client' || role=='') ?
     <nav className="main-header">
          <NavLink className="homepage navlink" activeClassName="active" to="/" style={{fontSize:'20px'}}><HomeIcon /><span>Home</span></NavLink>
          <NavLink className="aboutpage navlink" activeClassName="active" to="/About"><InfoIcon /><span>About Us</span></NavLink>
          <NavLink className="guidepage navlink" activeClassName="active" to="/Cart"><MiscellaneousServicesIcon /><span>Services</span></NavLink>
          <NavLink className="packagepage navlink" activeClassName="active" to="/Package"><InventoryIcon /><span>Packages</span></NavLink>
          <NavLink className="servicepage navlink" activeClassName="active" to="/Service"><AllInboxIcon /><span>Quick Book</span></NavLink>
          <NavLink className="statuspage navlink" activeClassName="active" to="/StatusTrack"><TimelineIcon /><span>StatusTrack</span></NavLink>
          <NavLink className="packagepage navlink" activeClassName="active" to="/contact"><CallIcon /><span>Contact</span></NavLink>
     {!!jwt ?
                    <>
                     <NavLink className="login" activeClassName="active" to="/">
                     <Button onClick={handleLogout} style={{
                        marginRight: '8px', 
                         fontSize: 'medium',
                         backgroundColor: '#bc0808',
                         width: 104,
                         height: 50,
                         marginRight:1,
                         color: 'white',
                         borderRadius: 10,
                         border: 'none',
                         marginLeft: 20
                       }}>Log out</Button>
                     </NavLink>
                    <Avatar>
                    <AccountCircleRoundedIcon />
                  </Avatar>
                  </>
                    :
     <>
             <NavLink className="signup" activeClassName="active" to="/signup">
               <Button style={{
                 fontSize: 'medium',
                 backgroundColor: '#bc0808',
                 width: 104,
                 marginLeft:85,
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
                 marginRight:2,
                 color: 'white',
                 borderRadius: 10,
                 border: 'none',
                 marginLeft: 20
               }}>Log in</Button>
             </NavLink>
     </>
 
             }
   
 </nav>
 :
 <nav className="main-header1">
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
                     width: 150,
                     height: 50,
                     marginRight:1,
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
             width: 100,
             height: 50,
             marginRight:1,
             color: 'white',
             borderRadius: 10,
             border: 'none',
             marginLeft: 20
           }}> Log in</Button>
         </NavLink>
 </>
 
         }
 
</nav>
}
 <Outlet />
 <Footer />
 </>
)
}
export default Layout;
 