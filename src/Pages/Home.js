import React, { useState,useEffect }  from 'react';
import EastIcon from '@mui/icons-material/East';
import BuildIcon from '@mui/icons-material/Build';
import SettingsIcon from '@mui/icons-material/Settings';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import CarCrashSharpIcon from '@mui/icons-material/CarCrashSharp';
import HighlightIcon from '@mui/icons-material/Highlight';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography, Grid } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';
import ReactCardFlip from 'react-card-flip';
import { motion } from "framer-motion";

class MyCard extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          isFlipped: false,
      };
      this.handleHover = this.handleHover.bind(this);
      this.handleHoverLeave = this.handleHoverLeave.bind(this);
  }

  handleHover(e) {
      e.preventDefault();
      this.setState({ isFlipped: true });
  }

  handleHoverLeave(e) {
      e.preventDefault();
      this.setState({ isFlipped: false });
  }

  render() {
      return (
          <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical" flipSpeedBackToFront={1} flipSpeedFrontToBack={1} sx={{alignContent:'center', justifyContent: 'center'}}>
              <Card onMouseEnter={this.handleHover} onMouseLeave={this.handleHoverLeave} sx={{ textAlign: 'center', fontFamily:'Times New Roman, Times, serif',alignContent:'center', justifyContent: 'center',width:320,height:310, borderRadius: 10, marginLeft:8, fontFamily:'Times New Roman, Times, serif', backgroundColor:'#F2F3F4','&:hover': { bgcolor:'#dc143c',color:'white', transform: 'scale(1.1)' } }}>
                  <CardContent sx={{ alignContent:'center', justifyContent: 'center', display: 'flex' }}>
                      <this.props.icon style={{ fontSize: 60 }} onClick={this.props.onIconClick} />
                  </CardContent>
                  <CardContent sx={{ alignContent:'center', justifyContent: 'center',textAlign: 'center', fontFamily:'Times New Roman, Times, serif' }}>
                      <Typography gutterBottom variant="h6" component="h6" style={{ justifyContent:'center', textAlign: 'center', fontFamily:'Times New Roman, Times, serif' }}>
                          {this.props.title}
                      </Typography>
                  </CardContent>
              </Card>
              <Card onMouseEnter={this.handleHover} onMouseLeave={this.handleHoverLeave} sx={{justifyContent:'center',textAlign: 'center', fontFamily:'Times New Roman, Times, serif', width: 320, height: 310, borderRadius: 10, marginLeft:8, fontFamily:'Times New Roman, Times, serif', backgroundColor:'#F2F3F4', '&:hover': { transform: 'scale(1.1)' } }}>
                  <CardContent sx={{ alignContent:'center', justifyContent: 'center' }}>
                      <Typography gutterBottom variant="h6" component="h6" style={{ alignContent:'justify',justifyContent:'center',textAlign: 'center', fontFamily:'Times New Roman, Times, serif' }}>
                          {this.props.description}
                      </Typography>
                  </CardContent>
              </Card>
          </ReactCardFlip>
      );
  }
}



function Home() {
  const { jwt, setJwt } = useAuth();
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
  const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": 'application/json'
    }, 
  });
  const [data, setdata] = useState();
useEffect(() => {
  api.get('/account/profile')
    .then((response) => {
      console.log(response.data.User.userName);
      setdata(response.data.User.userName);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}, []);

  const navigate = useNavigate();
  const HandleClick = () => {
    {!!jwt ? navigate('/Cart') : navigate('/login')}
  }
  const handleIconClick = () => {
    navigate('/some-page');
  }
  const cardsData = [
    { title: 'Inspection & Checks', icon: SettingsIcon, description: "Comprehensive inspection of the vehicle, including safety checks, fluid levels, and overall condition. Our skilled technicians meticulously examine critical components to ensure optimal performance and safety." },
    { title: 'Car Repair Service', icon: BuildIcon, description: "Our expert mechanics handle mechanical issues, engine problems, and other malfunctions. Whether it's a faulty transmission, worn-out brakes, or engine diagnostics, we provide reliable repairs to keep your vehicle running smoothly." },
    { title: 'Tyre Service', icon: LocalGasStationIcon, description: "Tire maintenance is crucial for safe driving. Our tire experts perform rotation, balancing, and alignment to extend tire life and enhance handling. We ensure your wheels are road-ready." },
    { title: 'Electronic Services', icon: ElectricCarIcon, description: "Modern vehicles rely on intricate electronic systems. Our skilled technicians diagnose and repair issues related to sensors, wiring, and onboard components. Trust us to keep your car's electronics in top shape." },
    { title: 'Air Conditioning Service', icon: AcUnitIcon, description: "Don't sweat it! Our air conditioning service includes thorough inspection, cleaning, and maintenance. We ensure your A/C system blows cool air during scorching summers." },
    { title: 'Engine Service', icon: CarCrashSharpIcon, description: "Your engine deserves the best care. Our comprehensive engine service covers oil changes, filter replacements, and performance checks. We fine-tune your engine for optimal efficiency and longevity." },
    { title: 'Brake Service', icon: SettingsIcon, description: "Safety first! Our brake service includes inspection, adjustment, and repair of the braking system. We ensure your brakes respond promptly, providing reliable stopping power." },
    { title: 'Car Bulb Check', icon: HighlightIcon, description: "See and be seen! Our technicians verify and replace bulbs (headlights, taillights, etc.) as needed. Proper lighting enhances visibility and safety on the road." }
  ];
  const handlebutton = () => {
    navigate('/cart')
  }
  const handlebutton1 = () => {
    navigate('/about')
  }
  const text = "World-Class Service for Your Car".split(" ");
  return (
    <div style={{ fontFamily:'Times New Roman, Times, serif' }}>
        <br></br>
        <br></br>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '55px',
        fontSize: 'x-large',
        fontWeight: 'bolder',
        color: '#bc0808'
      }}>
        <marquee>Call to this (+91) 9475765201 to book your service</marquee>
      </div>
      <h1 style={{color:'black'}}>Welcome {data} !!</h1>
      <Card sx={{ fontFamily:'Times New Roman, Times, serif', justifyContent:'center', height:'max',display: 'flex', maxWidth: 1100, marginLeft:23, marginTop:5, backgroundColor:'#F2F3F4', borderRadius:10, color:'black' }}>
        <CardMedia
          sx={{width: 1700, height: 500 }}
          image={'https://jmautorepair.com/wp-content/uploads/sites/3436/2023/03/932280slider4.jpg'}
          title="Car Repair"
        />
        <Box sx={{ padding:'10px',color: 'black', fontFamily:'Times New Roman, Times, serif', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <CardContent>
          <div style={{fontSize:'300%',fontWeight:'lighter',fontFamily:'Times New Roman, Times, serif'}}>
              {text.map((el, i) => (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 1,
                    delay: i / 10
                  }}
                  key={i}
                >
                  {el}{" "}
                </motion.span>
              ))}
            </div>
            <br></br>
            <Typography variant="h6" style={{ fontFamily:'Times New Roman, Times, serif' }}>
              At MCQueen Car Service, quality service is affordable. We are powered by MCQueen, to be your world-class workshop next door for complete car care - service, maintenance, and car repairs, for any car.
            </Typography>
          </CardContent>
          <br></br>
          <CardActions sx={{alignContent:'center',justifyContent:'center'}}>
            <Button size="medium" variant='contained' sx={{ height:'35px',width:"171px",justifyContent:'center',alignContent:'center',fontFamily:'Times New Roman, Times, serif', borderColor:'#bc0808', backgroundColor:'#bc0808', '&:hover': { bgcolor: '#b0c4de' }}} onClick={handlebutton}>Book A service</Button>
            <Button size="medium" variant='contained' sx={{ height:'35px',width:"171px",justifyContent:'center',alignContent:'center',fontFamily:'Times New Roman, Times, serif', borderColor:'#bc0808', backgroundColor:'#bc0808', '&:hover': { bgcolor: '#b0c4de' }}} onClick={handlebutton1}>Learn More</Button>
          </CardActions>
        </Box>
      </Card>
      <h1 style={{ color:'black', fontFamily:'Times New Roman, Times, serif' }}>Our Services</h1>
      <h1 style={{ color:'black', textAlign:'center', fontFamily:'Times New Roman, Times, serif' }}>Visit our nearest workshop for high-quality service </h1>
      <br></br>
      <Grid container spacing={2}>
        {cardsData.map((card, index) => (
          <Grid item xs={6} sm={3} key={index} sx={{ marginRight: -2, marginLeft: -1 }}>
            <MyCard title={card.title} description={card.description} icon={card.icon} onIconClick={handleIconClick} />
          </Grid>
        ))}
      </Grid>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}
export default Home;
