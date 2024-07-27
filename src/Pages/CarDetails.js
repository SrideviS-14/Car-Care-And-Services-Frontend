import {Grid,Card,CardContent,Typography,Box,TextField, CardActions, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { useState } from 'react';
function CarDetails(){
const {jwt, setJwt } = useAuth();
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
    }, // Change this to your actual backend URL
  });
  const [formData, setFormData] = useState({
    Car_Number:'',
    Car_Type:'',
    Car_Model:'',
    Car_Color:'',
    Car_Company:'',
    id: userId
});

    const navigate = useNavigate();
    const handlesubmit = async () => {
        try {
            console.log(formData.id);
            const response = await api.post('/car/addCarDetails',formData); // Corrected the payload
            console.log('Added successfully!', response.data);
            navigate('/login')
          } catch (error) {
            alert('Could not add!');
            console.error('Registration failed:', error);
            // Handle error (e.g., display error message)
          }
        }
    return(
        <div>
            <Box sx={{justifyContent:"center"  ,marginTop:"20px",fontFamily:'Times New Roman, Times, serif'}}>
            <Card sx={{marigntop:'50px',fontFamily:'Times New Roman, Times, serif',marginLeft:'500px',width:'470px', height:'700px',justifyContent: "center", borderRadius: 12, backgroundColor: '#F2F3F4' }}>
<Grid spacing={2} sx={{fontFamily:'Times New Roman, Times, serif',marginLeft:'5px',marginTop:'30px'}}>
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
      value={formData.Car_Number}
      onChange={(e) => setFormData({ ...formData, Car_Number: e.target.value })}
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
      value={formData.Car_Model}
      onChange={(e) => setFormData({ ...formData, Car_Model: e.target.value })}
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
      value={formData.Car_Company}
      onChange={(e) => setFormData({ ...formData, Car_Company: e.target.value })}
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
      value={formData.Car_Type}
      onChange={(e) => setFormData({ ...formData, Car_Type: e.target.value })}
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
      value={formData.Car_Color}
      onChange={(e) => setFormData({ ...formData, Car_Color: e.target.value })}
    />
  </Box>
  </CardContent>
  <CardActions sx={{justifyContent:'center',fontFamily:'Times New Roman, Times, serif'}}>
    <Button size='large' variant='contained'onClick={handlesubmit} style={{alignContent:'center',backgroundColor: '#008b8b',fontFamily:'Times New Roman, Times, serif'}}>Submit</Button>
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
  export default CarDetails;