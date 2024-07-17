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

  const handleConfirmBooking = async () => {
    try {
      const response = await api.get('/cart/getServices'); // Corrected the payload
      alert('booking confirmed');
      navigate('/confirmBooking');
      console.log('Added successfully!', response.data);
    } catch (error) {
      alert('Could not add!');
      console.error('Registration failed:', error);
      // Handle error (e.g., display error message)
    }
  }
  const handleAddToCart = async (service_ID) => {
    try {
      console.log(service_ID);
      const response = await api.post('/cart/addService', service_ID); // Corrected the payload
      alert('added successfully');
      console.log('Added successfully!', response.data);
    } catch (error) {
      alert('Could not add!');
      console.error('Registration failed:', error);
      // Handle error (e.g., display error message)
    }
  };
  

  return (
    <div>
      <br />
      <br />
      <Typography style={{ fontSize: 'xx-large', justifyContent: 'center', textAlign: 'center' }}>
        Service Offered
      </Typography>
      <br />
      <br />
      <Grid container spacing={2} style={{ display: 'grid', justifyContent: 'center' }}>
        {carddata.map((item) => (
          <Grid item key={item.service_ID}>
            <Card style={{ justifyContent: 'center', width: '900px', height: '280px', borderRadius: '5', backgroundColor: '#d7dce2' }}>
              <CardContent style={{ fontSize: 'x-Large', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: 'xx-large', fontWeight: 'bold' }}>{item.service_Name}</div>
                <div style={{ textAlign: 'right' }}>₹{item.service_Amount}</div>
                <br />
                <div style={{ textAlign: 'left' }}>{item.description}</div>
                <br />
                <CardActions style={{ justifyContent: 'flex-end', marginBottom:19}}>
                <Button

  size="medium"
  variant="contained"
  style={{ backgroundColor: '#000080',marginBottom:50 }}
  onClick={() => handleAddToCart(item.service_ID)} // Corrected the onClick handler
>
  <ShoppingCartIcon /> Add To Cart
</Button>

                </CardActions>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <br />
        <Button size='medium' variant='contained' style={{ backgroundColor: '#000080' }}
              onClick={() => handleConfirmBooking()} >Confirm Booking</Button>
      </Grid>
    </div>
  );
}

export default Cart;
