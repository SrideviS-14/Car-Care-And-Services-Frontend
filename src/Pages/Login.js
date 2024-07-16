import React,{useState} from "react";
import  { Button, Card,CardActions,CardContent, Typography,TextField,Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from './AuthContext';

function Login()
{
  const navigate=useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
  const api = axios.create({
    baseURL: 'http://localhost:8080', // Change this to your actual backend URL
  });
  const [formData, setFormData] = useState({
    username: '',
    password: '',
});
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await api.post('/account/login', formData);
        setIsLoggedIn(true);
        navigate('/');
        console.log('Registration successful:', response.data.user);
        // Handle success (e.g., redirect to login page)
    } catch (error) {
        alert("Invalid User Name or Password!");
        console.error('Registration failed:');
        // Handle error (e.g., display error message)
    }
};

return (

<div>
    <Box height="90vh" display="flex" justifyContent="center" alignItems="center">
    <Card sx={{width:500,backgroundColor:'#d7dce2',height:450,justifyContent:"center",borderRadius:12}}>
        <CardContent>
        <Typography gutterBottom variant="h5" component="div"style={{textAlign:'center'}}>Login In Here</Typography>
        <Typography gutterBottom variant="h6" component="div"style={{textAlign:'center'}}>Book Your Service In A Click </Typography><br></br>
        <Box mb={2}>
            <Typography gutterBottom variant="subtitle1">
              User Name:
            </Typography>
            <TextField
              required
              id="outlined-required"
              label="Enter Your User Name"
              fullWidth
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </Box>
          <Box mb={2}>
            <Typography gutterBottom variant="subtitle1">
              Password:
            </Typography>
            <TextField 
              required
              id="outlined-password-input"
              label="Enter your Password"
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
            <Button size="large" variant="contained" style={{marginRight:15,backgroundColor:'#000080'}}>Forgot Password</Button>
            <Button size="large" variant="contained"style={{backgroundColor:'#000080'}} onClick={handleSubmit}>Login In</Button>
            </Box>
        </CardActions>
        </Card>
        </Box>
    </div>
);
}
export default Login;