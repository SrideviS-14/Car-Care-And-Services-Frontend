import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Box, TextField, CardActions, Button, Step, Stepper, StepLabel } from '@mui/material';
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
  const [isServiceSelected, setIsServiceSelected] = useState(false); // New state for checkbox validation

  const handleServiceChange = (event, serviceId) => {
    if (event.target.checked) {
      setSelectedServices([...selectedServices, serviceId]);
      setIsServiceSelected(true); // A service is selected
    } else {
      const newSelectedServices = selectedServices.filter(id => id !== serviceId);
      setSelectedServices(newSelectedServices);
      setIsServiceSelected(newSelectedServices.length > 0); // Check if there's still any service selected
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

  const [formErrors, setFormErrors] = useState({
    Car_Number: '',
    Car_Type: '',
    Car_Model: '',
    Car_Color: '',
    Car_Company: '',
    username: '',
    phone_number: ''
  });

  const validateForm = () => {
    let errors = {};
    if (!formData.username) errors.username = "Username is required";
    if (!formData.phone_number) errors.phone_number = "Phone number is required";
    if (!formData.Car_Number) errors.Car_Number = "Car number is required";
    if (!formData.Car_Model) errors.Car_Model = "Car model is required";
    if (!formData.Car_Company) errors.Car_Company = "Car company is required";
    if (!formData.Car_Type) errors.Car_Type = "Car type is required";
    if (!formData.Car_Color) errors.Car_Color = "Car color is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  const navigate = useNavigate();
  const handlesubmit = async () => {
    if (!validateForm() || !isServiceSelected) { // Validate the checkbox
      alert('Please select at least one service');
      return;
    }
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
    // Stepper states
    const [activeStep, setActiveStep] = useState(0);
    const steps = ['User Details', 'Car Details', 'Services'];

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  return (
    <div>
      <br></br><br></br>
      <Card sx={{ marigntop: '100px', fontFamily: 'Times New Roman, Times, serif', marginLeft: '280px', width: '900px', justifyContent: "center", borderRadius: 12, backgroundColor: '#F2F3F4' }}>
      <Grid container spacing={2} sx={{ fontFamily: 'Times New Roman, Times, serif', marginTop: '30px', alignItems:"center", justifyContent:"center" }} >
    <Grid item xs={6}>
      <Typography variant='h6' sx={{ textAlign: 'center', fontWeight: 'bolder', fontFamily: 'Times New Roman, Times, serif' }}>Add a booking</Typography>
      <CardContent alignItems="center">
        <Box > {/* Add this Box component */}
          <Stepper activeStep={activeStep} alternativeLabel sx={{ '& .MuiStepIcon-root': { fontSize: '2rem', color:'#bc0808' } }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <br></br>
          <br></br>
                {activeStep === 0 && (
                  <>
                    {/* User Details Form */}
                    <Box md={2}>
                      <Typography gutterBottom variant="subtitle1" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                        Username
                      </Typography>
                      <TextField
                        error={!!formErrors.username}
                        helperText={formErrors.username}
                        required
                        id="outlined-required"
                        label="Enter Your Username"
                        value={formData.username}
                        fullWidth
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      />
                    </Box>
                    <br></br>
                    <Box md={2}>
                      <Typography gutterBottom variant="subtitle1" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                        Phone Number
                      </Typography>
                      <TextField
                        error={!!formErrors.phone_number}
                        helperText={formErrors.phone_number}
                        required
                        id="outlined-required"
                        label="Enter Your Phone Number"
                        value={formData.phone_number}
                        fullWidth
                        onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                      />
                    </Box>
                    <br></br>
                  </>
                )}
                {activeStep === 1 && (
                  <>
                    {/* Car Details Form */}
                    <Box md={2}>
                      <Typography gutterBottom variant="subtitle1" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                        Car Number
                      </Typography>
                      <TextField
                        error={!!formErrors.Car_Number}
                        helperText={formErrors.Car_Number}
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
                        error={!!formErrors.Car_Model}
                        helperText={formErrors.Car_Model}
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
                        error={!!formErrors.Car_Company}
                        helperText={formErrors.Car_Company}
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
                        error={!!formErrors.Car_Type}
                        helperText={formErrors.Car_Type}
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
                        error={!!formErrors.Car_Color}
                        helperText={formErrors.Car_Color}
                        required
                        id="outlined-required"
                        label="Enter Your Car Colour"
                        fullWidth
                        value={formData.Car_Color}
                        onChange={(e) => setFormData({ ...formData, Car_Color: e.target.value })}
                      />
                    </Box>
                    <br></br>
                  </>
                )}
                {activeStep === 2 && (
                  <>
                    {/* Services Form */}
                    {!isLoading && carddata.map((item, index) => (
                      <FormControlLabel sx={{ fontFamily: 'Times New Roman, Times, serif' }}
                        key={item.service_ID}
                        control={<Checkbox onChange={(event) => handleServiceChange(event, item.service_ID)} />}
                        label={
                          <Box sx={{ whiteSpace: 'nowrap', fontSize: 'large', fontFamily: 'Times New Roman, Times, serif', alignItems: 'center', display: 'block' }}>
                            {item.service_Name}  -  ₹{item.service_Amount}<br></br>
                          </Box>
                        }
                      />
                    ))}
                  </>
                )}
                 <CardActions sx={{
              justifyContent: 'center',
              fontFamily: 'Times New Roman, Times, serif',
              width: '100%'
            }}>
              {activeStep !== 0 && (
                <Button size='large' variant='contained' onClick={handleBack} style={{  height:'35px',width:"171px",alignContent: 'center', backgroundColor: '#bc0808', fontFamily: 'Times New Roman, Times, serif', color: 'white', marginRight: '10px' }}>
                  Back
                </Button>
              )}
              {activeStep !== steps.length - 1 ? (
                <Button size='large' variant='contained' onClick={handleNext} style={{  height:'35px',width:"171px",alignContent: 'center', backgroundColor: '#bc0808', fontFamily: 'Times New Roman, Times, serif', color: 'white' }}>
                  Next
                </Button>
              ) : (
                <Button size='large' variant='contained' onClick={handlesubmit} style={{  height:'35px',width:"171px",alignContent: 'center', backgroundColor: '#bc0808', fontFamily: 'Times New Roman, Times, serif', color: 'white' }}>
                  Submit
                </Button>
              )}
            </CardActions>
            </Box> {/* Close the Box component */}
      </CardContent>
    </Grid>
  </Grid>
</Card>
<br></br>
<br></br>
<br></br>
<br></br>
                </div>
  )
 
}
export default AddBooking;