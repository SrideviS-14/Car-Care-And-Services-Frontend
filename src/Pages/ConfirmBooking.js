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
  const handleRemoveService = async (serviceId) => {
    try {
      const response = await api.post('/cart/removeService', serviceId);
      setcarddata(carddata.filter(item => item.service_ID !== serviceId));
      console.log('Successful', response.data);
      setOpenRemove(true);
 
      // Enable the button for this service in localStorage
      const savedDisabledStatus = JSON.parse(localStorage.getItem(jwt));
      if (savedDisabledStatus) {
        savedDisabledStatus[serviceId] = false;
        localStorage.setItem(jwt, JSON.stringify(savedDisabledStatus));
      }
    } catch (error) {
      alert("Cannot remove");
      console.error('Failed');
    }
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
      <table style={{ padding: '20px', backgroundColor: '#F2F3F4', marginLeft: '290px', width: '900px', fontFamily: 'Times New Roman, Times, serif' }}>
  <thead style={{ boxShadow: 'black', borderColor: 'black' }}>
    <tr>
      <th style={{ fontSize: 'x-large', fontWeight: 'bold' }}>Service Name</th>
      <th style={{ fontSize: 'x-large', textAlign: 'right' }}>Price</th>
      <th></th> {/* Empty header for the actions column */}
    </tr>
  </thead>
  {/* Partition 1 */}
  <tbody style={{ borderBottom: '2px solid black' }}>
    {carddata.slice(0, Math.ceil(carddata.length / 2)).map((item) => (
      <tr key={item.service_ID}>
        <td style={{ fontSize: 'large' }}>{item.service_Name}</td>
        <td style={{ fontSize: 'large', textAlign: 'right' }}>₹{item.service_Amount}</td>
        <td style={{ textAlign: 'right' }}>
          <button
            style={{ color: '#bc0808', borderColor: '#bc0808', margin: '5px' }}
            onClick={() => handleRemoveService(item.service_ID)}
          >
            <DeleteIcon />
          </button>
        </td>
      </tr>
    ))}
  </tbody>
  {/* Partition 2 */}
  <tbody>
    {carddata.slice(Math.ceil(carddata.length / 2)).map((item) => (
      <tr key={item.service_ID}>
        <td style={{ fontSize: 'large' }}>{item.service_Name}</td>
        <td style={{ fontSize: 'large', textAlign: 'right' }}>₹{item.service_Amount}</td>
        <td style={{ textAlign: 'right' }}>
          <button
            style={{ color: '#bc0808', borderColor: '#bc0808', margin: '5px' }}
            onClick={() => handleRemoveService(item.service_ID)}
          >
            <DeleteIcon />
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
  <br></br>
  <br></br>
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
