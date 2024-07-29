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
     <NavLink className="homepage" activeClassName="active" to="/"style={{fontSize:'20px'}}><HomeIcon />Home</NavLink>
     <NavLink className="aboutpage" activeClassName="active" to="/About" style={{fontSize:'20px'}}><InfoIcon />About Us</NavLink>
     <NavLink className="guidepage" activeClassName="active" to="/Cart" style={{fontSize:'20px'}}><MiscellaneousServicesIcon />Services</NavLink>
     <NavLink className="packagepage" activeClassName="active" to="/Package"style={{fontSize:'20px'}}><InventoryIcon />Packages</NavLink>
     <NavLink className="servicepage" activeClassName="active" to="/Service"style={{fontSize:'20px'}}><AllInboxIcon />Quick Book</NavLink>
     <NavLink className="statuspage" activeClassName="active" to="/StatusTrack"style={{fontSize:'20px'}}><TimelineIcon />StatusTrack</NavLink>
     <NavLink className="packagepage" activeClassName="active" to="/contact"style={{fontSize:'20px'}}><CallIcon />Contact</NavLink>
     {!!jwt ?
                     <NavLink className="login" activeClassName="active" to="/">
                     <Button onClick={handleLogout} style={{
                         fontSize: 'medium',
                         backgroundColor: '#008b8b',
                         width: 150,
                         height: 50,
                         marginRight:1,
                         color: 'white',
                         borderRadius: 10,
                         border: 'none',
                         marginLeft: 20
                       }}><LogoutIcon />Log out</Button>
                     </NavLink>
                     :
     <>
             <NavLink className="signup" activeClassName="active" to="/signup">
               <Button style={{
                 fontSize: 'medium',
                 backgroundColor: '#008b8b',
                 width: 104,
                 marginLeft:85,
                 height: 50,
                 color: 'white',
                 borderRadius: 10,
                 border: 'none'
               }}><FormatAlignJustifyIcon />Sign Up</Button>
             </NavLink>
             <NavLink className="login" activeClassName="active" to="/login">
             <Button style={{
                 fontSize: 'medium',
                 backgroundColor: '#008b8b',
                 width: 100,
                 height: 50,
                 marginRight:1,
                 color: 'white',
                 borderRadius: 10,
                 border: 'none',
                 marginLeft: 20
               }}><LoginIcon/>Log in</Button>
             </NavLink>
     </>
 
             }
   
 </nav>
 :
 <nav className="main-header">
 <NavLink className="dashboardpage" activeClassName="active" to="/dashboard" style={{fontSize:'20px'}}><DashboardIcon />Dashboard</NavLink>
 <NavLink className="bookingpage" activeClassName="active" to='/booking' style={{fontSize:'20px'}}><ContentPasteSearchIcon />Booking</NavLink>
 <NavLink className="servicespage" activeClassName="active" to='/services' style={{fontSize:'20px'}}><SettingsIcon />Services</NavLink>
 <NavLink className="packagespage" activeClassName="active" to='/packages' style={{fontSize:'20px'}}><InventoryIcon />Packages</NavLink>
 <NavLink className="addbookingpage" activeClassName="active" to='/addbooking'style={{fontSize:'20px'}}><AddBoxIcon />Add Booking</NavLink>
 {!!jwt ?
                 <NavLink className="login" activeClassName="active" to="/">
                 <Button onClick={handleLogout} style={{
                     fontSize: 'medium',
                     backgroundColor: '#008b8b',
                     width: 150,
                     height: 50,
                     marginRight:1,
                     color: 'white',
                     borderRadius: 10,
                     border: 'none',
                     marginLeft: 20
                   }}><LogoutIcon />Log out</Button>
                 </NavLink>
                 :
 <>
         <NavLink className="login" activeClassName="active" to="/login">
         <Button style={{
             fontSize: 'medium',
             backgroundColor: '#008b8b',
             width: 100,
             height: 50,
             marginRight:1,
             color: 'white',
             borderRadius: 10,
             border: 'none',
             marginLeft: 20
           }}><LoginIcon/> Log in</Button>
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
 