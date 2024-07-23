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
  const cardsData = [
    { title: 'Inspection & Checks', icon: EastIcon },
    { title: 'Car Repair Service', icon: BuildIcon },
    { title: 'Tyre Service', icon: LocalGasStationIcon },
    { title: 'Electronic Services', icon: ElectricCarIcon },
    { title: 'Air Conditioning Service', icon: AcUnitIcon },
    { title: 'Engine Service', icon: CarCrashSharpIcon },
    { title: 'Brake Service', icon: SettingsIcon },
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
<Box display="flex" justifyContent="center" alignItems="center" marginTop="50px" marginBottom="50px" fontFamily='Times New Roman, Times, serif'>
      <Card sx={{ width: 800, height: 700, justifyContent: "center", borderRadius: 12, backgroundColor: '#d7dce2' }}>
      <Typography gutterBottom variant="h5" component="div"style={{textAlign:'center',padding:5,marginTop:10}}>Book A Car Service In Just A Minute</Typography>
      <Typography gutterBottom variant="h6" component="div"style={{textAlign:'center'}}>Experience An Exquisite On A Click </Typography><br></br>
        <Grid container spacing={2}>
          <Grid item xs={15} md={6}>
          <CardContent>
            <Box md={2} style={{fontFamily:'Times New Roman, Times, serif'}}>
            <Typography gutterBottom variant="subtitle1">
              Car Number
              </Typography>
              <TextField
                required
                id="outlined-required"
                label="Enter Your Car Number"
                fullWidth
              />
            </Box>
            <br></br>
            <Box md={2} style={{fontFamily:'Times New Roman, Times, serif'}}>
            <Typography gutterBottom variant="subtitle1">
              Car Model
              </Typography>
              <TextField
                required
                id="outlined-required"
                label="Enter Your Car Model"
                fullWidth
              />
            </Box>
            <br></br>
            <Box md={2} style={{fontFamily:'Times New Roman, Times, serif'}}>
            <Typography gutterBottom variant="subtitle1">
              Car Company
              </Typography>
              <TextField
                required
                id="outlined-required"
                label="Enter Your Car Company"
                fullWidth
              />
            </Box>
            <br></br>
            <Box md={2} style={{fontFamily:'Times New Roman, Times, serif'}}>
            <Typography gutterBottom variant="subtitle1">
              Car Type
              </Typography>
              <TextField
                required
                id="outlined-required"
                label="Enter Your Car Type"
                fullWidth
              />
              </Box>
            <br></br>
            <Box md={2} style={{fontFamily:'Times New Roman, Times, serif'}}>
            <Typography gutterBottom variant="subtitle1">
              Car Colour
              </Typography>
              <TextField
                required
                id="outlined-required"
                label="Enter Your Car Colour"
                fullWidth
              />
            </Box>
            </CardContent>
          </Grid>
          <Grid item xs={12} md={6} style={{ marginTop: 5,fontFamily:'Times New Roman, Times, serif' }}>
            <CardContent>
              <FormLabel component="legend">Select Your Services</FormLabel>
              <FormGroup>
              {carddata.map((item, index) => (
                <FormControlLabel
                  key={item.service_ID}
                  control={<Checkbox onChange={(event) => handleServiceChange(event, item.service_ID)}/>}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {React.createElement(cardsData[index].icon)}
                        {item.service_Name}
                    </Box>
                  }
                />
              ))}
              </FormGroup>
            </CardContent>
            <Box width="100%" display="flex" justifyContent="center" fontFamily='Times New Roman, Times, serif'>
              <Button size="large" variant="contained" sx={{ backgroundColor: '#000080' }} onClick={handleAddToCart}>
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