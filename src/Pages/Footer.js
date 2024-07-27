import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import XIcon from '@mui/icons-material/X';
import PinterestIcon from '@mui/icons-material/Pinterest';
function Footer()
{
 return (
   <footer className="footer" style={{backgroundColor:'#F2F3F4',alignContent:'center',justifyContent:'center',textAlign:'center',fontSize:'large'}}>
     <p style={{color:'#003366',fontFamily:'Times New Roman, Times, serif'}}>© 2024 WheelsUp Care And Services. All rights reserved.</p>
       <InstagramIcon sx={{marginRight:'10px',fontSize:30,color:'#003366'}} />
       <FacebookIcon sx={{marginRight:'10px',fontSize:30,color:'#003366'}}/>
        <PinterestIcon sx={{marginRight:'10px',fontSize:30,color:'#003366'}} />
        <TwitterIcon sx={{marginRight:'10px',fontSize:30,color:'#003366'}}/>
        <XIcon sx={{marginRight:'10px',fontSize:30,color:'#003366'}}/><br></br>
         </footer>
 );
};
export default Footer;