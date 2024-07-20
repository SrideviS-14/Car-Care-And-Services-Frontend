import React,{useState} from "react";
import QRCode from "react-qr-code";
import { useAuth } from './AuthContext';
import  { Grid, Button, Card,CardActions,CardContent, Typography,TextField,Box } from "@mui/material";
import axios from "axios";

function Payment(){
    const { jwt} = useAuth();
    const [formData, setFormData] = useState({
        Booking_ID: 2,
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
    const handlePayment = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/payment/makePayment', formData);
            console.log('Registration successful:', response.data.token);
            // Handle success (e.g., redirect to login page)
        } catch (error) {
            alert("Invalid User Name or Password!");
            console.error('Registration failed:');
            // Handle error (e.g., display error message)
        }
    };
return(
<>
<Grid style={{fontFamily:'Times New Roman, Times, serif'}}>
<h1 style={{ fontFamily:'Times New Roman, Times, serif',color: "black",textAlign:'center'}}>Payment</h1><br></br>
<h1 style={{color: "black",textAlign:'center',fontFamily:'Times New Roman, Times, serif'}}>Scan this QR code or enter your card details to make payment!</h1>
<br></br>
<br></br>
<div style={{ display: 'flex', justifyContent: 'center' ,fontFamily:'Times New Roman, Times, serif'}}>
  <QRCode
    style={{ width:'500px',height:'400px',marginTop:'50',fontFamily:'Times New Roman, Times, serif' }}
    value={jwt}
    viewBox={`0 0 256 256`}
  />
 
    <Box  width="700px" display="flex" justifyContent="center" alignItems="center" fontFamily='Times New Roman, Times, serif'>
    <Card sx={{ flexDirection: 'row', backgroundColor: '#d7dce2', height: 540, justifyContent: "center", borderRadius: 12,fontFamily:'Times New Roman, Times, serif' }}>
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
              label="Enter your card expiry date"
              type="password"
              fullWidth
              value={formData.Expiration_Date}
              onChange={(e) => setFormData({ ...formData, Expiration_Date: e.target.value })}
            />
          </Box>
        </CardContent>
        <CardActions>
            <Box width="100%" display="flex" justifyContent="center">
            <Button size="large" variant="contained"style={{backgroundColor:'#000080'}} onClick={(e) => handlePayment(e)}>Make Payment</Button>
            </Box>
        </CardActions>
        </Card>
        </Box>
    </div>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    </Grid>
</>
 
)
}
export default Payment;