import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';
import { Stepper, Step, StepLabel, Card, CardContent, Typography, Box, Container } from '@mui/material';
 
const steps = ['confirmed', 'pending', 'completed'];
 
const StatusTrack = () => {
    const [data, setdata] = useState([]);
    const {jwt} = useAuth();
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
    const api = axios.create({
      baseURL: 'http://localhost:8080',
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": 'application/json'
      },
    });
    useEffect(() => {
        api.get('/booking/getBookingsOfUser')
        .then((response) => {
          setdata(response.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, []);
    return (
        <Container maxWidth="md">
            <Box sx={{ my: 4 }}>
            <h1 style={{ color: 'black', justifyContent: 'center', marginTop: '75px' }}>Track Booking Status</h1>
            <p style={{ textAlign: 'center', fontSize: 'x-large', color: 'black', justifyContent: 'center', marginTop: '75px' }}>
              Here you can find the list of bookings you have done and its status!
            </p>
                {data.map((item) => {
                    const activeStep = steps.indexOf(item.status);
                    return (
                        <Card key={item.booking_ID} sx={{ minWidth: 275, marginBottom: 2, mt: 3 }}>
                            <CardContent>
                                <Typography variant="h5" component="div" color="primary">
                                    Booking ID: {item.booking_ID}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Date of Booking: {item.dateOfBooking}<br/>
                                    Package Amount: {item.package_Amount}<br/>
                                    Paid: {item.paid ? 'Yes' : 'No'}<br/>
                                    Service List: {item.service_List}<br/>
                                    Time Period (in days): {item.time_Period_In_Days}<br/>
                                </Typography>
                                <Stepper activeStep={activeStep} sx={{ mt: 2 }}>
                                    {steps.map((label, index) => (
                                        <Step key={label}>
                                            <StepLabel StepIconProps={{
                                                style: {
                                                    color: index === activeStep ? (label === 'confirmed' ? 'red' : label === 'pending' ? 'orange' : 'green') : 'grey',
                                                },
                                            }}>{label}</StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>
                            </CardContent>
                        </Card>
                    )
                })}
            </Box>
        </Container>
    );
};
 
export default StatusTrack;