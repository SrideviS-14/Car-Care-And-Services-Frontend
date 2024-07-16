import { Box,Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function About()
{    
    return (
      <div>
        <Card sx={{ display: 'flex', maxWidth: 900,marginLeft:16,marginTop:12 }}>
  <CardMedia
    sx={{ width: 1000, height: 500 }}
    image={'https://www.autokonig.com/wp-content/uploads/2020/02/Untitled.jpg'}
    title="Car Repair"
  />
  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <CardContent>
      <Typography gutterBottom variant="h4" component="div">
        Our Service Promise
      </Typography>
      <Typography variant="body1" color="text.secondary">
      Customer satisfaction is the measure of our success. Our unique service promises mean commitment to finding the best possible solution to any problem.
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Book A service</Button>
    </CardActions>
  </Box>
  </Card>
  <Typography variant="h4" component='div'>
  Enjoy the benefits of our world-class services
  </Typography>
  <Typography variant="h5"><Button style={{color:'black'}}><KeyboardArrowDownIcon /></Button>Outstanding Quality</Typography>
  <Typography variant="h5"><Button style={{color:'black'}}><KeyboardArrowDownIcon /></Button>Broad-based and Comprehensive</Typography>
  <Typography variant="h5"><Button style={{color:'black'}}><KeyboardArrowDownIcon /></Button>Fair and Reasonable</Typography>
  <Typography variant="h5"><Button style={{color:'black'}}><KeyboardArrowDownIcon /></Button>Personal and Committed</Typography>
      </div>
    );
  }
  
  export default About;