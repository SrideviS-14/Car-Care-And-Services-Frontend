import { Outlet,Link} from "react-router-dom";
import './pages.css';
import './Login.js';
import './Signup.js';
import './Layout.css';
import { Button } from "@mui/material";
import { useAuth } from './AuthContext';

function Layout(){

  const { isLoggedIn, setIsLoggedIn } = useAuth();

   const handleLogout = () => {
    setIsLoggedIn(false);
   }

return(
    <>
    <nav className="main-header">
        <Link className="homepage" to="/">Home</Link>
        <Link className="aboutpage" to="/About">About Us</Link>
        <Link className="guidepage"to="/Guides">Guides</Link>
        <Link className="packagepage" to="/Package">Packages</Link>
        <Link className="servicepage"to="/Service">Book A Service</Link>
        {isLoggedIn ? 
                        <Link className="login" to="/">
                        <Button onClick={handleLogout} style={{
                            fontSize: 'medium',
                            backgroundColor: '#000080',
                            width: 100,
                            height: 50,
                            marginRight:1,
                            color: 'white',
                            borderRadius: 10,
                            border: 'none',
                            marginLeft: 20
                          }}>Log out</Button>
                        </Link>
                        :
        <>
                <Link className="signup" to="/signup">
                  <Button style={{
                    fontSize: 'medium',
                    backgroundColor: '#000080',
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
                    backgroundColor: '#000080',
                    width: 100,
                    height: 50,
                    marginRight:1,
                    color: 'white',
                    borderRadius: 10,
                    border: 'none',
                    marginLeft: 20
                  }}>Log in</Button>
                </Link>
        </>

                }
        
    </nav>
    <Outlet />
    </>
)
}
export default Layout;