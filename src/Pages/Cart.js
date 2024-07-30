import React, { useState, useEffect } from 'react';
import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
 
function Cart() {
  const navigate = useNavigate();
  const [openAddToCart, setOpenAddToCart] = React.useState(false);
  const [openConfirmBooking, setOpenConfirmBooking] = React.useState(false);
  const {jwt, setJwt } = useAuth();
  const [disabledStatus, setDisabledStatus] = useState({});
  const [addedStatus, setAddedStatus] = useState({});
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
  const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": 'application/json'
    }, // Change this to your actual backend URL
  });
  const [carddata, setcarddata] = useState([]);
 
  useEffect(() => {
    if (!jwt) {
      localStorage.removeItem(`disabledStatus-${jwt}`);
      setDisabledStatus({});
    } else {
      const savedDisabledStatus = JSON.parse(localStorage.getItem(`disabledStatus-${jwt}`));
      if (savedDisabledStatus) {
        setDisabledStatus(savedDisabledStatus);
      }
    }
 
    api.get('/service/getAllServices')
      .then((response) => {
        console.log(response.data);
        setcarddata(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [jwt]);
 
  const handleProceedToInvoice = async () => {
    setOpenConfirmBooking(true);
    setTimeout(() => {
      navigate('/confirmbooking');
    }, 500);
  }
  const handleAddToCart = async (service_ID) => {
    try {
      setOpenAddToCart(true);
      console.log(service_ID);
      setDisabledStatus(prevStatus => {
        const newStatus = { ...prevStatus, [service_ID]: true };
        localStorage.setItem(`disabledStatus-${jwt}`, JSON.stringify(newStatus));
        return newStatus;
      });
      setAddedStatus(prevStatus => ({ ...prevStatus, [service_ID]: true }));
      const response = await api.post('/cart/addService', service_ID); // Corrected the payload
      console.log('Added successfully!', response.data);
    } catch (error) {
      alert('Could not add!');
      console.error('Registration failed:', error);
      // Handle error (e.g., display error message)
    }
  };
 
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAddToCart(false);
    setOpenConfirmBooking(false);
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
      <h1 style={{ color: 'black', justifyContent: 'center', marginTop: '75px' }}> Services Offered</h1>
      <p style={{ textAlign: 'center', fontSize: 'x-large', color: 'black', justifyContent: 'center', marginTop: '50px' }}>
      From Oil Changes to Brake Repairs – We’ve Got You Covered.
      </p>
      <br></br>
      <Grid container Spacing={2}>
        {carddata.map((item) => (
          <Grid item xs={11} sm={6} key={item.service_ID} >
            <Card sx={{borderRadius:15,p:2,px:5,mb:5, marginLeft: 6, width: 550, height: 250,backgroundColor:'#F2F3F4',fontFamily:'Times New Roman, Times, serif' }}>
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
              <Button
                disabled={disabledStatus[item.service_ID]}
                size="small"
                variant='contained'
                style={{height:'35px',width:"171px", backgroundColor: disabledStatus[item.service_ID] ? '#D3D3D3' : '#000080', fontFamily:'Times New Roman, Times, serif', color: disabledStatus[item.service_ID] ? '#000000' : '#ffffff' }}
                onClick={() => handleAddToCart(item.service_ID)}
              >
                <ShoppingCartIcon /> {disabledStatus[item.service_ID] ? 'Added to Cart' : 'Add to Cart'}
              </Button>
              </CardActions>
            </Card>
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
      <CardActions style={{ justifyContent: 'center' }}>
        <Button size="large" variant='contained' style={{ height:'35px',width:"171px", color:'white',backgroundColor: '#008b8b',fontFamily:'Times New Roman, Times, serif' }} onClick={handleProceedToInvoice}>
        View Cart
        </Button>
        <Snackbar
        severity="success"
        open={openConfirmBooking}
        autoHideDuration={2000}
        onClose={handleClose}
        message="View the items in your cart"
        action={action}
      />
      </CardActions>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}
 
export default Cart;