import {Grid,Card,CardContent,Typography,Box,TextField, CardActions, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
function CarDetails(){
    const navigate = useNavigate();
    const handlesubmit = () => {
        navigate('/login');
        }
    return(
        <div>
            <Box sx={{justifyContent:"center"  ,marginTop:"20px"}}>
            <Card sx={{marigntop:'50px',marginLeft:'500px',width:'470px', height:'700px',justifyContent: "center", borderRadius: 12, backgroundColor: '#d7dce2' }}>
<Grid spacing={2} sx={{marginLeft:'5px',marginTop:'30px'}}>
<Grid  spacing={2}>
    <Typography variant='h6' sx={{textAlign:'center',fontWeight:'bolder'}}>Please Type Out Car Details</Typography>
<CardContent>
  <Box md={2}>
  <Typography gutterBottom variant="subtitle1">
    Car Number
    </Typography>
    <TextField
      required
      id="outlined-required"
      label="Enter Your Car Number"
      fullWidth
    />
  </Box>
  <br></br>
  <Box md={2}>
  <Typography gutterBottom variant="subtitle1">
    Car Model
    </Typography>
    <TextField
      required
      id="outlined-required"
      label="Enter Your Car Model"
      fullWidth
    />
  </Box>
  <br></br>
  <Box md={2}>
  <Typography gutterBottom variant="subtitle1">
    Car Company
    </Typography>
    <TextField
      required
      id="outlined-required"
      label="Enter Your Car Company"
      fullWidth
    />
  </Box>
  <br></br>
  <Box md={2}>
  <Typography gutterBottom variant="subtitle1">
    Car Type
    </Typography>
    <TextField
      required
      id="outlined-required"
      label="Enter Your Car Type"
      fullWidth
    />
    </Box>
  <br></br>
  <Box md={2}>
  <Typography gutterBottom variant="subtitle1">
    Car Colour
    </Typography>
    <TextField
      required
      id="outlined-required"
      label="Enter Your Car Colour"
      fullWidth
    />
  </Box>
  </CardContent>
  <CardActions sx={{justifyContent:'center'}}>
    <Button size='large' variant='contained'onClick={handlesubmit} style={{alignContent:'center',backgroundColor: '#000080' }}>Submit</Button>
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