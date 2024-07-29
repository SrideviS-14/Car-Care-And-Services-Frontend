
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


function Layout() {
  const { jwt, setJwt , role} = useAuth();

  const handleLogout = () => {
   localStorage.setItem('jwt', '');
   setJwt('');
   console.log(localStorage.getItem('jwt'));
  }
 
return(
    <>
     <img src={logo}width='150px'height='150px'style={{marginTop:'10px',marginLeft:'15px'}}></img>
     <div className="navbar-container">
     {(role=='client' || role=='') ?
     <nav className="main-header">
     <NavLink className="homepage" activeClassName="active" to="/"><HomeIcon />Home</NavLink>
     <NavLink className="aboutpage" activeClassName="active" to="/About"><InfoIcon />About Us</NavLink>
     <NavLink className="guidepage" activeClassName="active" to="/Cart"><MiscellaneousServicesIcon />Services</NavLink>
     <NavLink className="packagepage" activeClassName="active" to="/Package"><InventoryIcon />Packages</NavLink>
     <NavLink className="servicepage" activeClassName="active" to="/Service">Quick Book</NavLink>
     <NavLink className="statuspage" activeClassName="active" to="/StatusTrack">StatusTrack</NavLink>
     <NavLink className="packagepage" activeClassName="active" to="/contact">Contact</NavLink>
     {!!jwt ?
                     <NavLink className="login" activeClassName="active" to="/">
                     <Button onClick={handleLogout} style={{
                         fontSize: 'medium',
                         backgroundColor: '#008b8b',
                         width: 100,
                         height: 50,
                         marginRight:1,
                         color: 'white',
                         borderRadius: 10,
                         border: 'none',
                         marginLeft: 180
                       }}>Log out</Button>
                     </NavLink>
                     :
     <>
             <NavLink className="signup" activeClassName="active" to="/signup">
               <Button style={{
                 fontSize: 'medium',
                 backgroundColor: '#008b8b',
                 width: 100,
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
                 backgroundColor: '#008b8b',
                 width: 100,
                 height: 50,
                 marginRight:1,
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
 <nav className="main-header">
 <NavLink className="dashboardpage" activeClassName="active" to="/dashboard">Dashboard</NavLink>
 <NavLink className="bookingpage" activeClassName="active" to='/booking'>Booking</NavLink>
 <NavLink className="servicespage" activeClassName="active" to='/services'>Services</NavLink>
 <NavLink className="packagespage" activeClassName="active" to='/packages'>Packages</NavLink>
 <NavLink className="addbookingpage" activeClassName="active" to='/addbooking'>Add Booking</NavLink>
 {!!jwt ?
                 <NavLink className="login" activeClassName="active" to="/">
                 <Button onClick={handleLogout} style={{
                     fontSize: 'medium',
                     backgroundColor: '#008b8b',
                     width: 100,
                     height: 50,
                     marginRight:1,
                     color: 'white',
                     borderRadius: 10,
                     border: 'none',
                     marginLeft: 350
                   }}>Log out</Button>
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
             marginLeft: 350
           }}>Log in</Button>
         </NavLink>
 </>

         }

</nav>
}
</div>
 <Outlet />
 <Footer />
 </>
)
}
export default Layout; 
