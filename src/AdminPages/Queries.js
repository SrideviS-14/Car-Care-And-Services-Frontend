import React, { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField,Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAuth } from '../Pages/AuthContext.js';
import AddIcon from '@mui/icons-material/Add';

function Services(){
  const {jwt} = useAuth();
  const [data, setData] = useState([]);
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
  const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": 'application/json'
    }, // Change this to your actual backend URL
  });
  const [carddata, setcarddata] = useState([]);
 
  useEffect(() => {
    api.get('/query/getAllQueries')
      .then((response) => {
        console.log(response.data);
        setcarddata(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
 
    return(
        <div>
           <h1 style={{ color: 'black', justifyContent: 'center', marginTop: '50px' }}>Query List</h1>
      <p style={{ textAlign: 'center', fontSize: 'x-large', color: 'black', justifyContent: 'center', marginTop: '25px' }}>
        View the list of queries
      </p>
<br></br><br></br>
<Grid container spacing={1}>
        {carddata.map((item) => (
            <Card  key={item.service_ID} sx={{borderRadius:15,p:2,px:5,mb:5,marginLeft: 5, width: 250, height: 200,backgroundColor: '#F2F3F4',fontFamily:'Times New Roman, Times, serif',display:'flex' }}>
              <CardContent>
                <Typography variant="h5" component="div"style={{fontFamily:'Times New Roman, Times, serif'}}>
                  {item.query}
                </Typography>
              </CardContent>
            </Card>
        ))}
      </Grid>
   
        </div>
    );
}
export default Services;