import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import {Grid,Card, CardActions,Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CardContent } from '@mui/material';
function Package() {
  const {jwt, setJwt } = useAuth();
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
  const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": 'application/json'
    }, // Change this to your actual backend URL
  });
  const [packagedata,setpackagedata]=useState([]);
  useEffect(() => {
    api.get('/package/getAllPackages')
      .then((response) => {
        console.log(response.data);
        setpackagedata(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
    return (
      <div>
      <Grid container spacing={4} style={{ marginBottom:'100px',marginTop: '180px', justifyContent: 'center',fontFamily:'Times New Roman, Times, serif'}}>
        {packagedata.map((item) => (
          <Grid item key={item.package_ID} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Card style={{backgroundColor:'#dcdcdc',width:'400px',height:'400px',fontFamily:'Times New Roman, Times, serif',fontSize:'large',color:'black',borderColor:'#d4af37',borderRadius:'15px',border:'5px 5px 5px 5px'}}>
              <CardContent>
                <div style={{textAlign:'left'}}>{item.package_Name}</div><br></br>
                <div style={{textAlign:'left'}}>₹{item.package_Amount}</div>
                <ul>
          {item.service_List.split(',').map((service) => (
            <li>{service}</li>
          ))}
        </ul>
                <div style={{textAlign:'left'}}>Time Period: {item.time_Period_In_Days} Days</div>
             <br></br>
                           </CardContent>
                           <div className="button-container" style={{ display:'flex',justifyContent:'center'}}>
                <CardActions>
                  <Button size="medium" variant="contained" style={{ backgroundColor: '#000080' }}>
                    Buy Now
                  </Button>
                </CardActions>
              </div>
            </Card>
          </Grid>
        ))}
              <br></br>
      <br></br>
      <br></br>
      </Grid>
          </div>
        );
      }
export default Package;