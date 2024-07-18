import React from 'react';
import EastIcon from '@mui/icons-material/East';
import BuildIcon from '@mui/icons-material/Build';
import SettingsIcon from '@mui/icons-material/Settings';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import CarCrashSharpIcon from '@mui/icons-material/CarCrashSharp';
import HighlightIcon from '@mui/icons-material/Highlight';
import { Box,Button, Card, CardActions, CardContent, CardMedia, Typography,Grid } from "@mui/material";
function Home() {
  const cardsData = [
    { title: 'Inspection & Checks', icon: SettingsIcon },
    { title: 'Car Repair Service', icon: BuildIcon },
    { title: 'Tyre Service', icon: LocalGasStationIcon },
    { title: 'Electronic Services', icon: ElectricCarIcon },
    { title: 'Air Conditioning Service', icon: AcUnitIcon },
    { title: 'Engine Service', icon: CarCrashSharpIcon },
    { title: 'Brake Service', icon: SettingsIcon },
    { title: 'Car Bulb Check', icon: HighlightIcon }
  ];
 
  return (
    <div style={{fontFamily:'Times New Roman, Times, serif'}}>
      <br></br>
      <br></br>
      <div style={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '55px',
  backgroundColor: '#000080',
  fontSize: 'x-large',
  fontWeight: 'bolder',
  color: 'white'
}}>
  <marquee>Call to this (+91) 9475765201 to book your service</marquee>
</div>

      <Card sx={{ justifyContent:'center',height:'max',display: 'flex', maxWidth: 1100,marginLeft:23,marginTop:12,backgroundColor:'#d7dce2',borderRadius:10,color:'black'}}>
  <CardMedia
    sx={{ width: 1700, height: 500 }}
    image={'https://jmautorepair.com/wp-content/uploads/sites/3436/2023/03/932280slider4.jpg'}
    title="Car Repair"
  />
  <Box sx={{ fontFamily:'Times New Roman, Times, serif',display: 'flex', flexDirection: 'column', justifyContent: 'center',color:'black' }}>
    <CardContent>
      <Typography gutterBottom variant="h3" component="div"style={{fontFamily:'Times New Roman, Times, serif',color:'black'}}>
        World-Class Service for Your Car
      </Typography>
      <Typography variant="h6"style={{fontFamily:'Times New Roman, Times, serif'}}>
        At MCQueen Car Service, quality service is affordable. We are powered by MCQueen, to be your world-class workshop next door for complete car care - service, maintenance, and car repairs, for any car.
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="medium" sx={{fontFamily:'Times New Roman, Times, serif',
    color: '#000080',
    '&:hover': {
      bgcolor: '#b0c4de',
    }}}>Book A service</Button>
      <Button size="medium" sx={{fontFamily:'Times New Roman, Times, serif',
    color: '#000080',
    '&:hover': {
      bgcolor: '#b0c4de',
    }}}>Learn More</Button>
    </CardActions>
  </Box>
</Card>
<h1 style={{color:'black',fontFamily:'Times New Roman, Times, serif',}}>Our Services</h1>
<h1 style={{color:'black',textAlign:'center',fontFamily:'Times New Roman, Times, serif'}}>Visit our nearest workshop for high-quality service </h1>
<Grid container spacing={3}>
{cardsData.map((card, index) => (
  <Grid item xs={6} sm={3} key={index}sx={{ marginRight: -1, marginLeft: -1 }}>
    <Card sx={{ maxWidth: 300, maxHeight: 230, borderRadius: 10, marginLeft:8,fontFamily:'Times New Roman, Times, serif',backgroundColor:'#d7dce2' }}>
      <CardContent sx={{ justifyContent: 'center', display: 'flex' }}>
        <card.icon style={{ fontSize: 60 }} />
      </CardContent>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h4" style={{ textAlign: 'center',fontFamily:'Times New Roman, Times, serif' }}>
          {card.title}
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: 'center',fontFamily:'Times New Roman, Times, serif'}}>
        <Button size="large" color="primary">
          <EastIcon />
        </Button>
      </CardActions>
    </Card>
  </Grid>
))}
      </Grid>
    </div>
  );
}
 
export default Home;
 