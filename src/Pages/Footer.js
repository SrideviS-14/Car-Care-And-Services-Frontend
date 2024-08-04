import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import XIcon from '@mui/icons-material/X';
import PinterestIcon from '@mui/icons-material/Pinterest';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';


function Footer() {
  return (
    <footer className="footer" style={{ marginTop:"10px",bottom: '0', width: '100%',backgroundColor:'#F2F3F4',alignContent:'center',justifyContent:'center',textAlign:'center',fontSize:'large'}}>
      <p style={{marginTop:'10px',color:'#bc0808',fontFamily:'Times New Roman, Times, serif'}}>© 2024 WheelsUp Care And Services. All rights reserved.</p>
      <div style={{display: 'flex', justifyContent: 'center'}}> 
    <p style={{marginTop:'10px',marginRight:'50px',color:'#bc0808',fontFamily:'Times New Roman, Times, serif'}}> 
        <LocationOnIcon /><br></br>4, Mount Road, Near Hdfc Bank, Kilpauk, Chennai.<br></br>
    </p> 
    <p style={{marginTop:'10px',color:'#bc0808',marginRight:'80px',fontFamily:'Times New Roman, Times, serif'}}> 
        <PhoneIcon /><br></br>(+91) 9475765201<br></br>
    </p> 
    <p style={{marginRight:'30px',marginTop:'10px',marginRight:'80px',color:'#bc0808',fontFamily:'Times New Roman, Times, serif'}}> 
        <MailIcon /><br></br>wheelsup.carservices@gmail.com<br></br>
    </p> 
</div> 
<br></br>
      <a href='https://www.instagram.com/accounts/login/'>
        <InstagramIcon sx={{marginRight:'10px',fontSize:20,color:'#bc0808'}} />
      </a>
      <a href='https://www.facebook.com/login/'>
        <FacebookIcon sx={{marginRight:'10px',fontSize:20,color:'#bc0808'}}/>
      </a>
      <a href='https://www.pinterest.com/login/'>
        <PinterestIcon sx={{marginRight:'10px',fontSize:20,color:'#bc0808'}} />
      </a>
      <a href='https://twitter.com/login/'>
        <TwitterIcon sx={{marginRight:'10px',fontSize:20,color:'#bc0808'}}/>
      </a>
      <a href='https://www.example.com/'>
        <XIcon sx={{marginRight:'10px',fontSize:20,color:'#bc0808'}}/>
      </a>
      <br></br>
      <br></br>
    </footer>
  );
};

export default Footer;
