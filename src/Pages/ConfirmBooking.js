import React, { useState, useEffect } from 'react';
import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
function ConfirmBooking() {
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
  const handleRemoveService = async (serviceId) => {
    try {
      const response = await api.post('/cart/removeService', serviceId);
      setcarddata(carddata.filter(item => item.service_ID !== serviceId));
      console.log('Successful', response.data);
  } catch (error) {
      alert("Cannot remove");
      console.error('Failed');
  }
  }
  const navigate = useNavigate();
  const handleAddService = async () => {
    navigate('/cart');
  }
  const handleInvoice = async () => {
    navigate('/invoice');
  }
  return (
    <div>
      <br />
      <br />
      <Typography style={{ fontSize: 'xx-large', justifyContent: 'center', textAlign: 'center' ,fontFamily:'Times New Roman, Times, serif'}}>
        Service Selected
      </Typography>
      <br />
      <br />
      {carddata.map((item) => (
        <>
  <Grid  container spacing={3}item key={item.service_ID}>
    <Card style={{ marginLeft:'320px',justifyContent: 'center', width: '900px', height: '290px', borderRadius: '5', backgroundColor: '#d7dce2',fontFamily:'Times New Roman, Times, serif' }}>
      <CardContent style={{ fontSize: 'x-Large', flexDirection: 'column',fontFamily:'Times New Roman, Times, serif' }}>
        <div style={{ fontSize: 'xx-large', fontWeight: 'bold',fontFamily:'Times New Roman, Times, serif' }}>{item.service_Name}</div>
        <div style={{ textAlign: 'right',fontFamily:'Times New Roman, Times, serif' }}>₹{item.service_Amount}</div>
        <br />
        <div style={{ textAlign: 'left',fontFamily:'Times New Roman, Times, serif' }}>{item.description}</div>
        <br />
        <CardActions style={{ justifyContent: 'flex-end',fontFamily:'Times New Roman, Times, serif' }}>
          <Button size='medium' variant='outlined' style={{ margin: '5px',fontFamily:'Times New Roman, Times, serif' }}
            onClick={() => handleRemoveService(item.service_ID)}><DeleteIcon />  Remove</Button>
        </CardActions>
      </CardContent>
    </Card>
  </Grid>
  <br></br>
  <br></br>
  </>
))}
<br></br>
        <CardActions style={{alignContent:'center',justifyContent:'center'}}>
        <Button size='medium' variant='contained' style={{ backgroundColor: '#000080' }}
              onClick={() => handleAddService()} >Add Service</Button>
        <Button size='medium' variant='contained' style={{ backgroundColor: '#000080' }}
              onClick={() => handleInvoice()} >Proceed To Invoice</Button>
</CardActions>
<br></br>
<br></br>
    </div>
  );
}
 
export default ConfirmBooking;