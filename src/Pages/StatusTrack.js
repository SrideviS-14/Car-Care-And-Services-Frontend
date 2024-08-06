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
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [serviceToDelete, setServiceToDelete] = useState(null);
    const {jwt} = useAuth();
 
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
          console.log(response.data);
          setData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, []);
 
    const handleDeleteConfirmationClose = () => {
        setDeleteConfirmOpen(false);
    };
 
    const handleDeleteConfirmationOpen = (booking_ID) => {
        setServiceToDelete(booking_ID);
        setDeleteConfirmOpen(true);
    };
 
    const handleCancel = (booking_ID) => {
        api.put('/booking/cancelBooking', booking_ID)
        .then((response) => {
          console.log(response);
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
 
    return (
        <Container maxWidth="md">
            <Box sx={{ my: 4 }}>
            <h1 style={{ color: 'black', justifyContent: 'center', marginTop: '55px' }}>Track Booking Status</h1>
            <p style={{ textAlign: 'center', fontSize: 'x-large', color: 'black', justifyContent: 'center', marginTop: '45px' }}>
              Here you can find the list of bookings you have done and its status!
            </p>
            <h6 style={{ textAlign: 'center', fontSize: 'x-large', color: 'red', justifyContent: 'center', marginTop: '45px' }}>
              You can cancel the booking until the status is in order placed stage
            </h6>
            {data.map((item, index) => {
                const activeStep = steps.indexOf(item.status);
                return (
                    <Slide direction="up" in={true} mountOnEnter unmountOnExit key={index} timeout={1000}>                      
                        <Card key={item.booking_ID} sx={{ minWidth: 285, marginBottom: 2, mt: 3,borderRadius:'20px' }}>
                            <br></br>
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
                                </Typography>
                                <Stepper activeStep={activeStep} sx={{ mt: 2 }}>
                                    {steps.map((label, index) => {
                                        const Icon = statusText[index].icon;
                                        return (
                                            <Step key={label}>
                                                <StepLabel
                                                    StepIconComponent={Icon}
                                                    StepIconProps={activeStep === index ? { style: { color: label === 'confirmed' ? 'red' : label === 'pending' ? 'orange' : 'green' } } : {}}
                                                >
                                                    {statusText[index].title}
                                                </StepLabel>
                                            </Step>
                                        );
                                    })}
                                </Stepper>
                                {activeStep === 0 && (
                                    <Button  variant='outlined' onClick={() => handleDeleteConfirmationOpen(item.booking_ID)} sx={{borderColor:'#bc0808',color:'#bc0808',marginLeft:'710px',marginTop:'-420px',height:'40px',width:"100px"}}>
                                        <CancelRoundedIcon sx={{ color:'#bc0808'}} /> Cancel
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    </Slide>
                )
            })}
            <Dialog
                open={deleteConfirmOpen}
                onClose={handleDeleteConfirmationClose}
            >
                <DialogTitle>{"Confirm Deletion"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    {"Are you sure you want to delete this service?"}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteConfirmationClose}>Cancel</Button>
                    <Button onClick={() => handleCancel(serviceToDelete)}>Delete</Button>
                </DialogActions>
            </Dialog>
            </Box>
        </Container>
    );
};
 
export default StatusTrack;