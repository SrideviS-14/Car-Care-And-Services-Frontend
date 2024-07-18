import { useRef,useState, useEffect } from "react";
import { Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CardActions } from '@mui/material';
import axios from 'axios';
import { useReactToPrint } from "react-to-print";
import Barcode from 'react-barcode';
import { useAuth } from './AuthContext';
import { useNavigate } from "react-router-dom";

function Invoice() {
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
      navigate('/payment')
    }
    const handleBackToCart = () => {
      navigate('/cart');
    }
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Paper elevation={3} style={{ padding: '20px', width: '600px', maxWidth: '100%' }} ref={componentRef}>
           <div className="col-md-4 brcode">
                                        <Barcode value='1234567890'width={1} height={50} displayValue={false} />
                                    </div>
                                    <div className="col-md-8 text-right bbc">
                                        <h4 style={{ color: '#325aa8' }}><strong>Company</strong></h4>
                                        <p>(+91) 9475765201</p>
                                        <p>Company@gmail.com</p>
                                    </div>
          <Typography variant="h4" align="center" gutterBottom>
            Invoice
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead style={{fontWeight:'bolder'}}>
                <TableRow>
                  <TableCell style={{fontWeight:'bolder'}}>Service Name</TableCell>
                  <TableCell style={{fontWeight:'bolder'}}align="right">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.service_ID}>
                    <TableCell component="th" scope="row">
                      {service.service_Name}
                    </TableCell>
                    <TableCell align="right">₹{service.service_Amount}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>
                    GST
                  </TableCell>
                  <TableCell align="right" style={{ fontWeight: 'bold' }}>₹155</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>
                    Total
                  </TableCell>
                  <TableCell align="right" style={{ fontWeight: 'bold' }}>₹{finaldata + 155}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
          <CardActions style={{alignContent:'center',justifyContent:'center'}}>
            <Button size='medium' variant='contained' style={{alignContent:'center',justifyContent:'center',backgroundColor: '#000080' }}
                  onClick={handlePrint} >Download Invoice</Button>
          <Button size='medium' variant='contained' style={{alignContent:'center',justifyContent:'center',backgroundColor: '#000080' }}
                  onClick={() => handleBackToCart()} >Back To Cart</Button>
           <Button size='medium' variant='contained' style={{alignContent:'center',justifyContent:'center',backgroundColor: '#000080' }}
                  onClick={() => handlePayment()} >Proceed To Pay</Button> 
        </CardActions>
          </div>
        </Paper>
        </div>
    );
}

export default Invoice;
