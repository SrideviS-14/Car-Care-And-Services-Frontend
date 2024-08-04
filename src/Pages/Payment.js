import React, { useState } from "react";
import QRCode from "react-qr-code";
import { useAuth } from './AuthContext';
import { Grid, Button, Card, CardActions, CardContent, Typography, TextField, Box, Tabs, Tab, Container } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import { useLocation } from "react-router-dom";
import Tick from './images/tickicon.gif'
 
function Payment(){
    const navigate = useNavigate();
    const { jwt} = useAuth();
    const location = useLocation();
    const bookingId = location.state ? location.state.bookingId : null;
    const amount = location.state ? location.state.amount : null;
    const [formData, setFormData] = useState({
      Booking_ID: bookingId,
      Payment_Type: 'Online',
      Card_Holder_Name: '',
      Card_Number: '',
      Expiration_Date: ''
  });
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
    const api = axios.create({
        baseURL: 'http://localhost:8080',
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": 'application/json'
        },  // Change this to your actual backend URL
    });
   
    const [openalert,setopenalert] = React.useState(false);
    const handleClosealert = () => {
      setopenalert(false);
      navigate('/');// Wait 2 seconds before navigating
    }
    const handlePayment = async (e) => {
        e.preventDefault();
        if(formData == null)
        {
          alert("Please enter valid details");
        }
        try {
            const response = await api.post('/payment/makePayment', formData);
            setopenalert(true);
            setOpen(true);
            console.log('Registration successful:', response.data.token);
            // Handle success (e.g., redirect to login page)
        } catch (error) {
            console.error('Registration failed:');
            // Handle error (e.g., display error message)
        }
    };
 
    console.log(amount);
    const [open, setOpen] = React.useState(false);
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
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
     const [tabValue, setTabValue] = useState(0);
 
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const handeCompleted = () =>{
    setopenalert(true);
  }
return(
  <>
  <Container maxWidth="md" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
  <Grid style={{ fontFamily: 'Times New Roman, Times, serif' }}>
      <Grid style={{ fontFamily: 'Times New Roman, Times, serif' }}>
       
        <h1 style={{ color: 'black', justifyContent: 'center', marginTop: '75px' }}>Payment</h1>
      <p style={{ textAlign: 'center', fontSize: 'x-large', color: 'black', justifyContent: 'center', marginTop: '75px' }}>
      Scan this QR code or enter your card details to make payment!
      </p>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="QR Code" />
          <Tab label="Card Details" />
        </Tabs>
        {tabValue === 0 && (
  <div style={{ justifyContent: 'center', fontFamily: 'Times New Roman, Times, serif' }}>
    <div style={{ border: '5px solid #000080', borderRadius: '10px', padding: '10px', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <QRCode
        style={{ width: '500px', height: '400px', marginTop: '50', marginBottom: '50', fontFamily: 'Times New Roman, Times, serif' }}
        value={`upi://pay?pa=sridevi.srsv@oksbi&pn=Sridevi%20Srsv&aid=uGICAgMCymIPzZA&am=${amount}&cu=INR`}
        viewBox={`0 0 256 256`}
        bgColor="#ffffff"
        fgColor="#000080"
      />
      <Button variant="contained" style={{ marginBottom: '20px',backgroundColor:'#bc0808' }} onClick={handeCompleted}>Completed</Button>
    </div>
  </div>
)}

        {tabValue === 1 && (
          <div>
          <Box  width="700px" display="flex" justifyContent="center" alignItems="center" fontFamily='Times New Roman, Times, serif'>
    <Card sx={{ flexDirection: 'row', backgroundColor: '#F2F3F4', height: 540, justifyContent: "center", borderRadius: 12,fontFamily:'Times New Roman, Times, serif' }}>
        <CardContent>
        <h1 gutterBottom variant="h5" component="div"style={{textAlign:'center', color: "black",fontFamily:'Times New Roman, Times, serif'}}>Enter your Card Details for Payment</h1>
        <br></br>
        <Box mb={2} style={{fontFamily:'Times New Roman, Times, serif'}}>
            <Typography gutterBottom variant="subtitle1">
              Card Holder Name:
            </Typography>
            <TextField
              required
              id="outlined-required"
              label="Enter card holder name"
              fullWidth
              value={formData.Card_Holder_Name}
              onChange={(e) => setFormData({ ...formData, Card_Holder_Name: e.target.value })}
            />
          </Box>
          <Box mb={2} style={{fontFamily:'Times New Roman, Times, serif'}}>
            <Typography gutterBottom variant="subtitle1">
              Card Number:
            </Typography>
            <TextField
              required
              id="outlined-password-input"
              label="Enter your card number"
              type="password"
              fullWidth
              value={formData.Card_Number}
              onChange={(e) => setFormData({ ...formData, Card_Number: e.target.value })}
            />
          </Box>
          <Box mb={2} style={{fontFamily:'Times New Roman, Times, serif'}}>
            <Typography gutterBottom variant="subtitle1">
              Expiration Date:
            </Typography>
            <TextField
              required
              id="outlined-password-input"
              type="date"
              fullWidth
              value={formData.Expiration_Date}
              onChange={(e) => setFormData({ ...formData, Expiration_Date: e.target.value })}
            />
          </Box>
        </CardContent>
        <CardActions>
            <Box width="100%" display="flex" justifyContent="center">
            <Button size="large" variant="contained"style={{backgroundColor:'#bc0808'}} onClick={(e) => handlePayment(e)}>Make Payment</Button>
            </Box>
        </CardActions>
        </Card>
        </Box>
        <Dialog
        open={openalert}
        onClose={handleClosealert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
      <DialogTitle id="alert-dialog-title">
      <img src={Tick} style={{justifyContent:'center',alignItems:'center',textAlign:'center',marginLeft:'80px'}}></img>
      </DialogTitle>
      <DialogContent>
      <DialogContentText id="alert-dialog-description">
      Your Payment is Successful
      Do visit us again
      </DialogContentText>
      </DialogContent>
      <DialogActions>
      <Button onClick={handleClosealert} autoFocus>
      Thank You
      </Button>
      </DialogActions>
      </Dialog>
      </div>
        )}
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </Grid>
      </Grid>
      </Container>
    </>
 
)
}
export default Payment;