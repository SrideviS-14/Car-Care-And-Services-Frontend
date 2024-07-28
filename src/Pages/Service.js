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
  const cardsData =
  [
    { title: 'Inspection & Checks', icon: EastIcon },
    { title: 'Car Repair Service', icon: BuildIcon },
    { title: 'Tyre Service', icon: LocalGasStationIcon },
    { title: 'Electronic Services', icon: ElectricCarIcon },
    { title: 'Air Conditioning Service', icon: AcUnitIcon },
    { title: 'Engine Service', icon: CarCrashSharpIcon },
    { title: 'Brake Service', icon: SettingsIcon },
    { title: 'Car Bulb Check', icon: HighlightIcon },
    { title: 'Car Bulb Check', icon: HighlightIcon },
    { title: 'Car Bulb Check', icon: HighlightIcon },
    { title: 'Car Bulb Check', icon: HighlightIcon }
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
    try {
      const response = await api.post('/cart/addQuickService', selectedServices); // Corrected the payload
      console.log('Added successfully!', response.data);
      navigate('/invoice');
    } catch (error) {
      alert('Could not add!');
      console.error('Registration failed:', error);
      // Handle error (e.g., display error message)
    }
  };
  return (
    
<Box display="flex" justifyContent="center" alignItems="center" marginTop="50px" marginBottom="50px" marginRight='150px' fontFamily='Times New Roman, Times, serif'>
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
                <FormControlLabel sx={{fontFamily:'Times New Roman, Times, serif'}}
                  key={item.service_ID}
                  control={<Checkbox onChange={(event) => handleServiceChange(event, item.service_ID)}/>}
                  label={
                    <Box sx={{ spacing:'5%',whiteSpace:'nowrap' ,padding:'5%',fontSize:'large',fontFamily:'Times New Roman, Times, serif',display: 'flex', alignItems: 'center' }}>
                      {React.createElement(cardsData[index].icon)} {item.service_Name} -  ₹{item.service_Amount}
                    </Box>
                  }
                />
              ))}
              </FormGroup>
            </CardContent>
            <br></br>
            <Box sx={{alignContent:'center',alignItems:'center'}}width="100%" justifyContent="center" fontFamily='Times New Roman, Times, serif'>
              <Button size="large" variant="contained" sx={{alignContent:'center',alignItems:'center', marginLeft:'37%',alignContent:'center',alignItems:'center', justifyContent:"center",backgroundColor: '#008b8b' }} onClick={handleAddToCart}>
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