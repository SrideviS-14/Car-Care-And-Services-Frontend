import React, { useState, useEffect } from 'react';
import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useAuth } from './AuthContext';

function Cart() {
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
    api.get('/cart/getServices')
      .then((response) => {
        console.log(response.data);
        setcarddata(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handlePayment = async () => {
    console.log("Payment button clicked");
  }
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
            <Card style={{ justifyContent: 'center', width: '900px', height: '250px', borderRadius: '5', backgroundColor: '#d7dce2' }}>
              <CardContent style={{ fontSize: 'x-Large', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: 'xx-large', fontWeight: 'bold' }}>{item.service_Name}</div>
                <div style={{ textAlign: 'right' }}>₹{item.service_Amount}</div>
                <br />
                <div style={{ textAlign: 'left' }}>{item.description}</div>
                <br />
                <CardActions style={{ justifyContent: 'flex-end' }}>
                </CardActions>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <br />
        <Button size='medium' variant='contained' style={{ backgroundColor: '#000080' }}
              onClick={() => handlePayment()} >Proceed To Pay</Button>
      </Grid>
    </div>
  );
}

export default Cart;
