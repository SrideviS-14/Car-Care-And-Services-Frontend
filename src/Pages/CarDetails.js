import {Grid,Card,CardContent,CardMedia,Typography,Box,TextField, CardActions, Button} from '@mui/material';
import { useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';
import Slide from '@mui/material/Slide';
import EastIcon from '@mui/icons-material/East';
import React from 'react';

 
function CarDetails(){
  const {jwt, setJwt } = useAuth();
  const [carDetails, setCarDetails] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(0);
  const [formErrors, setFormErrors] = useState({
    car_Number: '',
    car_Model: '',
    car_Company: '',
    car_Type: '',
    car_Color: ''
  });
 
  const images =[
    {title:'imag1',url:'https://www.arabianbusiness.com/cloud/2021/09/17/C0YPNCuy-523891448.jpg'},
    {title:'imag2',url:'https://s3.amazonaws.com/media.emercedesbenz.com/magazine/wp-content/uploads/2020/09/02085641/20C0417_003-1000x570.jpg'},
    {title:'image3',url:'https://theautomotiveblog.com/wp-content/uploads/2021/04/20210420034739_2021_mercedes_c_class_long_wheelbase_front.jpg'},
    {title:'image4',url:'https://tse2.mm.bing.net/th/id/OIP.XU6fo5eqdQTuykSks_2BXAHaE7?rs=1&pid=ImgDetMain'}
  ];
  const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    },
  });
 
  const fetchCarDetails = async () => {
    setLoading(true);
    try {
      const response = await api.get('/car/getCarDetailsOfUser');
      setCarDetails(response.data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };
 
  useEffect(() => {
    fetchCarDetails();
  },[]);
 
  useEffect(() => {
    api.get('/account/profile')
    .then((response) => {
      setUserId(response.data.UserId);
      setFormData(prevState => ({ ...prevState, appUser: { id: response.data.UserId } }));
    })
  }, []);
 
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
 
  const validateForm = () => {
    let errors = {};
    if (!formData.car_Number) errors.car_Number = "Car number is required";
    if (!formData.car_Model) errors.car_Model = "Car model is required";
    if (!formData.car_Company) errors.car_Company = "Car company is required";
    if (!formData.car_Type) errors.car_Type = "Car type is required";
    if (!formData.car_Color) errors.car_Color = "Car color is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }
 
  const navigate = useNavigate();
  const handlesubmit = async () => {
    if (!validateForm()) return;
    try {
      const response = await api.post('/car/addCarDetails',formData);
      setFormData({
        car_Number:'',
        car_Type:'',
        car_Model:'',
        car_Color:'',
        car_Company:'',
        appUser: {
          id: userId
        }
      });
      fetchCarDetails();
    } catch (error) {
      alert('Could not add!');
    }
  }
 
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
 
  const handleProceed = (car) => {
    console.log(car);
    navigate('/invoice', { state: { selectedCar: car } });
  };
 
 
  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: '100vh', padding: '50px' }}>
      <Box sx={{width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Card sx={{backgroundColor:'#F2F3F4',marigntop:'70px',fontFamily:'Times New Roman, Times, serif',marginLeft:'-10px',width:'470px', minHeight:'700px',justifyContent: "center", borderRadius: 12 }}>
    <Grid spacing={2} sx={{fontFamily:'Times New Roman, Times, serif',marginLeft:'1px',marginTop:'30px'}}>
    <Grid  spacing={2}>
    <Typography variant='h6' sx={{textAlign:'center',fontWeight:'bolder',fontFamily:'Times New Roman, Times, serif'}}>Please Type Out Car Details</Typography>
    <CardContent>
    <Box md={2}>
    <Typography gutterBottom variant="subtitle1" style={{fontFamily:'Times New Roman, Times, serif'}}>
    Car Number
    </Typography>
    <TextField
      error={!!formErrors.car_Number}
      helperText={formErrors.car_Number}
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
    <Typography gutterBottom variant="subtitle1" style={{fontFamily:'Times New Roman, Times, serif'}}>
    Car Model
    </Typography>
    <TextField
      error={!!formErrors.car_Model}
      helperText={formErrors.car_Model}
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
    <Typography gutterBottom variant="subtitle1" style={{fontFamily:'Times New Roman, Times, serif'}}>
    Car Company
    </Typography>
    <TextField
      error={!!formErrors.car_Company}
      helperText={formErrors.car_Company}
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
    <Typography gutterBottom variant="subtitle1" style={{fontFamily:'Times New Roman, Times, serif'}}>
    Car Type
    </Typography>
    <TextField
      error={!!formErrors.car_Type}
      helperText={formErrors.car_Type}
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
    <Typography gutterBottom variant="subtitle1"style={{fontFamily:'Times New Roman, Times, serif'}}>
    Car Colour
    </Typography>
    <TextField
      error={!!formErrors.car_Color}
      helperText={formErrors.car_Color}
      required
      id="outlined-required"
      label="Enter Your Car Colour"
      fullWidth
      value={formData.car_Color}
      onChange={(e) => setFormData({ ...formData, car_Color: e.target.value })}
    />
    </Box>
    </CardContent>
    <CardActions sx={{justifyContent:'center',fontFamily:'Times New Roman, Times, serif'}}>
    <Button size='large' variant='contained'onClick={handlesubmit} style={{ height:'35px',width:"171px",alignContent:'center',backgroundColor: '#bc0808',fontFamily:'Times New Roman, Times, serif'}}>Submit</Button>
    </CardActions>
    </Grid>
    </Grid>
    </Card>
      </Box>
      <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', height: '700px', overflow: 'auto' }}>
  {carDetails.length > 0 ? (
    carDetails.map((car, index) => (
      <Slide direction="up" in={true} mountOnEnter unmountOnExit key={index} timeout={1000}>
        <Card key={index} sx={{ backgroundColor:'#F2F3F4',width: '550px', minHeight: '220px', borderRadius: '15px', margin: '10px', cursor: 'pointer', display: 'flex', flexDirection: 'row' }}
          onClick={() => setSelectedCar(car)}>
          <CardContent sx={{ order: 2 }}>
            <Typography variant="body1" component="div" style={{fontSize:'large',textTransform:'capitalize'}}>
              <Box fontWeight="fontWeightBold">
                {car.car_Company} {car.car_Model}
              </Box>
              <br></br>
            </Typography>
            <Typography variant="body1" color="text.secondary" style={{fontSize:'medium',textTransform:'capitalize'}}>Car Number: {car.car_Number}</Typography>
            <Typography variant="body1" color="text.secondary" style={{fontSize:'medium',textTransform:'capitalize'}}>Car Type: {car.car_Type}</Typography>
            <Typography variant="body1" color="text.secondary" style={{fontSize:'medium',textTransform:'capitalize'}}>Car Color: {car.car_Color}</Typography>
            <br></br>
            <CardActions>
        {selectedCar === car && (
                  <Button onClick={() => handleProceed(car)} variant='contained' sx={{ backgroundColor: '#bc0808', margin: 'auto' }}>Proceed</Button>
                )}
        </CardActions>
          </CardContent>
          <CardMedia
                component="img"
                sx={{ order: 2 ,width:'312px'
                }}
                image= {images[index % images.length].url}
                alt="car image"
              />
      </Card>
      </Slide>
    ))
  ) : (
    <Typography variant="h6">No car details available. Please add a car.</Typography>
  )}
</Box>
    </div>
  );
}
 
export default CarDetails;
