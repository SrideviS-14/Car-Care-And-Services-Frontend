import { Outlet,Link} from "react-router-dom";
import './pages.css';
import './Login.js';
import './Signup.js';
import './Layout.css';
import { Button } from "@mui/material";

function Layout(){
   
return(
    <>
    <nav className="main-header">
        <Link className="homepage" to="/">Home</Link>
        <Link className="aboutpage" to="/About">About Us</Link>
        <Link className="guidepage"to="/Guides">Guides</Link>
        <Link className="packagepage" to="/Package">Packages</Link>
        <Link className="servicepage"to="/Service">Book A Service</Link>
        <Link className="signup" to="/signup">
          <Button style={{
            fontSize: 'medium',
            backgroundColor: '#126cfc',
            width: 100,
            marginLeft:85,
            height: 50,
            color: 'white',
            borderRadius: 10,
            border: 'none'
          }}>Sign Up</Button>
        </Link>
        <Link className="login" to="/login">
        <Button style={{
            fontSize: 'medium',
            backgroundColor: '#126cfc',
            width: 100,
            height: 50,
            marginRight:1,
            color: 'white',
            borderRadius: 10,
            border: 'none',
            marginLeft: 20
          }}>Log in</Button>
        </Link>
        
    </nav>
    <Outlet />
    </>
)
}
export default Layout;