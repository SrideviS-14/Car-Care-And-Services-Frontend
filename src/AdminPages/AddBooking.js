import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Box, TextField, CardActions, Button, Step, Stepper, StepLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Pages/AuthContext';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { Checkbox, FormControlLabel } from "@mui/material";
 
function AddBooking() {
  const { jwt, setJwt } = useAuth();
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
  const location = useLocation();
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
  const [Car_ID, setCar_ID] = useState(0);
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
 
  const [userFormData,setUserFormData] = useState({
    userName: '',
    email: '',
    phoneNumber: '',
  });
 
  const navigate = useNavigate();
    // Stepper states
    const [activeStep, setActiveStep] = useState(0);
    const steps = ['User Details', 'Car Details', 'Services'];
    const [userId, setUserId] = useState(1)
    const handleNext = async () => {
      if (activeStep === 0) {
        // User Details step
        console.log(userFormData);
        try {
          const response = await api.post('/account/isAUser', userFormData);
          console.log('User details added successfully!', response.data);
          setUserId(response.data.id)
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } catch (error) {
          if (error.response && error.response.status === 409) {
            alert('User already exists!');
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
          } else {
            alert('Could not add user details!');
          }
          console.error('User details submission failed:', error);
        }
      } else if (activeStep === 1) {
        // Car Details step
        try {
          const response = await api.post('/car/addCarDetails', formData);
          console.log(response.data);
          setCar_ID(response.data.car_ID);
          console.log('Car details added successfully!');
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } catch (error) {
          alert('Could not add car details!');
          console.error('Car details submission failed:', error);
        }
      }
    };
    const [bookData, setBookData] = useState({
      Service_List: "",
      Package_Amount: 0.00,
      Time_Period_In_Days: 0,
      User_ID: 0,
      Paid: false,
      car_ID: 0
    })
    const [formData, setFormData] = useState({
      car_Number:'',
      car_Type:'',
      car_Model:'',
      car_Color:'',
      car_Company:'',
      appUser: {
        id: userId
      }
    });
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handlesubmit = () => {
      let serviceList = selectedServices.map(service => service.service_ID).join(", ");
      let packageAmount = selectedServices.reduce((total, service) => total + service.service_Amount, 0);
      let maxTimePeriod = Math.max(...selectedServices.map(service => service.timePeriod));
      console.log(serviceList, packageAmount, maxTimePeriod);
      setBookData(prevState => ({
        ...prevState,
        Service_List: serviceList,
        Package_Amount: packageAmount,
        Time_Period_In_Days: maxTimePeriod,
        User_ID: userId,
        car_ID: Car_ID
      }));
    };
   
    useEffect(() => {
      console.log(Car_ID);
    }, [Car_ID]);
 
    useEffect(() => {
      const submitBooking = async () => {
        try {
          console.log(bookData);
          const response = await api.post('/booking/book', bookData);
          alert("Booked successfully");
          navigate("/dashboard");
          setBookData({});
          console.log(response.data)
        }
        catch(error)
        {
          console.log(error);
        }
      };
      submitBooking();
    }, [bookData]);
   
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
                        required
                        id="outlined-required"
                        label="Enter Your Username"
                        value={formData.userName}
                        fullWidth
                        onChange={(e) => setUserFormData({ ...userFormData, userName: e.target.value })}
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
                        value={formData.phoneNumber}
                        fullWidth
                        onChange={(e) => setUserFormData({ ...userFormData, phoneNumber: e.target.value })}
                      />
                    </Box>
                    <br></br>
                    <Box md={2}>
                      <Typography gutterBottom variant="subtitle1" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                        Email
                      </Typography>
                      <TextField
                        required
                        id="outlined-required"
                        label="Enter Your Phone Number"
                        value={formData.email}
                        fullWidth
                        onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })}
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
                        required
                        id="outlined-required"
                        label="Enter Your Car Number"
                        fullWidth
                        value={formData.car_Number}
                        onChange={(e) => setFormData({ ...formData, car_Number: e.target.value })}
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
                        value={formData.car_Model}
                        onChange={(e) => setFormData({ ...formData, car_Model: e.target.value })}
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
                        value={formData.car_Company}
                        onChange={(e) => setFormData({ ...formData, car_Company: e.target.value })}
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
                        value={formData.car_Type}
                        onChange={(e) => setFormData({ ...formData, car_Type: e.target.value })}
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
                        value={formData.car_Color}
                        onChange={(e) => setFormData({ ...formData, car_Color: e.target.value })}
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
                        control={<Checkbox onChange={(event) => handleServiceChange(event, item)} />}
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
                <Button size='large' variant='contained' onClick={handleBack} style={{ alignContent: 'center', backgroundColor: '#bc0808', fontFamily: 'Times New Roman, Times, serif', color: 'white', marginRight: '10px' }}>
                  Back
                </Button>
              )}
              {activeStep !== steps.length - 1 ? (
                <Button size='large' variant='contained' onClick={handleNext} style={{ alignContent: 'center', backgroundColor: '#bc0808', fontFamily: 'Times New Roman, Times, serif', color: 'white' }}>
                  Next
                </Button>
              ) : (
                <Button size='large' variant='contained' onClick={handlesubmit} style={{ alignContent: 'center', backgroundColor: '#bc0808', fontFamily: 'Times New Roman, Times, serif', color: 'white' }}>
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