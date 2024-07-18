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
      navigate('/invoice');
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
      <br />
      <br />
      <Typography style={{ fontFamily:'Times New Roman, Times, serif',fontSize: 'xx-large', justifyContent: 'center', textAlign: 'center' }}>
        Service Offered
      </Typography>
      <br />
      <br />
      <Grid container spacing={2} style={{ flexDirection: 'row',fontFamily:'Times New Roman, Times, serif', display: 'grid', justifyContent: 'center' }}>
        {carddata.map((item) => (
          <Grid item key={item.service_ID}>
            <Card style={{fontFamily:'Times New Roman, Times, serif',justifyContent: 'center', width: '900px', height: '280px', borderRadius: '5', backgroundColor: '#d7dce2' }}>
              <CardContent style={{ fontSize: 'x-Large', display: 'flex', flexDirection: 'column' }}>
                <div style={{fontFamily:'Times New Roman, Times, serif', fontSize: 'xx-large', fontWeight: 'bold' }}>{item.service_Name}</div>
                <div style={{fontFamily:'Times New Roman, Times, serif', textAlign: 'right' }}>₹{item.service_Amount}</div>
                <br />
                <div style={{fontFamily:'Times New Roman, Times, serif', textAlign: 'left' }}>{item.description}</div>
                <br />
                <CardActions style={{ 
                  fontFamily:'Times New Roman, Times, serif',justifyContent: 'flex-end', marginBottom:19}}>
                <Button size="medium" variant="contained" style={{ backgroundColor: '#000080',marginBottom:50 }}onClick={() => handleAddToCart(item.service_ID)}>
<ShoppingCartIcon /> Add To Cart
</Button>
                </CardActions>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <br />
      </Grid>
      <CardActions style={{alignContent:'center',justifyContent:'center'}}>
      <Button size='medium' variant='contained' style={{alignContent:'center',justifyContent:'center',backgroundColor: '#000080' }}
              onClick={() => handleProceedToInvoice()} >Proceed To invoice</Button>
        </CardActions>
    </div>
  );
}

export default Cart;
