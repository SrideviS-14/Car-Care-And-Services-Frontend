import { Grid,Box,Button, Card, CardActions, CardContent, CardMedia,Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AnimatedCard from "./AnimatedCard.js";
import AnimatedText from "./AnimatedText.js";
function About()
{    
  const navigate = useNavigate();
  const handlebutton = () =>{
    navigate('/service')
  } 
  const benefits = [
    "Outstanding Quality",
    "Broad-based and Comprehensive",
    "Fair and Reasonable",
    "Personal and Committed"
  ];

    return (
      <div>
         
        <AnimatedCard index={0}>
        <Card sx={{ backgroundColor:'#F2F3F4',borderRadius:10,display: 'flex',fontFamily:'Times New Roman, Times, serif', maxWidth: 1100,marginLeft:23,marginTop:12 }}>
  <CardMedia
    sx={{ width: 1000, height: 500 }}
    image={'https://www.autokonig.com/wp-content/uploads/2020/02/Untitled.jpg'}
    title="Car Repair"
  />
  <Box sx={{ padding:'20px', display: 'flex', padding:'10px',flexDirection: 'column', justifyContent: 'center' }}>
    <CardContent>
      <Typography gutterBottom variant="h3" component="div" style={{fontFamily:'Times New Roman, Times, serif'}}>
        Our Service Promise
      </Typography>
      <Typography variant="h5" color="text.secondary" style={{fontFamily:'Times New Roman, Times, serif',textAlign:'justify'}}>
      Customer satisfaction is the measure of our success. Our unique service promises mean commitment to finding the best possible solution to any problem.
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="large" sx={{height:'35px',width:"171px",
    backgroundColor: '#bc0808',color:'white',fontFamily:'Times New Roman, Times, serif'
    ,'&:hover': {
      bgcolor: '#b0c4de',
    }}}onClick={handlebutton}>Book A service</Button>
    </CardActions>
  </Box>
  </Card>
  </AnimatedCard>
  <br></br>
  <br></br>
  <br></br>
  <AnimatedCard index={1}>
  <Card sx={{ padding:'10px',fontFamily:'Times New Roman, Times, serif',backgroundColor:'#F2F3F4',borderRadius:10,marginLeft:23,display: 'flex', flexDirection: 'row', fontFamily: 'Times New Roman, Times, serif', width: 1100,height:585 }}>
  <Grid container>
          <Grid item xs={12} md={6}>
            <CardContent>
  <Typography variant="h4" style={{fontFamily:'Times New Roman, Times, serif',textAlign:'center'}}>Our History</Typography>
  <br></br>
  <Typography variant="h6" component='div' style={{padding:'10px',fontFamily:'Times New Roman, Times, serif',justifyContent:'center',textAlign:'justify'}}>For a century, SF Car Care and Services has been a beacon of excellence in the automotive service industry. With a vast network of over 15,000 dedicated workshops spanning more than 150 nations, our journey began on January 1, 1921, when the esteemed Max Eisenmann & Co in Hamburg was honored as the “Official Installation and Repair Workshop of SF Car Care and Services.”</Typography>
  <br></br>
  <br></br>
  </CardContent>
  </Grid>
  <Grid item xs={12} md={6}>
  <CardMedia sx={{ marginRight:35,width: 800, height: 585 }}
    image={'https://tse4.mm.bing.net/th/id/OIP.9SFkL2rMuOuZeA5sv8xClgHaE8?w=292&h=195&c=7&r=0&o=5&dpr=1.3&pid=1.7'}
    title="Car Repair">
  </CardMedia>
  </Grid>
  </Grid>
  </Card>
  </AnimatedCard>
  <br></br>
  <br></br>
  <AnimatedCard index={2}>
  <Card sx={{fontFamily:'Times New Roman, Times, serif',backgroundColor:'#F2F3F4',borderRadius:10,marginLeft:23,display: 'flex', flexDirection: 'row-reverse', fontFamily: 'Times New Roman, Times, serif', maxWidth: 1100, }}>
  <Grid container>
  <Grid item xs={12} md={6}>
    <CardMedia
    sx={{ width: 550, height: 500 }}
    image={'https://as1.ftcdn.net/v2/jpg/03/14/27/54/1000_F_314275459_ePzHi4T8mbZjzPmRW1pEkbL7VzOI8gid.jpg'}
    title="Car Repair">
    </CardMedia>
    </Grid>
          <Grid item xs={12} md={6}>
            <CardContent > 
  <Typography variant="h4" style={{fontFamily:'Times New Roman, Times, serif',padding:'10px',textAlign:'center'}}>Celebrating 100 Years of SF Car Care and Services</Typography>
  <br></br>
  <Typography variant="h6" component='div'style={{fontFamily:'Times New Roman, Times, serif',padding:'10px',justifyContent:'center',textAlign:'justify'}}>Your car’s best friend The motto “Your car’s best friend” encapsulates our brand promise, reverberating through the entirety of SF Car Care and Services. Over the past century, we have evolved into a comprehensive workshop network, offering vehicle owners superior maintenance, repair, and diagnostic services.</Typography>
  <br></br>
  </CardContent>
          </Grid>
        </Grid>
      </Card>
      </AnimatedCard>
  <br></br>
  <br></br>
      </div>
    );
  }
 
  export default About;