import React, { useState, useEffect } from 'react';
import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
function Cart() {
  const navigate = useNavigate();
  const {jwt, setJwt } = useAuth();
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
    api.get('/service/getAllServices')
      .then((response) => {
        console.log(response.data);
        setcarddata(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleProceedToInvoice = async () => {
      navigate('/confirmbooking');
  }
  const handleAddToCart = async (service_ID) => {
    try {
      console.log(service_ID);
      const response = await api.post('/cart/addService', service_ID); // Corrected the payload
      console.log('Added successfully!', response.data);
    } catch (error) {
      alert('Could not add!');
      console.error('Registration failed:', error);
      // Handle error (e.g., display error message)
    }
  };
  
 
  return (
    <div style={{ fontFamily: 'Times New Roman, Times, serif' }}>
      <br></br>
      <br></br>
      <Typography variant="h4" align="center" gutterBottom>
        Service Offered
      </Typography>
      <Grid container spacing={1}>
        {carddata.map((item) => (
          <Grid item xs={11} sm={6} key={item.service_ID}>
            <Card sx={{ m: 2, marginLeft: 15, width: 550, height: 250,backgroundColor: '#d7dce2' }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {item.service_Name}
                </Typography>
                <Typography color="text.secondary" style={{color:'black',fontWeight:'bolder',fontSize:'x-large',marginLeft:'370px'}}>
                  ₹{item.service_Amount}
                </Typography>
                <br></br>
                <Typography variant="body2">
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions style={{ justifyContent: 'center' }}>
                <Button size="small" variant='contained' style={{ backgroundColor: '#000080' }} onClick={() => handleAddToCart(item.service_ID)}>
                  <ShoppingCartIcon /> Add To Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <br></br>
      <CardActions style={{ justifyContent: 'center' }}>
        <Button size="large" variant='contained' style={{ backgroundColor: '#000080' }} onClick={handleProceedToInvoice}>
         Confirm Booking
        </Button>
      </CardActions>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}

export default Cart;