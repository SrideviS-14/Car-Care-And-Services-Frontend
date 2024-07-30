import React, { useState } from "react";
import { Button, Card, CardActions, CardContent, Typography, TextField, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from './AuthContext';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar'; 

function Login() {
  const navigate = useNavigate();
  const { setJwt, setRole, role } = useAuth();
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
 
  const api = axios.create({
    baseURL: 'http://localhost:8080', // Change this to your actual backend URL
  });
 
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
 
  const [errors, setErrors] = useState({
    usernameError: false,
    passwordError: false,
    usernameHelperText: '',
    passwordHelperText: '',
  });
 
  const validateForm = () => {
    let isValid = true;
    if (!formData.username || formData.username.length < 4) {
      setErrors(prevErrors => ({
        ...prevErrors,
        usernameError: true,
        usernameHelperText: 'Username must be at least 4 characters',
      }));
      isValid = false;
    }
 
    if (!formData.password || formData.password.length < 8) {
      setErrors(prevErrors => ({
        ...prevErrors,
        passwordError: true,
        passwordHelperText: 'Password must be at least 8 characters',
      }));
      isValid = false;
    }
 
    return isValid;
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await api.post('/account/login', formData);
        localStorage.setItem('jwt', response.data.token);
        setJwt(response.data.token);
        setRole(response.data.user.role);
        localStorage.setItem('role', role);
        setOpen(true);
        if (response.data.user.role === 'admin') {
          setTimeout(()=>{
            navigate('/dashboard');
          },500);
        } else {
          setTimeout(() => {
            navigate('/');
          }, 500);
        }
      } catch (error) {
        setOpenFail(true);
        setOpen(false);
        console.error('Login failed:', error);
      }
    }
  };
  const [open, setOpen] = React.useState(false);
  const [openFail, setOpenFail] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const handleCloseFail = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenFail(false);
  };
  const action =(
    <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
   )
   const action1 =(
    <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseFail}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
   )
  return (
    <div>
      <Box fontFamily='Times New Roman, Times, serif' height="90vh" display="flex" justifyContent="center" alignItems="center">
        <Card sx={{ fontFamily:'Times New Roman, Times, serif',width: 500, backgroundColor: '#F2F3F4', height: 450, justifyContent: "center", borderRadius: 12 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" style={{fontWeight:'bolder', fontFamily:'Times New Roman, Times, serif',textAlign: 'center' }}>Login In Here</Typography>
            <Typography gutterBottom variant="h6" component="div" style={{ fontFamily:'Times New Roman, Times, serif',textAlign: 'center' }}>Book Your Service In A Click </Typography><br></br>
            <Box mb={2}>
              <Typography gutterBottom variant="subtitle1">
                User Name:
              </Typography>
              <TextField
                required
                error={errors.usernameError}
                id="outlined-required"
                label="Enter Your User Name"
                fullWidth
                helperText={errors.usernameHelperText}
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
                error={errors.passwordError}
                id="outlined-password-input"
                label="Enter your Password"
                type="password"
                autoComplete="current-password"
                fullWidth
                helperText={errors.passwordHelperText}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </Box>
          </CardContent>
          <CardActions>
            <Box width="100%" display="flex" justifyContent="center">
              <Button size="large" variant="contained" style={{height:'39px',width:"190px", backgroundColor: '#008b8b' }} onClick={handleSubmit}>Lets Get Started</Button>
            </Box>
          </CardActions>
        </Card>
      </Box>
      <Snackbar
        open={open}
        severity="success"
        autoHideDuration={2000} // Display for 4 seconds
        onClose={handleClose}
        message="login Successfull"
        action={action}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Display at the top
      />
      <Snackbar
        open={openFail}
        severity="error"
        autoHideDuration={2000}
        onClose={handleCloseFail}
        message="Login Unsuccessful"
        action={action1}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}
 
export default Login;
