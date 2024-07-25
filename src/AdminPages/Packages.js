import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../Pages/AuthContext';
import {Grid,Card, CardActions,Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CardContent,Snackbar, IconButton } from '@mui/material';
 
function Packages() {
  const navigate = useNavigate();
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
    api.get('/service/getAllPackages')
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
      <Grid container spacing={4} style={{ marginTop: '180px', justifyContent: 'center'}}>
        {packagedata.map((item) => (
          <Grid item key={item.service_ID} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Card style={{backgroundColor:'#dcdcdc',width:'400px',height:'400px',fontFamily:'Times New Roman, Times, serif',fontSize:'large',color:'black',borderColor:'#d4af37',borderRadius:'15px',border:'5px 5px 5px 5px'}}>
              <CardContent>
                <div style={{textAlign:'left'}}>{item.service_Name}</div><br></br>
                <div style={{textAlign:'left'}}>₹{item.service_Amount}</div>
                <ul>
          {item.description.split(',').map((service) => (
            <li>{service}</li>
          ))}
        </ul>
                           </CardContent>
                           <div className="button-container" style={{ display:'flex',justifyContent:'center'}}>
                <CardActions>
                <Button size='medium' variant='contained' sx={{backgroundColor:'#000080'}}><EditIcon /></Button>
                <Button size='medium' variant='contained' sx={{backgroundColor:'#000080'}}><DeleteIcon /></Button>
                </CardActions>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
      <br></br>
        <br></br>
          <br></br>
          <br></br>
        <br></br>
          <br></br>
          </div>
        );
      }
export default Packages;