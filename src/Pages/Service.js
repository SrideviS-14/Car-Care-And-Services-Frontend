import React,{useState, useEffect} from 'react';
import {Box,Button,Card,CardContent,Checkbox,FormControlLabel,FormGroup,FormLabel,Grid,TextField,Typography} from "@mui/material";
import EastIcon from '@mui/icons-material/East';
import BuildIcon from '@mui/icons-material/Build';
import SettingsIcon from '@mui/icons-material/Settings';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import CarCrashSharpIcon from '@mui/icons-material/CarCrashSharp';
import HighlightIcon from '@mui/icons-material/Highlight';
import axios from 'axios';
import { useAuth } from './AuthContext';
import Image from './images/output-onlinegiftools.gif'
import { useNavigate } from 'react-router-dom';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import TireRepairIcon from '@mui/icons-material/TireRepair';
import CarRepairIcon from '@mui/icons-material/CarRepair';
 
function Service() {
  const navigate = useNavigate();
  const {jwt} = useAuth();
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
  const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": 'application/json'
    },
  });
  const [carddata, setcarddata] = useState([]);
  const cardsData = [
    { title: 'Inspection & Checks', icon: FactCheckIcon, description: "Comprehensive inspection of the vehicle, including safety checks, fluid levels, and overall condition. Our skilled technicians meticulously examine critical components to ensure optimal performance and safety." },
    { title: 'Car Repair Service', icon: CarRepairIcon, description: "Our expert mechanics handle mechanical issues, engine problems, and other malfunctions. Whether it's a faulty transmission, worn-out brakes, or engine diagnostics, we provide reliable repairs to keep your vehicle running smoothly." },
    { title: 'Tyre Service', icon: TireRepairIcon, description: "Tire maintenance is crucial for safe driving. Our tire experts perform rotation, balancing, and alignment to extend tire life and enhance handling. We ensure your wheels are road-ready." },
    { title: 'Electronic Services', icon: ElectricCarIcon, description: "Modern vehicles rely on intricate electronic systems. Our skilled technicians diagnose and repair issues related to sensors, wiring, and onboard components. Trust us to keep your car's electronics in top shape." },
    { title: 'Air Conditioning Service', icon: AcUnitIcon, description: "Don't sweat it! Our air conditioning service includes thorough inspection, cleaning, and maintenance. We ensure your A/C system blows cool air during scorching summers." },
    { title: 'Engine Service', icon: CarCrashSharpIcon, description: "Your engine deserves the best care. Our comprehensive engine service covers oil changes, filter replacements, and performance checks. We fine-tune your engine for optimal efficiency and longevity." },
    { title: 'Brake Service', icon: BuildIcon, description: "Safety first! Our brake service includes inspection, adjustment, and repair of the braking system. We ensure your brakes respond promptly, providing reliable stopping power." },
    { title: 'Car Bulb Check', icon: HighlightIcon, description: "See and be seen! Our technicians verify and replace bulbs (headlights, taillights, etc.) as needed. Proper lighting enhances visibility and safety on the road." }
  ];
  const [selectedServices, setSelectedServices] = useState([]);
  const handleServiceChange = (event, serviceId) => {
    if (event.target.checked) {
      setSelectedServices([...selectedServices, serviceId]);
    } else {
      setSelectedServices(selectedServices.filter(id => id !== serviceId));
    }
  };
  useEffect(() => {
    api.get('/service/getAllServices')
      .then((response) => {
        console.log(response.data);
        setcarddata(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  useEffect(() => {
    console.log(selectedServices);
  }, [selectedServices]);
 
  const handleAddToCart = async () => {
    if (selectedServices.length === 0) {
      alert('Please select at least one service!');
      return;
    }
    try {
      const response = await api.post('/cart/addQuickService', selectedServices); // Corrected the payload
      console.log('Added successfully!', response.data);
      navigate('/carDetails');
    } catch (error) {
      alert('Could not add!');
      console.error('Registration failed:', error);
      // Handle error (e.g., display error message)
    }
  };  
  return (
       <Box display="flex" justifyContent="center" alignItems="center" marginTop="85px" marginBottom="50px" marginRight='150px' fontFamily='Times New Roman, Times, serif'>
      <div>
      <h1 style={{justifyContent:"center" ,alignItems:"center" ,textAlign:'center',color:'black'}}>Book a Car Service Within A Minute</h1>     
      <img src={Image} width='70%' style={{marginLeft:'17%',spacing:'nowrap'}}></img>
      </div>
      <Card sx={{ marginLeft:'20px',width: 500, height: 680, justifyContent: "center", borderRadius: 12, backgroundColor: '#F2F3F4' }}>
      <Typography gutterBottom variant="h5" component="div"style={{fontFamily:'Times New Roman, Times, serif',textAlign:'center',marginTop:'10%'}}>Experience An Exquisite On A Click </Typography><br></br>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} style={{  marginLeft:'40px',marginTop: 5,fontFamily:'Times New Roman, Times, serif' }}>
            <CardContent>
              <FormLabel component="legend"sx={{ color:'black',fontWeight:'bolder',fontSize:'large',fontFamily:'Times New Roman, Times, serif'}}>Select Your Services</FormLabel>
              <br></br>
              <FormGroup sx={{fontFamily:'Times New Roman, Times, serif'}}>
              {carddata.map((item, index) => (
  <FormControlLabel
    key={item.service_ID}
    control={<Checkbox onChange={(event) => handleServiceChange(event, item.service_ID)}/>}
    label={
      <Box sx={{ spacing:'5%',whiteSpace:'nowrap' ,padding:'5%',fontSize:'large',fontFamily:'Times New Roman, Times, serif',display: 'flex', alignItems: 'center' }}>
        {React.createElement(cardsData[index].icon, { style: { marginRight: '10px' } })}{item.service_Name} -  ₹{item.service_Amount}
      </Box>
    }
  />
))}

              </FormGroup>
            </CardContent>
            <br></br>
            <Box sx={{alignContent:'center',alignItems:'center'}}width="100%" justifyContent="center" fontFamily='Times New Roman, Times, serif'>
              <Button size="large" variant="contained" sx={{height:'35px',width:"171px",alignContent:'center',alignItems:'center', marginLeft:'37%',alignContent:'center',alignItems:'center', justifyContent:"center",backgroundColor: '#bc0808' }} onClick={handleAddToCart}>
                Book Service
              </Button>
            </Box>
          </Grid>
 
        </Grid>
      </Card>
      <br></br>
    <br></br>
    <br></br>
    </Box>
  );
}
 
export default Service;