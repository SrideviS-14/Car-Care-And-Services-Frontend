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
 
  const navigate = useNavigate();
  const handlesubmit = async () => {
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

  const handleProceed = () => {
    if (selectedCar) {
      navigate('/invoice', { state: {selectedCar: selectedCar, userId: selectedCar.appUser.userName}})
    } else {
      navigate('/invoice', { state: {selectedCar: formData, userId: selectedCar.appUser.userName}})
    }
  }  
  
  return(
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
    <div>
      {carDetails.map((car, index) => (
        <Card sx={{width:"550px",height:'150px',borderRadius:'15px'}}
          key={index} 
          onClick={() => {
            setSelectedCar(car);
          }} 
          style={{ margin: '10px', cursor: 'pointer' }}
        >
          <CardContent>
            <Typography variant="h5" component="div">
              <Box fontWeight="fontWeightBold">
                {car.car_Company} {car.car_Model}
              </Box>
            </Typography>
            <Typography color="text.secondary">
              Car Number: {car.car_Number}
            </Typography>
            <Typography color="text.secondary">
              Car Type: {car.car_Type}
            </Typography>
            <Typography color="text.secondary">
              Car Color: {car.car_Color}
            </Typography>
          </CardContent>
        </Card>
      ))}
      <br></br>
      <br></br>
      <Button onClick={handleProceed} variant='contained'style={{marginLeft:'230px',backgroundColor: '#000080'}}>Proceed</Button>
      <br></br>
      <br></br>
      {selectedCar && <div style={{fontSize:'x-large',marginLeft:'160px'}}>Selected Car: {selectedCar.car_Company} {selectedCar.car_Model}</div>}
    </div>
    <div>
      <Box sx={{justifyContent:"center"  ,marginTop:"50px",fontFamily:'Times New Roman, Times, serif'}}>
            <Card sx={{marigntop:'70px',fontFamily:'Times New Roman, Times, serif',marginLeft:'-10px',width:'470px', height:'700px',justifyContent: "center", borderRadius: 12, backgroundColor: 'white' }}>
    <Grid spacing={2} sx={{fontFamily:'Times New Roman, Times, serif',marginLeft:'1px',marginTop:'30px'}}>
    <Grid  spacing={2}>
    <Typography variant='h6' sx={{textAlign:'center',fontWeight:'bolder',fontFamily:'Times New Roman, Times, serif'}}>Please Type Out Car Details</Typography>
    <CardContent>
    <Box md={2}>
    <Typography gutterBottom variant="subtitle1" style={{fontFamily:'Times New Roman, Times, serif'}}>
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
    <Typography gutterBottom variant="subtitle1" style={{fontFamily:'Times New Roman, Times, serif'}}>
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
    <Typography gutterBottom variant="subtitle1" style={{fontFamily:'Times New Roman, Times, serif'}}>
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
    <Typography gutterBottom variant="subtitle1" style={{fontFamily:'Times New Roman, Times, serif'}}>
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
    <Typography gutterBottom variant="subtitle1"style={{fontFamily:'Times New Roman, Times, serif'}}>
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
    </CardContent>
    <CardActions sx={{justifyContent:'center',fontFamily:'Times New Roman, Times, serif'}}>
    <Button size='large' variant='contained'onClick={handlesubmit} style={{alignContent:'center',backgroundColor: '#000080',fontFamily:'Times New Roman, Times, serif'}}>Submit</Button>
    </CardActions>
    </Grid>
    </Grid>
    </Card>
    </Box>
    <br></br>
    </div>
</div>

);
}
export default CarDetails;
