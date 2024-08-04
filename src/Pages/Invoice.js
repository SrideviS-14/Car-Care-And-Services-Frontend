import * as React from 'react';
import { useRef,useState, useEffect } from "react";
import { CardContent,Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CardActions, Card } from '@mui/material';
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
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import PaymentsIcon from '@mui/icons-material/Payments';
import CloseIcon from '@mui/icons-material/Close';
import logo from './images/output-onlinegiftools (2).gif';
 
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
 
function Invoice() {
  const location = useLocation();
  const [bookingId, setBookingId] = useState(null);
  const data =[
    { title: 'In-Person', icon: PaymentsIcon},
    { title: 'Online', icon: BookOnlineIcon },
  ];
  const [selectedOption, setSelectedOption] = useState(null);
 
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  }
 
  const handleSubmit = (event) => {
    if (selectedOption === 'In-Person') {
      handleInPersonPay(event);
    } else if (selectedOption === 'Online') {
      handleOnlinePay(event);
    }
  }
  const selectedCar = location.state ? location.state.selectedCar : null;
  console.log(selectedCar);
  const [formData, setFormData] = useState({
      Service_List: "",
      Package_Amount: 0.00,
      Time_Period_In_Days: 0,
      User_ID: 0,
      Paid: false,
      car_ID: selectedCar.car_ID
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
    api.get('/account/profile')
    .then((response) => {
      console.log(response.data.User);
      setuserdetails(response.data.User);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  },[]);
   
  useEffect(() => {
    api.get('/cart/getServices')
      .then((response) => {
        console.log(response.data);
        // Assuming response.data is an array of services
        const services = response.data;
        let serviceList = services.map(service => service.service_ID).join(", ");
        let packageAmount = services.reduce((total, service) => total + service.service_Amount, 0);
        let maxTimePeriod = Math.max(...services.map(service => service.timePeriod));
        api.get('/account/profile')
          .then((response) => {
            setUserID(response.data.User.id);
            setFormData(prevState => ({
              ...prevState,
              Service_List: serviceList,
              Package_Amount: packageAmount,
              Time_Period_In_Days: maxTimePeriod,
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
      console.log(formData.car_ID);
        const response = await api.post('/booking/book', formData);
        console.log(response.data);
        setBookingId(response.data);
        localStorage.setItem(`disabled-${jwt}`, JSON.stringify({}));
        console.log(bookingId)
        setTimeout(() => navigate('/payment', { state: { bookingId: response.data, amount: totalamount } }), 2);
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
      console.log(formData);
        const response = await api.post('/booking/book', formData);
        setopenalert(true);
        localStorage.setItem(`disabled-${jwt}`, JSON.stringify({}));
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
      localStorage.removeItem(`disabledStatus-${jwt}`);
      setOpen(true);
    }
    const handleBackToCart = () => {
      navigate('/confirmbooking');
    }
    const gst = finaldata*20/100;
    const totalamount = finaldata + gst;
    return (
      <div style={{  justifyContent: 'center', alignItems: 'center',fontFamily:'Times New Roman, Times, serif' }}>
 
            <Paper elevation={3} style={{fontFamily:'Times New Roman, Times, serif', marginLeft:'400px',marginTop:'50px',marginBottom:'50px',padding: '20px', width: '600px', maxWidth: '100%',fontFamily:'Times New Roman, Times, serif' }} ref={componentRef}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
    <Barcode value={totalamount} width={2} height={50} displayValue={false}  />
    <img src={logo} width='150px' style={{ marginRight: '0', marginLeft: '0', marginTop: '0' }} />
</div>

                                    <div className="col-md-8 text-right bbc">
                                        <h4 style={{ color: '#325aa8',fontFamily:'Times New Roman, Times, serif' }}><strong> Wheels Up Company</strong></h4>
                                        <p style={{fontFamily:'Times New Roman, Times, serif'}}>(+91) 9475765201</p>
                                        <p style={{fontFamily:'Times New Roman, Times, serif'}}>wheelsup.carservices@gmail.com</p>
                                        <h4 style={{ color: '#325aa8',fontFamily:'Times New Roman, Times, serif',textAlign:'right',marginTop:'-110px' }}><strong>{`Name: ${userdetails.userName}`}</strong></h4>
                                        <p style={{fontFamily:'Times New Roman, Times, serif',textAlign:'right',marginTop:'10px'}}>{`Email: ${userdetails.email}`}</p>
                                        <p style={{fontFamily:'Times New Roman, Times, serif',textAlign:'right',marginTop:'10px'}}>{`Phone Number: ${userdetails.phoneNumber}`}</p>
                                   
                                   </div>
                              
          <br></br>
          <Typography variant="h4" align="center" gutterBottom sx={{fontFamily:'Times New Roman, Times, serif'}}>
          <Typography align="center">---------------------------------------------------------------------------------------------------------------------------</Typography>      
            INVOICE
            <Typography align="center">---------------------------------------------------------------------------------------------------------------------------</Typography>      
          </Typography>
          <br></br>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead style={{fontWeight:'bolder'}}>
                <TableRow>
                  <TableCell style={{fontSize:'large',fontWeight:'bolder',fontFamily:'Times New Roman, Times, serif'}}>Service Name</TableCell>
                  <TableCell style={{fontSize:'large',fontWeight:'bolder',fontFamily:'Times New Roman, Times, serif'}}align="right">Amount</TableCell>
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
                <TableCell component="th" scope="row" style={{ fontSize:'medium',fontWeight: 'bold',fontFamily:'Times New Roman, Times, serif' }}>
                    Total
                  </TableCell>
                  <TableCell align="right" style={{ fontSize:'medium',fontWeight: 'bold',fontFamily:'Times New Roman, Times, serif' }}>₹{finaldata}</TableCell>
                  </TableRow>
                  <TableRow>
                  <TableCell component="th" scope="row" style={{ fontSize:'medium',fontWeight: 'bold',fontFamily:'Times New Roman, Times, serif' }}>
                    GST
                  </TableCell>
                  <TableCell align="right" style={{ fontSize:'medium',fontWeight: 'bold',fontFamily:'Times New Roman, Times, serif' }}>₹{gst}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" style={{ fontSize:'medium',fontWeight: 'bold',fontFamily:'Times New Roman, Times, serif' }}>
                    Total Amount
                  </TableCell>
                  <TableCell align="right" style={{ fontSize:'medium',fontWeight: 'bold',fontFamily:'Times New Roman, Times, serif' }}>₹{totalamount}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
 <br></br>
 <br></br>
 <Typography align="center">---------------------------------------------------------------------------------------------------------------------------</Typography>      
 <Typography variant='h6' align='center'sx={{fontFamily:'Times New Roman, Times, serif',fontSize:'medium',fontWeight: 'bold'}}>THANK YOU!</Typography>        
 <Typography variant='h6' align='center'sx={{fontFamily:'Times New Roman, Times, serif',fontSize:'medium',fontWeight: 'bold'}}>Do Visit Us Again</Typography>
 <Typography align="center">---------------------------------------------------------------------------------------------------------------------------</Typography>        
 </Paper>
 <div style={{ display: 'flex', justifyContent: 'space-between', width: '600px', margin: '20px auto' }}>
  <Button size='medium' variant='contained' style={{ height:'35px',width:"179px",backgroundColor: '#bc0808' }}
    onClick={handlePrint}>Download Invoice</Button>
  <Button size='medium' variant='contained' style={{height:'35px',width:"171px", backgroundColor: '#bc0808' }}
    onClick={() => handleBackToCart()}>Back To Cart</Button>
  <Button size='medium' variant='contained' style={{ height:'35px',width:"171px",backgroundColor: '#bc0808' }}
    onClick={() => handlePayment()}>Proceed To Pay</Button>
</div>
 
      <br></br>
      <br></br>
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
              <DialogTitle>
          {"Payment Type Confirmation"}
          <Button onClick={handleClose} style={{ position:'absolute',right: '0' }}>
            <CloseIcon />
          </Button>
          <br></br>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do you want to make an online payment or in-person payment?
          </DialogContentText>
          <br></br>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {data.map((item) => (
          <Card onClick={() => handleOptionSelect(item.title)} style={{   margin: '10px',justifyContent:'center',alignContent:'center',width:'220px',backgroundColor: selectedOption === item.title ? '#bc0808' : 'white' }}>
            <CardContent sx={{textAlign:'center',justifyContent:'center',alignContent:'center'}}>
              <item.icon />
              <Typography>{item.title}</Typography>
            </CardContent>
          </Card>
        ))}
        <br></br>
        </div>
        <br></br>
        <br></br>
        <Button variant="contained" sx={{justifyContent:'center',marginLeft:'190px',backgroundColor:"#bc0808"}} onClick={handleSubmit}>Submit</Button>
        </DialogContent>
      </Dialog>
        </div>
    );
}
 
export default Invoice;
 