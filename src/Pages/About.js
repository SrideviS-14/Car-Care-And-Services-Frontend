import { Grid,Box,Button, Card, CardActions, CardContent, CardMedia,Typography} from "@mui/material";
function About()
{    
 
    return (
      <div>
        <Card sx={{ backgroundColor:'#d7dce2',borderRadius:10,display: 'flex',fontFamily:'Times New Roman, Times, serif', maxWidth: 1100,marginLeft:23,marginTop:12 }}>
  <CardMedia
    sx={{ width: 1000, height: 500 }}
    image={'https://www.autokonig.com/wp-content/uploads/2020/02/Untitled.jpg'}
    title="Car Repair"
  />
  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <CardContent>
      <Typography gutterBottom variant="h3" component="div" style={{fontFamily:'Times New Roman, Times, serif'}}>
        Our Service Promise
      </Typography>
      <Typography variant="h6" color="text.secondary" style={{fontFamily:'Times New Roman, Times, serif'}}>
      Customer satisfaction is the measure of our success. Our unique service promises mean commitment to finding the best possible solution to any problem.
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="large" sx={{
    color: '#000080',
    '&:hover': {
      bgcolor: '#b0c4de',
    }}}>Book A service</Button>
    </CardActions>
  </Box>
  </Card>
  <br></br>
  <br></br>
  <br></br>
  <Card sx={{ fontFamily:'Times New Roman, Times, serif',backgroundColor:'#d7dce2',borderRadius:10,marginLeft:23,display: 'flex', flexDirection: 'row', fontFamily: 'Times New Roman, Times, serif', width: 1100,height:700 }}>
  <Grid container>
          <Grid item xs={12} md={6}>
            <CardContent>
  <Typography variant="h4" style={{fontFamily:'Times New Roman, Times, serif',textAlign:'center'}}>Our History</Typography>
  <br></br>
  <Typography variant="h6" component='div' style={{fontFamily:'Times New Roman, Times, serif',justifyContent:'center'}}>For a century, SF Car Care and Services has been a beacon of excellence in the automotive service industry. With a vast network of over 15,000 dedicated workshops spanning more than 150 nations, our journey began on January 1, 1921, when the esteemed Max Eisenmann & Co in Hamburg was honored as the “Official Installation and Repair Workshop of SF Car Care and Services.”</Typography>
  <br></br>
  <Typography variant="h6" component='div' style={{fontFamily:'Times New Roman, Times, serif',justifyContent:'center'}}>Our network comprises select garages that not only meet but often surpass the rigorous standards set by SF Car Care. These establishments are fueled by a fervent love for automobiles and a commitment to delivering top-notch service. The founding ethos of SF Car Care, rooted in unwavering quality and customer-centricity, has ensured that these high standards permeate every facet of our operations.</Typography>
  <br></br>
  <Typography variant="h6" component='div'style={{fontFamily:'Times New Roman, Times, serif',justifyContent:'center'}}>Each of our garages operates under the stewardship of passionate and ambitious individuals, who consistently uphold and advance the quality benchmarks established by SF Car Care.</Typography>
  <br></br>
  </CardContent>
  </Grid>
  <Grid item xs={12} md={6}>
  <CardMedia sx={{ width: 550, height: 700 }}
    image={'https://tse4.mm.bing.net/th/id/OIP.9SFkL2rMuOuZeA5sv8xClgHaE8?w=292&h=195&c=7&r=0&o=5&dpr=1.3&pid=1.7'}
    title="Car Repair">
  </CardMedia>
  </Grid>
  </Grid>
  </Card>
  <br></br>
  <br></br>
  <Card sx={{fontFamily:'Times New Roman, Times, serif',backgroundColor:'#d7dce2',borderRadius:10,marginLeft:23,display: 'flex', flexDirection: 'row-reverse', fontFamily: 'Times New Roman, Times, serif', maxWidth: 1100, }}>
  <Grid container>
  <Grid item xs={12} md={6}>
    <CardMedia
    sx={{ width: 550, height: 500 }}
    image={'https://as1.ftcdn.net/v2/jpg/03/14/27/54/1000_F_314275459_ePzHi4T8mbZjzPmRW1pEkbL7VzOI8gid.jpg'}
    title="Car Repair">
    </CardMedia>
    </Grid>
          <Grid item xs={12} md={6}>
            <CardContent> 
  <Typography variant="h4" style={{fontFamily:'Times New Roman, Times, serif',textAlign:'center'}}>Celebrating 100 Years of SF Car Care and Services</Typography>
  <br></br>
  <Typography variant="h6" component='div'style={{fontFamily:'Times New Roman, Times, serif',justifyContent:'center'}}>Your car’s best friend The motto “Your car’s best friend” encapsulates our brand promise, reverberating through the entirety of SF Car Care and Services. Over the past century, we have evolved into a comprehensive workshop network, offering vehicle owners superior maintenance, repair, and diagnostic services.</Typography>
  <br></br>
  </CardContent>
          </Grid>
        </Grid>
      </Card>
  <br></br>
  <br></br>
  <Typography variant="h4" component='div'style={{justifyContent:'center',fontFamily:'Times New Roman, Times, serif',textAlign:'center'}}>
  Enjoy the benefits of our world-class services
  </Typography>
  <ul>
  <li><Typography variant="h5" style={{fontFamily:'Times New Roman, Times, serif',textAlign:'left'}}><Button style={{color:'black'}}></Button>Outstanding Quality</Typography></li>
  <li><Typography variant="h5" style={{fontFamily:'Times New Roman, Times, serif',textAlign:'left'}}><Button style={{color:'black'}}></Button>Broad-based and Comprehensive</Typography></li>
  <li><Typography variant="h5" style={{fontFamily:'Times New Roman, Times, serif',textAlign:'left'}}><Button style={{color:'black'}}></Button>Fair and Reasonable</Typography></li>
  <li><Typography variant="h5" style={{fontFamily:'Times New Roman, Times, serif',textAlign:'left'}}><Button style={{color:'black'}}></Button>Personal and Committed</Typography></li>
  </ul>
  <br></br>
      <br></br>
      <br></br>
      </div>
    );
  }
 
  export default About;