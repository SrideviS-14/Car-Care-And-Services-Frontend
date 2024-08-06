import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import RecommendIcon from '@mui/icons-material/Recommend';
import { Button} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
 
function Home() {
  const [recommendation, setRecommendation] = useState(null);
  const {jwt} = useAuth();
  const [serviceNames, setServiceNames] = useState({});
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
  const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": 'application/json'
    },
  });
 
  const addBooking = async (userId, serviceId) => {
    try {
      const response = await axios.post('http://localhost:5000/add_booking', {
        userId: userId,
        serviceId: serviceId
      });
      console.log("Hello");
      console.log(response.data.message);
    } catch (error) {
      console.error('Error adding booking:', error);
    }
  };
 
  const [serviceID, setServiceID] = useState(0);
  const getRecommendation = async (userId, names) => {
    try {
      const response = await axios.post('http://localhost:5000/recommend', {
        userId: userId
      });
      console.log(response.data.recommendation)
      console.log(names);
      console.log(names[response.data.recommendation]);
      setServiceID(response.data.recommendation);
      setRecommendation(names[response.data.recommendation]);
    } catch (error) {
      console.error('Error getting recommendation:', error);
    }
  };
 
  useEffect(() => {
    api.get('/service/getAllServices')
    .then((response) => {
      const services = response.data;
      console.log(services);
      const names = {};
      services.forEach(service => {
        names[service.service_ID] = service.service_Name;
      });
      setServiceNames(names);
      names[9] = "Standard Package";
      names[10] = "Classic Package";
      names[11] = "Premium Package";
      return names;
    })
    .then((names) => {
      api.get('/account/profile')
        .then((response) => {
          console.log(response.data.User);
          const userID = response.data.User.id;
 
          api.get('/booking/getAllBookings')
            .then(async (response) => {
              await Promise.all(response.data.map(async (booking) => {
                console.log(booking);
                const serviceIds = booking.service_List.split(',');
                await Promise.all(serviceIds.map(async (serviceId) => {
                  console.log(booking.user_ID , serviceId);
                  addBooking(1,2);
                  await addBooking(booking.user_ID, serviceId);
                }));
              }));              
              console.log(userID);
              getRecommendation(userID, names);
            })
            .catch((error) => {
              console.error('Error fetching data:', error);
            });
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }, []);
 
  const handleClose = () => {
    setOpen(false);
  };
 
  const handleAddToCart = async (service_ID) => {
    try {
      const response = await api.post('/cart/addService', service_ID);
      console.log('Added successfully!', response.data);
      navigate('/confirmbooking');
    } catch (error) {
      alert('Could not add!');
      console.error('Registration failed:', error);
    }
  };
 
  return (
    <div>
      {recommendation &&
        <Dialog open={open} onClose={handleClose}>
    <DialogTitle>
        <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon style={{ marginLeft:'400px'}}/>
        </IconButton>
    </DialogTitle>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <RecommendIcon color="error" style={{ fontSize: 100 }}/>
        <Typography gutterBottom variant="h5" component="div">
            Recommended Service
        </Typography>
        <Typography variant="h6" color="text.secondary">
            {recommendation}
        </Typography>
        <br></br>
        <Button
            size="small"
            variant='contained'
            style={{height:'35px',width:"171px", backgroundColor: '#bc0808', fontFamily:'Times New Roman, Times, serif', color:  '#ffffff' }}
            onClick={() => handleAddToCart(serviceID)}
        >
            <ShoppingCartIcon />  Add to Cart
        </Button>
    </div>
    <div style={{ height: '50px' }}></div> {/* This will leave some space at the bottom */}
</Dialog>
 
      }
    </div>
  );
}
 
export default Home;