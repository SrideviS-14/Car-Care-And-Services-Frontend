import React, { useState, useEffect } from 'react';
import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';

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
  const [openRemove, setOpenRemove] = useState(false);
  const [openInvoice, setOpenInvoice] = useState(false);
 
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
      setOpenRemove(true);
 
      // Enable the button for this service in localStorage
      const savedDisabledStatus = JSON.parse(localStorage.getItem(`disabledStatus-${jwt}`));
      if (savedDisabledStatus) {
        savedDisabledStatus[serviceId] = false;
        localStorage.setItem(`disabledStatus-${jwt}`, JSON.stringify(savedDisabledStatus));
      }
    } catch (error) {
      alert("Cannot remove");
      console.error('Failed');
    }
  };
 
 
  const navigate = useNavigate();
  const handleAddService = async () => {
    navigate('/cart');
  }
  const handleInvoice = async () => {
    setOpenInvoice(true);
    setTimeout(() => {
        navigate('/cardetails');
      }, 1000);
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenRemove(false);
    setOpenInvoice(false);
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
    <div>
      <br />
      <br />
      <h1 style={{ color: 'black', justifyContent: 'center', marginTop: '50px' }}> Services Selected</h1>
      <p style={{ textAlign: 'center', fontSize: 'x-large', color: 'black', justifyContent: 'center', marginTop: '55px' }}>
      View the Services you have selected
      </p>
      <br />
      <br />
      {carddata.map((item) => (
        <>
  <Grid  container spacing={3}item key={item.service_ID}>
    <Card style={{ marginLeft:'320px',justifyContent: 'center', width: '900px', height: '290px', borderRadius: '5', backgroundColor: '#F2F3F4',fontFamily:'Times New Roman, Times, serif' }}>
      <CardContent style={{ fontSize: 'x-Large', flexDirection: 'column',fontFamily:'Times New Roman, Times, serif' }}>
        <div style={{ fontSize: 'xx-large', fontWeight: 'bold',fontFamily:'Times New Roman, Times, serif' }}>{item.service_Name}</div>
        <div style={{ textAlign: 'right',fontFamily:'Times New Roman, Times, serif' }}>₹{item.service_Amount}</div>
        <br />
        <div style={{ textAlign: 'left',fontFamily:'Times New Roman, Times, serif' }}>{item.description}</div>
        <br />
        <CardActions style={{ justifyContent: 'flex-end',fontFamily:'Times New Roman, Times, serif' }}>
          <Button size='medium' variant='outlined' style={{ color:'#bc0808',borderColor: '#bc0808',margin: '5px',fontFamily:'Times New Roman, Times, serif' }}
            onClick={() => handleRemoveService(item.service_ID)}> <DeleteIcon />   Remove</Button>
        </CardActions>
      </CardContent>
    </Card>
  </Grid>
  <br></br>
  <br></br>
  </>
))}
<br></br>
        <CardActions style={{alignContent:'center',justifyContent:'center',fontFamily:'Times New Roman, Times, serif'}}>
        <Button size='medium' variant='contained' style={{height:'35px',width:"171px", backgroundColor: '#bc0808' }}
              onClick={() => handleAddService()} >Add Service</Button>
        <Button size='medium' variant='contained' style={{height:'35px',width:"171px", backgroundColor: '#bc0808' }}
              onClick={() => handleInvoice()} >Proceed</Button>
</CardActions>
<Snackbar
severity="error"
        open={openRemove}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Removed From Cart Successfully"
        action={action}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
      />
<Snackbar
severity="success"
        open={openInvoice}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Proceeding To Car Details"
        action={action}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
      />
<br></br>
<br></br>
    </div>
  );
}
 
export default ConfirmBooking;
