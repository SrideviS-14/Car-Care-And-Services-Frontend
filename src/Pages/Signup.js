import React, { useState } from "react";
import axios from "axios";
import { Button, Card, CardActions, CardContent, Typography, TextField, Box } from "@mui/material";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';

  const api = axios.create({
    baseURL: 'http://localhost:8080', // Change this to your actual backend URL
  });

  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    phoneNumber: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    userNameError: false,
    emailError: false,
    phoneNumberError: false,
    passwordError: false,
    userNameHelperText: '',
    emailHelperText: '',
    phoneNumberHelperText: '',
    passwordHelperText: '',
  });

  const validateForm = () => {
    let isValid = true;
    let newErrors = {
      userNameError: false,
      emailError: false,
      phoneNumberError: false,
      passwordError: false,
      userNameHelperText: '',
      emailHelperText: '',
      phoneNumberHelperText: '',
      passwordHelperText: '',
    };

    if (!formData.userName || formData.userName.length < 6) {
      newErrors.userNameError = true;
      newErrors.userNameHelperText = 'Username must be at least 6 characters';
      isValid = false;
    }

    if (!formData.password || formData.password.length < 8) {
      newErrors.passwordError = true;
      newErrors.passwordHelperText = 'Password must be at least 8 characters';
      isValid = false;
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.emailError = true;
      newErrors.emailHelperText = 'A valid email is required';
      isValid = false;
    }

    if (!formData.phoneNumber || formData.phoneNumber.length < 10) {
      newErrors.phoneNumberError = true;
      newErrors.phoneNumberHelperText = 'A valid phone number is required';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await api.post('/account/register', formData);
        // If the registration is successful, navigate to the CarDetails page
        navigate('/CarDetails');
      } catch (error) {
        // Handle registration error
        console.error('Registration failed:', error);
        // Set error messages based on the response from your server
      }
    }
  };

  return (
    <Box height="90vh" display="flex" justifyContent="center" alignItems="center" marginTop="100px" marginBottom="100px" >
      <Card sx={{ width: 550, height: 820, justifyContent: "center", borderRadius: 12, backgroundColor: '#d7dce2',fontFamily:'Times New Roman, Times, serif' }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" style={{ textAlign: 'center', padding: 5, marginTop: 10,fontFamily:'Times New Roman, Times, serif' }}>Sign Up Here</Typography>
          <Typography gutterBottom variant="h6" component="div" style={{ textAlign: 'center',fontFamily:'Times New Roman, Times, serif' }}>Experience An Exquisite On A Click </Typography><br></br>
          <Box md={2}>
            <Typography gutterBottom variant="subtitle1"sx={{fontFamily:'Times New Roman, Times, serif'}}>
              User Name:
            </Typography>
            <TextField
              required
              error={errors.userNameError}
              id="outlined-required"
              label="Enter Your User Name"
              fullWidth
              helperText={errors.userNameHelperText}
              value={formData.userName}
              onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
            />
          </Box><br></br>
          <Box mb={2}>
            <Typography gutterBottom variant="subtitle1" sx={{fontFamily:'Times New Roman, Times, serif'}}>
              E-mail:
            </Typography>
            <TextField
              required
              error={errors.emailError}
              id="outlined-required"
              label="Enter Your Email"
              type="email"
              fullWidth
              helperText={errors.emailHelperText}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </Box>
          <Box md={2}>
            <Typography gutterBottom variant="subtitle1"sx={{fontFamily:'Times New Roman, Times, serif'}}>
              Phone Number:
            </Typography>
            <TextField
              required
              error={errors.phoneNumberError}
              id="outlined-required"
              label="Enter Your Phone number"
              fullWidth
              helperText={errors.phoneNumberHelperText}
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            />
          </Box><br></br>
          <Box mb={2}>
            <Typography gutterBottom variant="subtitle1" sx={{fontFamily:'Times New Roman, Times, serif'}}>
              Password:
            </Typography>
            <TextField
              required
              error={errors.passwordError}
              id="outlined-password-input"
              label="Password"
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
        <Typography gutterBottom variant="subtitle2" style={{ textAlign: 'center',fontFamily:'Times New Roman, Times, serif'}}>
            <Button size="large" variant="contained" style={{ backgroundColor: '#000080' }} onClick={handleSubmit}>Sign Up</Button>
            </Typography>
          </Box>
        </CardActions>
        <Typography gutterBottom variant="subtitle2" style={{ textAlign: 'center', }}>
          By signing up you agree to our Terms Of Service and Privacy Policy
        </Typography>
        <FormGroup>
          <FormControlLabel control={<Checkbox />} style={{ justifyContent: 'center' }} label="Email me with offers and updates" />
        </FormGroup>
      </Card>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </Box>
  );
}

export default SignUp;
