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
    <div>
      <Card sx={{ display: 'flex', maxWidth: 1100,marginLeft:23,marginTop:12,backgroundColor:'#d7dce2',borderRadius:10}}>
  <CardMedia
    sx={{ width: 1700, height: 500 }}
    image={'https://jmautorepair.com/wp-content/uploads/sites/3436/2023/03/932280slider4.jpg'}
    title="Car Repair"
  />
  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <CardContent>
      <Typography gutterBottom variant="h3" component="div">
        World-Class Service for Your Car
      </Typography>
      <Typography variant="h6" color="text.secondary">
        At MCQueen Car Service, quality service is affordable. We are powered by MCQueen, to be your world-class workshop next door for complete car care - service, maintenance, and car repairs, for any car.
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="medium" sx={{
    color: '#000080',
    '&:hover': {
      bgcolor: '#b0c4de',
    }}}>Book A service</Button>
      <Button size="medium" sx={{
    color: '#000080',
    '&:hover': {
      bgcolor: '#b0c4de',
    }}}>Learn More</Button>
    </CardActions>
  </Box>
</Card>
<h1 style={{fontFamily:'Arial, "Helvetica Neue", Helvetica, sans-serif'}}>Our Services</h1>
<h1 style={{color:'white',textAlign:'center',fontFamily:'Arial, "Helvetica Neue", Helvetica, sans-serif'}}>Visit our nearest workshop for high-quality service </h1>
<Grid container spacing={3}>
{cardsData.map((card, index) => (
  <Grid item xs={6} sm={3} key={index}sx={{ marginRight: -1, marginLeft: -1 }}>
    <Card sx={{ maxWidth: 300, maxHeight: 230, borderRadius: 10, marginLeft:8,backgroundColor:'#d7dce2' }}>
      <CardContent sx={{ justifyContent: 'center', display: 'flex' }}>
        <card.icon style={{ fontSize: 60 }} />
      </CardContent>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h4" style={{ textAlign: 'center' }}>
          {card.title}
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: 'center' }}>
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
 