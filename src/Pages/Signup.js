import React, {useState} from "react";
import axios from "axios";
import  { Button, Card,CardActions,CardContent, Typography,TextField,Box } from "@mui/material";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from "react-router-dom";
function SignUp()
{
  const navigate = useNavigate();
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
  const api = axios.create({
    baseURL: 'http://localhost:8080', // Change this to your actual backend URL
  });
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    phoneNumber: ''
});
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await api.post('/account/register', formData);
        navigate('/login')
        console.log('Registration successful:', response.data.user);
        // Handle success (e.g., redirect to login page)
    } catch (error) {
        console.error('Registration failed:');
        // Handle error (e.g., display error message)
    }
};
return (
    <Box height="90vh" display="flex" justifyContent="center" alignItems="center" marginTop="20px">
    <Card sx={{width:550,height:710,justifyContent:"center",borderRadius:12,backgroundColor:'#d7dce2'}}>
        <CardContent>
        <Typography gutterBottom variant="h5" component="div"style={{textAlign:'center',padding:5,marginTop:10}}>Sign Up Here</Typography>
        <Typography gutterBottom variant="h6" component="div"style={{textAlign:'center'}}>Experience An Exquisite On A Click </Typography><br></br>
          <Box md={2}>
          <Typography gutterBottom variant="subtitle1">
              User Name:
            </Typography>
            <TextField
              required
              id="outlined-required"
              label="Enter Your User Name"
              fullWidth
              value={formData.userName}
              onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
            />
          </Box><br></br>
          <Box mb={2}>
            <Typography gutterBottom variant="subtitle1">
              E-mail:
            </Typography>
            <TextField
              required
              id="outlined-required"
              label="Enter Your Email"
              type="email"
              fullWidth
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </Box>
          <Box md={2}>
          <Typography gutterBottom variant="subtitle1">
            Phone Number:
            </Typography>
            <TextField
              required
              id="outlined-required"
              label="Enter Your Phone number"
              fullWidth
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            />
          </Box><br></br>
          <Box mb={2}>
            <Typography gutterBottom variant="subtitle1">
              Password:
            </Typography>
            <TextField 
              required
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              fullWidth
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </Box>
        </CardContent>
        <CardActions>
            <Box width="100%" display="flex" justifyContent="center">
            <Button size="large" variant="contained"style={{backgroundColor:'#000080'}} onClick={handleSubmit}>Sign Up</Button>
            </Box>
        </CardActions>
        <Typography gutterBottom variant="subtitle2" style={{textAlign:'center'}}>
              By signing up you agree to our Terms Of Service and Privacy Policy
            </Typography>
            <FormGroup>
            <FormControlLabel control={<Checkbox/>} style={{justifyContent:'center'}} label="Email me with offers and updates" />
            </FormGroup>
        </Card>
        </Box>
);
}
export default SignUp;