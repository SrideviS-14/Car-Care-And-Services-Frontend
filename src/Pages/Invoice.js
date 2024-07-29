import * as React from 'react';
import { useRef,useState, useEffect } from "react";
import { Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CardActions } from '@mui/material';
import axios from 'axios';
import { useReactToPrint } from "react-to-print";
import Barcode from 'react-barcode';
import { useAuth } from './AuthContext';
import { useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Tick from './images/tickicon.gif'
import { useLocation } from "react-router-dom";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
 
function Invoice() {
  const location = useLocation();
  const [bookingId, setBookingId] = useState(null);
  const selectedCar = location.state ? location.state.selectedCar : null;
  const userId = location.state ? location.state.userId : null;
  const [formData, setFormData] = useState({
      Service_List: "",
      Package_Amount: 0.00,
      Time_Period_In_Days: 7,
      User_ID: 0,
      Paid: false,
});
  const [open, setOpen] = React.useState(false);
  const [openalert,setopenalert] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
 
    const navigate = useNavigate();
    const { jwt } = useAuth();
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
    const api = axios.create({
        baseURL: 'http://localhost:8080',
        headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": 'application/json'
        },
    });
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const [finaldata, setfinaldata] = useState(0);
    const [services, setServices] = useState([]);
    const [userdetails,setuserdetails] = useState([]);
    const [userID, setUserID] = useState(0);

  useEffect(()=>{
    api.get('account/getallUsers',{userID})
    .then((response)=>{
      const userdetails = response.data;
    })
    .catch((error)=>{
      console.error('Error fetching data:', error);
    })
  },[]);
   
  useEffect(() => {
    api.get('/cart/getServices')
      .then((response) => {
        console.log(response.data);
        // Assuming response.data is an array of services
        const services = response.data;
        let serviceList = services.map(service => service.service_ID).join(", ");
        let packageAmount = services.reduce((total, service) => total + service.service_Amount, 0);
        api.get('/account/profile')
          .then((response) => {
            setUserID(response.data.User.id);
            setFormData(prevState => ({
              ...prevState,
              Service_List: serviceList,
              Package_Amount: packageAmount,
              User_ID: response.data.User.id
            }));
          })
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
 
  const handleOnlinePay = async(e) => {
    e.preventDefault();
    try {
        const response = await api.post('/booking/book', formData);
        console.log(response.data);
        setBookingId(response.data);
        console.log(bookingId)
        setTimeout(() => navigate('/payment', { state: { bookingId: response.data } }), 2);
        // Handle success (e.g., redirect to login page)
    } catch (error) {
        alert("Invalid User Name or Password!");
        console.error('Registration failed');
        // Handle error (e.g., display error message)
    }
  }
  const handleClosealert = () => {
    setopenalert(false);
    navigate('/');// Wait 2 seconds before navigating
  }
  
  const handleInPersonPay = async(e) => {
    e.preventDefault();
    try {
        const response = await api.post('/booking/book', formData);
        setopenalert(true);
        console.log('Registration successful:', response.data.token);
        // Handle success (e.g., redirect to login page)
    } catch (error) {
        alert("Invalid User Name or Password!");
        console.error('Registration failed:');
        // Handle error (e.g., display error message)
    }
  }
  useEffect(() => {
    api.get('/cart/getServices')
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
    useEffect(() => {
        api.get('/cart/getTotal')
            .then((response) => {
                setfinaldata(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
    const handlePayment = () => {
      setOpen(true);
    }
    const handleBackToCart = () => {
      navigate('/confirmbooking');
    }
    const gst = finaldata*20/100;
    const totalamount = finaldata + gst;
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',fontFamily:'Times New Roman, Times, serif' }}>
 
            <Paper elevation={3} style={{ marginTop:'50px',marginBottom:'50px',padding: '20px', width: '600px', maxWidth: '100%',fontFamily:'Times New Roman, Times, serif' }} ref={componentRef}>
           <div className="col-md-4 brcode">
                                        <Barcode value={totalamount} width={1} height={50} displayValue={false} />
                                    </div>
                                    <div className="col-md-8 text-right bbc">
                                        <h4 style={{ color: '#325aa8',fontFamily:'Times New Roman, Times, serif' }}><strong>Wheels Up Company</strong></h4>
                                        <p style={{fontFamily:'Times New Roman, Times, serif'}}>(+91) 9475765201</p>
                                        <p style={{fontFamily:'Times New Roman, Times, serif'}}>wheelsup.carservices@gmail.com</p>
                                    </div>
                                    <div className='col-md-8 text-left bbc>'>
                                    <h4 style={{ color: '#325aa8',fontFamily:'Times New Roman, Times, serif' }}><strong>Wheels Up Company</strong></h4>
                                        <p style={{fontFamily:'Times New Roman, Times, serif'}}>(+91) 9475765201</p>
                                        <p style={{fontFamily:'Times New Roman, Times, serif'}}>wheelsup.carservices@gmail.com</p>
                                    </div>
          <Typography variant="h4" align="center" gutterBottom>
            Invoice
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead style={{fontWeight:'bolder'}}>
                <TableRow>
                  <TableCell style={{fontWeight:'bolder',fontFamily:'Times New Roman, Times, serif'}}>Service Name</TableCell>
                  <TableCell style={{fontWeight:'bolder',fontFamily:'Times New Roman, Times, serif'}}align="right">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.service_ID}>
                    <TableCell component="th" scope="row" style={{fontFamily:'Times New Roman, Times, serif'}}>
                      {service.service_Name}
                    </TableCell>
                    <TableCell align="right" style={{fontFamily:'Times New Roman, Times, serif'}}>₹{service.service_Amount}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell component="th" scope="row" style={{ fontWeight: 'bold',fontFamily:'Times New Roman, Times, serif' }}>
                    GST
                  </TableCell>
                  <TableCell align="right" style={{ fontWeight: 'bold',fontFamily:'Times New Roman, Times, serif' }}>{gst}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" style={{ fontWeight: 'bold',fontFamily:'Times New Roman, Times, serif' }}>
                    Total
                  </TableCell>
                  <TableCell align="right" style={{ fontWeight: 'bold',fontFamily:'Times New Roman, Times, serif' }}>₹{totalamount}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
          <CardActions style={{alignContent:'center',justifyContent:'center'}}>
            <Button size='medium' variant='contained' style={{alignContent:'center',justifyContent:'center',backgroundColor: '#008b8b' }}
                  onClick={handlePrint} >Download Invoice</Button>
          <Button size='medium' variant='contained' style={{alignContent:'center',justifyContent:'center',backgroundColor: '#008b8b' }}
                  onClick={() => handleBackToCart()} >Back To Cart</Button>
           <Button size='medium' variant='contained' style={{alignContent:'center',justifyContent:'center',backgroundColor: '#008b8b' }}
                  onClick={() => handlePayment()} >Proceed To Pay</Button>
        </CardActions>
          </div>
 <br></br>
 <br></br>
 
        </Paper>
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
      Your Booking is Confirmed
      Do visit us again 
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClosealert} autoFocus>
      Thank You
    </Button>
  </DialogActions>
</Dialog>

        <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Payment Type Confirmation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do you want to make an online payment or in-person payment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={(e) => handleInPersonPay(e)}>In-Person</Button>
          <Button onClick={(e) => handleOnlinePay(e)}>Online</Button>
        </DialogActions>
      </Dialog>
        </div>
    );
}
 
export default Invoice;