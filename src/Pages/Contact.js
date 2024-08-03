import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Description } from '@mui/icons-material';

const images = [
  {
    icon: <LocationOnIcon />,
    title: 'Location',
    description:'24, Mount Road, Near Hdfc Bank, Kilpauk, Chennai',
    width: '40%',
  },
  {
    icon: <PhoneIcon />,
    title: 'Phone',
    description:'(+91) 9475765201',
    width: '30%',
  },
  {
    icon: <MailIcon />,
    title: 'Mail',
    description:'wheelsup.carservices@gmail.com',
    width: '30%',
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#bc0808',
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: '#F2F3F4',
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: '#bc0808',
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

function Contact() {
    return (
      <div>
        <br></br>
        <br></br>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
          {images.map((image) => (
            <ImageButton
              focusRipple
              key={image.title}
              style={{
                width: image.width,
              }}
            >
              <ImageBackdrop className="MuiImageBackdrop-root" />
              <Image>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  sx={{
                    position: 'relative',
                    p: 4,
                    pt: 2,
                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                  }}
                >
                  {image.icon}<br></br>
                  {image.title}<br></br>
                  {image.description}
                  <ImageMarked className="MuiImageMarked-root" />
                </Typography>
              </Image>
            </ImageButton>
          ))}
        </Box>
        <br></br>
        <Typography gutterBottom variant="h4" style={{fontWeight:'bolder',textAlign:'center', fontFamily: 'Times New Roman, Times, serif' }}>
            Contact Us
            </Typography>
        <Card sx={{width:'600px',height:'350px',justifyContent:'center',alignContent:'center',marginLeft:'450px',marginTop:'40px',backgroundColor:'#F2F3F4'}}>
            <Typography gutterBottom variant="h6" style={{fontWeight:'bolder',textAlign:'center', fontFamily: 'Times New Roman, Times, serif' }}>
                For further queries do reach out to us 
            </Typography>
            <CardContent>
                <Box md={2}>
                    <Typography gutterBottom variant="subtitle1" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                        Please type out your further queries
                    </Typography>
                    <TextField
                        required
                        id="outlined-required"
                        multiline
                        rows={4}
                        sx={{width:'566px'}}
                    />
                </Box>
                <br></br>
                <Button variant="contained" sx={{width:'100px',height:'40px',alignContent:'center',alignItems:'center',justifyContent:'center',backgroundColor:'#bc0808', marginLeft:'235px'}} color="primary">
                    Submit
                </Button>
            </CardContent>
        </Card>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    );
  }
  
  export default Contact;
  