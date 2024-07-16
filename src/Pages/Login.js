import React from "react";
import  { Button, Card,CardActions,CardContent, Typography,TextField,Box } from "@mui/material";
function Login()
{
return (

<div>
    <Box height="90vh" display="flex" justifyContent="center" alignItems="center">
    <Card sx={{width:500,backgroundColor:'#d7dce2',height:450,justifyContent:"center",borderRadius:12}}>
        <CardContent>
        <Typography gutterBottom variant="h5" component="div"style={{textAlign:'center'}}>Login In Here</Typography>
        <Typography gutterBottom variant="h6" component="div"style={{textAlign:'center'}}>Book Your Service In A Click </Typography><br></br>
        <Box mb={2}>
            <Typography gutterBottom variant="subtitle1">
              Enter your E-mail:
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
              Enter your Password:
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
        </CardContent>
        <CardActions>
            <Box width="100%" display="flex" justifyContent="center">
            <Button size="large" variant="contained" style={{marginRight:15,backgroundColor:'#126cfc'}}>Forgot Password</Button>
            <Button size="large" variant="contained"style={{backgroundColor:'#126cfc'}} >Login In</Button>
            </Box>
        </CardActions>
        </Card>
        </Box>
    </div>
);
}
export default Login;