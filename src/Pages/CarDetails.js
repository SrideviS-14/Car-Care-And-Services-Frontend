import {Grid,Card,CardContent,Typography,Box,TextField, CardActions, Button} from '@mui/material';
import { useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';

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
  const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    },
  });

  useEffect(() => {
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
      setCarDetails([...carDetails, formData]);
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
    } catch (error) {
      alert('Could not add!');
    }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleProceed = (car) => {
    navigate('/invoice', { state: { selectedCar: car, userId: car.appUser.id } });
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
      <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '700px', overflow: 'auto' }}>
  {carDetails.length > 0 ? (
    carDetails.map((car, index) => (
      <Card key={index} sx={{ backgroundColor:'#F2F3F4',width: '550px', minHeight: '190px', borderRadius: '15px', margin: '10px', cursor: 'pointer', backgroundColor: selectedCar === car ? '#ce2029' : '#F2F3F4' }}
        onClick={() => setSelectedCar(car)}>
        <CardContent>
          <Typography variant="h5" component="div">
            <Box fontWeight="fontWeightBold">
              {car.car_Company} {car.car_Model}
            </Box>
          </Typography>
          <Typography color="text.secondary">Car Number: {car.car_Number}</Typography>
          <Typography color="text.secondary">Car Type: {car.car_Type}</Typography>
          <Typography color="text.secondary">Car Color: {car.car_Color}</Typography>
        </CardContent>
        <CardActions>
        <Button onClick={() => handleProceed(car)} variant='contained' sx={{ backgroundColor: '#bc0808', margin: 'auto' }}>Proceed</Button>
        </CardActions>
      </Card>
    ))
  ) : (
    <Typography variant="h6">No car details available. Please add a car.</Typography>
  )}
</Box>
    </div>
  );
}

export default CarDetails;
