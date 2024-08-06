import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';
import Slide from '@mui/material/Slide';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { Stepper, Step, StepLabel, Card, CardContent, Typography, Box, Container, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
 
const steps = ['confirmed', 'pending', 'completed'];
const statusText = [
    {title:'Order Placed', icon:AssignmentTurnedInIcon},
    {title:'Processing', icon:TrendingUpIcon},
    {title: 'Completed',icon:CheckCircleIcon }
];

const StatusTrack = () => {
    const [data, setData] = useState([]);
    const {jwt} = useAuth();
 
    const api = axios.create({
      baseURL: 'http://localhost:8080',
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": 'application/json'
      },
    });
 
    useEffect(() => {
        api.get('/booking/getBookingsOfUserAll')
        .then((response) => {
          console.log(response.data);
          setData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, []);
 
    return (
        <Container maxWidth="md">
            <Box sx={{ my: 4 }}>
            <h1 style={{ color: 'black', justifyContent: 'center', marginTop: '55px' }}>My Bookings</h1>
            <p style={{ textAlign: 'center', fontSize: 'x-large', color: 'black', justifyContent: 'center', marginTop: '45px' }}>
              Here you can find the list of bookings you have done!
            </p>
            {data.map((item, index) => {
                const activeStep = steps.indexOf(item.status);
                return (
                    <Slide direction="up" in={true} mountOnEnter unmountOnExit key={index} timeout={1000}>                      
                        <Card key={item.booking_ID} sx={{ minWidth: 285, marginBottom: 2, mt: 3,borderRadius:'20px' }}>
                            <br></br>
                            <CardContent>
                                <Typography variant="h5" component="div" sx={{fontSize:'large',textTransform:'capitalize'}}>
                                    Booking ID: {item.booking_ID}
                                </Typography>
                                <Typography variant="body2"sx={{fontSize:'medium',textTransform:'capitalize'}} color="text.secondary">
                                    Date of Booking: {item.dateOfBooking}<br/>
                                    Package Amount: {item.package_Amount}<br/>
                                    Paid: {item.paid ? 'Yes' : 'No'}<br/>
                                    Service List: {item.service_List}<br/>
                                    Time Period (in days): {item.time_Period_In_Days}<br/>
                                    Status: {item.status}<br/>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Slide>
                )
            })}
            </Box>
        </Container>
    );
};
 
export default StatusTrack;