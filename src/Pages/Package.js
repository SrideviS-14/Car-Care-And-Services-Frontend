import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { Grid, Card, CardActions, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CardContent } from '@mui/material';
import party from "party-js";
import { motion } from 'framer-motion';
import Grow from '@mui/material/Grow';
 
function Package() {
  const navigate = useNavigate();
  const { jwt } = useAuth();
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
  const api = axios.create({
    baseURL: 'http://localhost:8080', // Change this to your actual backend URL
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
  });
  const [packagedata, setpackagedata] = useState([]);
  const [offerData, setOfferData] = useState({});
  useEffect(() => {
    api.get('/service/getAllPackages')
      .then((response) => {
        console.log(response.data);
        setpackagedata(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
 
      api.get('/service/getAllPackagesWithOffers')
      .then((response) => {
        console.log(response.data);
        setOfferData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    const confettiAnimation = party.confetti(document.body, {
      count: party.variation.range( 80,100),
    });
 
  }, []);
 
  const handleBuyPackage = async (package_ID) => {
    try {
      const response = await api.post('/package/buyPackage', package_ID);
      navigate('/carDetails');
      console.log('Registration successful:', response.data);
      // Handle success (e.g., redirect to login page)
    } catch (error) {
      alert('Invalid User Name or Password!');
      console.error('Registration failed:');
      // Handle error (e.g., display error message)
    }
  };
  const [checked, setChecked] = React.useState(false);
 
  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  return (
    <div>
      <h1 style={{ color: 'black', justifyContent: 'center', marginTop: '45px' }}>Welcome to our Package Selection</h1>
      <p style={{ textAlign: 'center', fontSize: 'x-large', color: 'black', justifyContent: 'center', marginTop: '55px' }}>
        Here you can find a variety of packages tailored to your needs. Browse through the options and select the one that suits you best.
      </p>
      <Grid container spacing={4} style={{ marginTop: '20px', justifyContent: 'center' }}>
        {packagedata.map((item) => (
          <Grid item key={item.service_ID} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Grow in={true} timeout={1000}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Card
              style={{
                position: 'relative',
                backgroundColor: '#F2F3F4',
                width: '400px',
                height: '400px',
                fontFamily: 'Times New Roman, Times, serif',
                fontSize: 'large',
                color: 'black',
                borderColor: '#d4af37',
                borderRadius: '15px',
              }}
            >
              <CardContent>
                <div style={{ textAlign: 'left',fontWeight:'bolder',fontSize:'x-large' }}>{item.service_Name}</div>
                <br />
                <div style={{ textAlign: 'left',fontWeight:'bolder',fontSize:'x-large' }}>
                <span style={{ textDecoration: 'line-through', color: '#808080'}}>₹{offerData[item.service_ID]}</span>
                  <span style={{ marginLeft: '10px', color: '#c5b358' }}>₹{item.service_Amount}</span>
                </div>
                <ul style={{fontSize:'large'}}>
                  {item.description.split(',').map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
              </CardContent>
              <div
                className="button-container"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  position: 'absolute',
                  bottom: '0',
                  width: '100%',
                  marginBottom:'10PX'
                }}
              >
                <CardActions>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button size="medium" variant="contained" style={{  height:'35px',width:"179px",backgroundColor: '#bc0808' }} onClick={() => handleBuyPackage(item.service_ID)}>
                    Buy Now
                  </Button>
                  </motion.div>
                </CardActions>
               
              </div>
            </Card>
            </motion.div>
            </Grow>
          </Grid>
        ))}
      </Grid>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}
 
export default Package;

