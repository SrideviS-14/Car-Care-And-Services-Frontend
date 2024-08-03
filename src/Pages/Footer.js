import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import XIcon from '@mui/icons-material/X';
import PinterestIcon from '@mui/icons-material/Pinterest';

function Footer() {
  return (
    <footer className="footer" style={{ bottom: '0', width: '100%',backgroundColor:'#F2F3F4',alignContent:'center',justifyContent:'center',textAlign:'center',fontSize:'large'}}>
      <p style={{color:'#bc0808',fontFamily:'Times New Roman, Times, serif'}}>© 2024 WheelsUp Care And Services. All rights reserved.</p>
      <a href='https://www.instagram.com/accounts/login/'>
        <InstagramIcon sx={{marginRight:'10px',fontSize:30,color:'#bc0808'}} />
      </a>
      <a href='https://www.facebook.com/login/'>
        <FacebookIcon sx={{marginRight:'10px',fontSize:30,color:'#bc0808'}}/>
      </a>
      <a href='https://www.pinterest.com/login/'>
        <PinterestIcon sx={{marginRight:'10px',fontSize:30,color:'#bc0808'}} />
      </a>
      <a href='https://twitter.com/login/'>
        <TwitterIcon sx={{marginRight:'10px',fontSize:30,color:'#bc0808'}}/>
      </a>
      <a href='https://www.example.com/'>
        <XIcon sx={{marginRight:'10px',fontSize:30,color:'#bc0808'}}/>
      </a>
      <br></br>
    </footer>
  );
};

export default Footer;
