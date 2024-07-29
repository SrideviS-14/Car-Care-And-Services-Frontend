import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Box, TextField, CardActions, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Pages/AuthContext';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { Checkbox, FormControlLabel } from "@mui/material";
import EastIcon from '@mui/icons-material/East';
import BuildIcon from '@mui/icons-material/Build';
import SettingsIcon from '@mui/icons-material/Settings';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import CarCrashSharpIcon from '@mui/icons-material/CarCrashSharp';
import HighlightIcon from '@mui/icons-material/Highlight';

function AddBooking() {
  const { jwt, setJwt } = useAuth();
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
  const location = useLocation();
  const userId = location.state ? location.state.userID : null;
  console.log(userId);
  const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": 'application/json'
    },
  });
  const [carddata, setcarddata] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const [selectedServices, setSelectedServices] = useState([]);
  const handleServiceChange = (event, serviceId) => {
    if (event.target.checked) {
      setSelectedServices([...selectedServices, serviceId]);
    } else {
      setSelectedServices(selectedServices.filter(id => id !== serviceId));
    }
  };
  useEffect(() => {
    api.get('/service/getAllServicesAndPackages')
      .then((response) => {
        console.log(response.data);
        setcarddata(response.data);
        setIsLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  useEffect(() => {
    console.log(selectedServices);
  }, [selectedServices]);

  const [formData, setFormData] = useState({
    Car_Number: '',
    Car_Type: '',
    Car_Model: '',
    Car_Color: '',
    Car_Company: '',
    id: userId,
    username: '',
    phone_number: ''
  });

  const navigate = useNavigate();
  const handlesubmit = async () => {
    try {
      console.log(formData.id);
      const response = await api.post('/car/addCarDetails', formData);
      console.log('Added successfully!', response.data);
      navigate('/login')
    } catch (error) {
      alert('Could not add!');
      console.error('Registration failed:', error);
    }
  }
  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: "center", marginTop: "20px", fontFamily: 'Times New Roman, Times, serif' }}>
        <Card sx={{ marigntop: '50px', fontFamily: 'Times New Roman, Times, serif', marginLeft: '50px', width: '940px', height: '1000px', justifyContent: "center", borderRadius: 12, backgroundColor: 'white' }}>
          <Grid container spacing={2} sx={{ fontFamily: 'Times New Roman, Times, serif', marginLeft: '5px', marginTop: '30px' }}>
            <Grid item xs={6}>
              <Typography variant='h6' sx={{ textAlign: 'center', fontWeight: 'bolder', fontFamily: 'Times New Roman, Times, serif' }}>Add a booking</Typography>
              <CardContent>
                <Box md={2}>
                  <Typography gutterBottom variant="subtitle1" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                    Username
                  </Typography>
                  <TextField
                    required
                    id="outlined-required"
                    label="Enter Your Username"
                    fullWidth
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  />
                </Box>
                <br></br>
                <Box md={2}>
                  <Typography gutterBottom variant="subtitle1" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                    Phone Number
                  </Typography>
                  <TextField
                    required
                    id="outlined-required"
                    label="Enter Your Phone Number"
                    fullWidth
                    value={formData.phone_number}
                    onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                  />
                </Box>
                <br></br>
                <Box md={2}>
                  <Typography gutterBottom variant="subtitle1" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                    Car Number
                  </Typography>
                  <TextField
                    required
                    id="outlined-required"
                    label="Enter Your Car Number"
                    fullWidth
                    value={formData.Car_Number}
                    onChange={(e) => setFormData({ ...formData, Car_Number: e.target.value })}
                  />
                </Box>
                <br></br>
                <Box md={2}>
                  <Typography gutterBottom variant="subtitle1" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                    Car Model
                  </Typography>
                  <TextField
                    required
                    id="outlined-required"
                    label="Enter Your Car Model"
                    fullWidth
                    value={formData.Car_Model}
                    onChange={(e) => setFormData({ ...formData, Car_Model: e.target.value })}
                  />
                </Box>
                <br></br>
                <Box md={2}>
                  <Typography gutterBottom variant="subtitle1" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                    Car Company
                  </Typography>
                  <TextField
                    required
                    id="outlined-required"
                    label="Enter Your Car Company"
                    fullWidth
                    value={formData.Car_Company}
                    onChange={(e) => setFormData({ ...formData, Car_Company: e.target.value })}
                  />
                </Box>
                <br></br>
                <Box md={2}>
                  <Typography gutterBottom variant="subtitle1" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                    Car Type
                  </Typography>
                  <TextField
                    required
                    id="outlined-required"
                    label="Enter Your Car Type"
                    fullWidth
                    value={formData.Car_Type}
                    onChange={(e) => setFormData({ ...formData, Car_Type: e.target.value })}
                  />
                </Box>
                <br></br>
                <Box md={2}>
                  <Typography gutterBottom variant="subtitle1" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                    Car Colour
                  </Typography>
                  <TextField
                    required
                    id="outlined-required"
                    label="Enter Your Car Colour"
                    fullWidth
                    value={formData.Car_Color}
                    onChange={(e) => setFormData({ ...formData, Car_Color: e.target.value })}
                  />
                </Box>
                <br></br>
              </CardContent>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='h6' sx={{ textAlign: 'center', fontWeight: 'bolder', fontFamily: 'Times New Roman, Times, serif' }}>Services</Typography>
              <CardContent>
  {!isLoading && carddata.map((item, index) => (
    <FormControlLabel sx={{ fontFamily: 'Times New Roman, Times, serif' }}
      key={item.service_ID}
      control={<Checkbox onChange={(event) => handleServiceChange(event, item.service_ID)} />}
      label={
        <Box sx={{whiteSpace: 'nowrap', fontSize: 'large', fontFamily: 'Times New Roman, Times, serif',  alignItems: 'center', display: 'block' }}>
          {item.service_Name}  -  ₹{item.service_Amount}<br></br>
        </Box>
      }
    />
  ))}
</CardContent>

              <CardActions sx={{ justifyContent: 'center', fontFamily: 'Times New Roman, Times, serif' }}>
                <Button size='large' variant='contained' onClick={handlesubmit} style={{ alignContent: 'center', backgroundColor: '#000080', fontFamily: 'Times New Roman, Times, serif' }}>Submit</Button>
              </CardActions>
            </Grid>
          </Grid>
        </Card>
      </Box>
      <br></br>
      <br></br>
      <br></br>
    </div>

  );
}
export default AddBooking;
