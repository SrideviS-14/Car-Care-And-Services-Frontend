import * as React from 'react';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Grow from '@mui/material/Grow';
import FormControlLabel from '@mui/material/FormControlLabel';
import  { useState, useEffect } from 'react';
import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import { motion } from 'framer-motion';

export const getServiceNameById = (serviceId, carddata) => {
  const service = carddata.find(item => item.service_ID === serviceId);
  return service ? service.service_Name : null;
};

function Cart() {
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  const navigate = useNavigate();
  const [openAddToCart, setOpenAddToCart] = React.useState(false);
  const {jwt, setJwt} = useAuth(); // Assuming currentUser is available in AuthContext
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
  const [data, setdata] = useState();
  const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": 'application/json'
    },
  });
  const [addedStatus, setAddedStatus] = useState({});
  const getServiceNameById = (serviceId) => getServiceNameById(serviceId, carddata);
  useEffect(() => {
    api.get('/account/profile')
      .then((response) => {
        console.log(response.data);
        setdata(response.data.User);
        setAddedStatus(JSON.parse(localStorage.getItem(`disabled-${jwt}`)) || {});
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
 
  const [carddata, setcarddata] = useState([]);
  

  useEffect(() => {
    api.get('/service/getAllServices')
      .then((response) => {
        console.log(response.data);
        setcarddata(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [jwt]);
 
  const handleAddToCart = async (service_ID) => {
    try {
      setOpenAddToCart(true);
      console.log(service_ID);
      setAddedStatus(prevStatus => {
        const newStatus = { ...prevStatus, [service_ID]: true };
        localStorage.setItem(`disabled-${jwt}`, JSON.stringify(newStatus));
        return newStatus;
      });
      const response = await api.post('/cart/addService', service_ID);
      console.log('Added successfully!', response.data);
    } catch (error) {
      alert('Could not add!');
      console.error('Registration failed:', error);
    }
  };
 
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAddToCart(false);
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
   return (
    <div style={{ fontFamily: 'Times New Roman, Times, serif' }}>
      <h1 style={{ color: 'black', justifyContent: 'center', marginTop: '35px' }}> Services Offered</h1>
      <p style={{ textAlign: 'center', fontSize: 'x-large', color: 'black', justifyContent: 'center', marginTop: '30px' }}>
      From Oil Changes to Brake Repairs – We’ve Got You Covered.
      </p>
      <br></br>
      <Grid container Spacing={2}>
        {carddata.map((item) => (
          <Grid item xs={11} sm={6} key={item.service_ID} >
            <Grow in={true} timeout={1000}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}> 
              <Card sx={{borderRadius:15,p:2,px:5,mb:5, marginLeft: 7, width: 550, height: 250,backgroundColor:'#F2F3F4',fontFamily:'Times New Roman, Times, serif' }}>
                <CardContent>
                  <br></br>
                  <Typography variant="h5" component="div"style={{fontWeight:'bolder',fontFamily:'Times New Roman, Times, serif'}}>
                    {item.service_Name}
                  </Typography>
                  <Typography color="text.secondary" style={{fontWeight:'bolder',fontFamily:'Times New Roman, Times, serif',color:'black',fontSize:'x-large',textAlign:'right',fontFamily:'Times New Roman, Times, serif'}}>
                    ₹{item.service_Amount}
                  </Typography>
                  <br></br>
                  <Typography variant="body2">
                    {item.description}
                  </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: 'center' }}>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}> 
                <Button
                  size="small"
                  variant='contained'
                  style={{height:'35px',width:"171px", backgroundColor: addedStatus[item.service_ID] ? '#801818 ' : '#bc0808', fontFamily:'Times New Roman, Times, serif', color:  '#ffffff' }}
                  onClick={() => addedStatus[item.service_ID] ? navigate('/confirmbooking') : handleAddToCart(item.service_ID)}
                >
                  <ShoppingCartIcon /> {addedStatus[item.service_ID] ? 'View in Cart' : 'Add to Cart'}
                </Button>
                </motion.div> 
                </CardActions>
              </Card>
              </motion.div> 
            </Grow>
          </Grid>
        ))}
        <Snackbar
        severity="success"
        open={openAddToCart}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Added To Cart Successfully"
        action={action}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
      </Grid>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}
export default Cart;