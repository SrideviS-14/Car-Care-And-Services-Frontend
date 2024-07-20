import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import XIcon from '@mui/icons-material/X';
import PinterestIcon from '@mui/icons-material/Pinterest';
function Footer()
{
 return (
   <footer className="footer" style={{backgroundColor:'#d7dce2',alignContent:'center',justifyContent:'center',textAlign:'center',fontSize:'x-large'}}>
     <p style={{color:'#000080',fontFamily:'Times New Roman, Times, serif'}}>© 2024 WheelsUp Care And Services. All rights reserved.</p>
       <InstagramIcon sx={{fontSize:40,color:'#000080'}} />
       <FacebookIcon sx={{fontSize:40,color:'#000080'}}/>
        <PinterestIcon sx={{fontSize:40,color:'#000080'}} />
        <TwitterIcon sx={{fontSize:40,color:'#000080'}}/>
        <XIcon sx={{fontSize:40,color:'#000080'}}/><br></br>
         </footer>
 );
};
export default Footer;