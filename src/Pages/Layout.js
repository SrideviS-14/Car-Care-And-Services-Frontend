
import { Outlet,Link} from "react-router-dom";
import './Login.js';
import './Signup.js';
import './Layout.css';
import { Button } from "@mui/material";
import { useAuth } from './AuthContext';
import video from './images/WheelsUp.mp4';
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
     <video src={video} autoPlay loop muted style={{ width: '200px', height: '200px',fontFamily:'Times New Roman, Times, serif' }}></video>
     {(role=='client' || role=='') ?
     <nav className="main-header">
        <Link className="homepage" to="/">Home</Link>
        <Link className="aboutpage" to="/About">About Us</Link>
        <Link className="guidepage"to="/Cart">Cart</Link>
        <Link className="packagepage" to="/Package">Packages</Link>
        <Link className="servicepage"to="/Service">Quick Book</Link>
        {!!jwt ?
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
    :
    <nav className="main-header">
    <Link className="homepage" index to="/adminhome">Admin Home</Link>
    <Link className="aboutpage" to="/dashboard">Dashboard</Link>
    <Link className="bookingpage" to='/booking'>Booking</Link>
    <Link className="servicepage" to='/services'>Services</Link>
    <Link className="packagepage" to='/packages'>Packages</Link>
    {!!jwt ?
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
}
    <Outlet />
    <Footer />
    </>
)
}
export default Layout;
 