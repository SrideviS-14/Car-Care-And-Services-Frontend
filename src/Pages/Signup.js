import React from "react";
import  { Button, Card,CardActions,CardContent, Typography,TextField,Box } from "@mui/material";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
function SignUp()
{
return (
    <Box height="90vh" display="flex" justifyContent="center" alignItems="center" marginTop="20px">
    <Card sx={{width:550,height:700,justifyContent:"center",borderRadius:12,backgroundColor:'#d7dce2'}}>
        <CardContent>
        <Typography gutterBottom variant="h5" component="div"style={{textAlign:'center',padding:5,marginTop:10}}>Sign Up Here</Typography>
        <Typography gutterBottom variant="h6" component="div"style={{textAlign:'center'}}>Experience An Exquisite On A Click </Typography><br></br>
        <Box mb={2}>
            <Typography gutterBottom variant="subtitle1">
              E-mail:
            </Typography>
            <TextField
              required
              id="outlined-required"
              label="Enter Your Email"
              fullWidth
            />
          </Box>
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
            />
          </Box>
          <Box md={2}>
          <Typography gutterBottom variant="subtitle1">
              Name:
            </Typography>
            <TextField
              required
              id="outlined-required"
              label="Enter Your Name"
              fullWidth
            />
          </Box><br></br>
          <Box md={3}>
          <Typography gutterBottom variant="subtitle1">
            Phone Number:
            </Typography>
            <TextField
              required
              id="outlined-required"
              label="Enter Your Phoneno"
              fullWidth
            />
          </Box>
        </CardContent>
        <CardActions>
            <Box width="100%" display="flex" justifyContent="center">
            <Button size="large" variant="contained"style={{backgroundColor:'#126cfc'}} >Sign Up</Button>
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