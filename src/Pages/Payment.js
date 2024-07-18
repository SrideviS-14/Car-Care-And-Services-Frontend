import React,{useState} from "react";
import QRCode from "react-qr-code";
import { useAuth } from './AuthContext';
import  { Grid, Button, Card,CardActions,CardContent, Typography,TextField,Box } from "@mui/material";
import axios from "axios";
 
function Payment(){
    const { jwt, setJwt } = useAuth();
    const [formData, setFormData] = useState({
        cardHolderName: '',
        cardNumber: '',
        expirationDate: ''
    });
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
    const api = axios.create({
        baseURL: 'http://localhost:8080', // Change this to your actual backend URL
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/account/login', formData);
            localStorage.setItem('jwt', response.data.token);
            console.log(localStorage.getItem('jwt'));
            setJwt(response.data.token);
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
<Grid rowspacing={{}}>
<h1 style={{ color: "black",textAlign:'center'}}>Payment</h1><br></br>
<h1 style={{color: "black",textAlign:'center'}}>Scan this QR code or enter your card details to make payment!</h1>
<br></br>
<br></br>
<div style={{ display: 'flex', justifyContent: 'center' }}>
  <QRCode
    style={{ width:'500px',height:'400px',marginTop:'50' }}
    value={jwt}
    viewBox={`0 0 256 256`}
  />
 
    <Box  width="700px" display="flex" justifyContent="center" alignItems="center">
    <Card sx={{ flexDirection: 'row', backgroundColor: '#d7dce2', height: 540, justifyContent: "center", borderRadius: 12 }}>
        <CardContent>
        <h1 gutterBottom variant="h5" component="div"style={{textAlign:'center', color: "black"}}>Enter your Card Details for Payment</h1>
        <br></br>
        <Box mb={2}>
            <Typography gutterBottom variant="subtitle1">
              Card Holder Name:
            </Typography>
            <TextField
              required
              id="outlined-required"
              label="Enter card holder name"
              fullWidth
              value={formData.cardHolderName}
              onChange={(e) => setFormData({ ...formData, cardHolderName: e.target.value })}
            />
          </Box>
          <Box mb={2}>
            <Typography gutterBottom variant="subtitle1">
              Card Number:
            </Typography>
            <TextField
              required
              id="outlined-password-input"
              label="Enter your card number"
              type="password"
              fullWidth
              value={formData.cardNumber}
              onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
            />
          </Box>
          <Box mb={2}>
            <Typography gutterBottom variant="subtitle1">
              Expiration Date:
            </Typography>
            <TextField
              required
              id="outlined-password-input"
              label="Enter your card expiry date"
              type="password"
              fullWidth
              value={formData.expirationDate}
              onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
            />
          </Box>
        </CardContent>
        <CardActions>
            <Box width="100%" display="flex" justifyContent="center">
            <Button size="large" variant="contained"style={{backgroundColor:'#000080'}} >Make Payment</Button>
            </Box>
        </CardActions>
        </Card>
        </Box>
    </div>
    <br></br>
    <br></br>
    </Grid>
</>
 
)
}
export default Payment;