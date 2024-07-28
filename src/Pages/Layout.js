
import { Outlet,NavLink} from "react-router-dom";
import './Login.js';
import './Signup.js';
import './Layout.css';
import { Button } from "@mui/material";
import { useAuth } from './AuthContext';
import logo from './images/WheelsUp-2--unscreen.gif';
import Footer from './Footer.js'; 
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
     <NavLink className="homepage" activeClassName="active" to="/">Home</NavLink>
     <NavLink className="aboutpage" activeClassName="active" to="/About">About Us</NavLink>
     <NavLink className="guidepage" activeClassName="active" to="/Cart">Services</NavLink>
     <NavLink className="packagepage" activeClassName="active" to="/Package">Packages</NavLink>
     <NavLink className="servicepage" activeClassName="active" to="/Service">Quick Book</NavLink>
     <NavLink className="statuspage" activeClassName="active" to="/StatusTrack">StatusTrack</NavLink>
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
                         marginLeft: 20
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
 <NavLink className="aboutpage" activeClassName="active" to="/dashboard">Dashboard</NavLink>
 <NavLink className="bookingpage" activeClassName="active" to='/booking'>Booking</NavLink>
 <NavLink className="servicepage" activeClassName="active" to='/services'>Services</NavLink>
 <NavLink className="packagepage" activeClassName="active" to='/packages'>Packages</NavLink>
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
                     marginLeft: 20
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
             marginLeft: 20
           }}>Log in</Button>
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
