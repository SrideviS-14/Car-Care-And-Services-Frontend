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
import { useNavigate } from 'react-router-dom';
function Services(){
  const navigate = useNavigate();
  const {jwt, setJwt } = useAuth();
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
  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = (item) => {
    
    setData(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [opendelete, setOpendelete] = React.useState(false);

 

  const handleClosedelete = () => {
    setOpen(false);
  };
  
  useEffect(() => {
    api.get('/service/getAllServices')
      .then((response) => {
        console.log(response.data);
        setcarddata(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
const [serviceToDelete, setServiceToDelete] = useState(0);

const handleDeleteConfirmationOpen = (service_ID) => {
  console.log(service_ID);
  setServiceToDelete(service_ID);
  console.log(serviceToDelete);
  setDeleteConfirmOpen(true);
};

const handledelete = async () => {
  try {
    console.log(serviceToDelete);
    const response = await api.delete("/service/deleteService", { data: { service_id: serviceToDelete } } );
    console.log('Deleted successfully!', response.data);
    setcarddata(carddata.filter(item => item.service_ID !== serviceToDelete));
    setDeleteConfirmOpen(false);
  } catch (error) {
    alert('Could not delete the service!');
    console.error('Deletion failed:', error);
  }
}

const handleDeleteConfirmationClose = () => {
  setDeleteConfirmOpen(false);
};

  
  const handleupdate = async () => {
    try {
      console.log(data);
      const response = await api.put(`/service/updateService`, data);
      console.log('Updates successfully!', response.data);
      api.get('/service/getAllServices')
      .then((response) => {
        setcarddata(response.data);
      })
      setOpen(false);
    } catch (error) {
      alert('Could not update the service!');
      console.error('Update failed:', error);
    }
  }
  
    return(
        <div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
<Grid container spacing={1}>
        {carddata.map((item) => (
          <Grid item xs={11} sm={6} key={item.service_ID}>
            <Card sx={{borderRadius:15,p:2,px:5,mb:5,marginLeft: 5, width: 550, height: 250,backgroundColor: '#F2F3F4',fontFamily:'Times New Roman, Times, serif' }}>
              <CardContent>
                <Typography variant="h5" component="div"style={{fontFamily:'Times New Roman, Times, serif'}}>
                  {item.service_Name}
                </Typography>
                <Typography color="text.secondary" style={{fontFamily:'Times New Roman, Times, serif',color:'black',fontSize:'x-large',textAlign:'right',fontFamily:'Times New Roman, Times, serif'}}>
                  ₹{item.service_Amount}
                </Typography>
                <br></br>
                <Typography variant="body2">
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions sx={{justifyContent:'center'}}>
                <Button size='medium' variant='contained' sx={{backgroundColor:'#008b8b'}}onClick={() => handleClickOpen(item)}><EditIcon /></Button>
                <Button size='medium' variant='contained' sx={{backgroundColor:'#008b8b'}} onClick={() => handleDeleteConfirmationOpen(item.service_ID)}><DeleteIcon /></Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
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
    <Button onClick={handledelete}>Delete</Button>
  </DialogActions>
</Dialog>

      <br></br>
      <Dialog
        open={open}
        onClose={handleClose}

      >
        <DialogTitle>Edit Here</DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="dense"
            id="name"
            name="email"
            label="Service Name"
            type="text"
            fullWidth
            variant="standard"
            value={data.service_Name}
            defaultValue={data.service_Name}
            onChange={(e) => setData({ ...data, service_Name: e.target.value })}
          />
          <TextField
            required
            margin="dense"
            id="name"
            name="email"
            label="Service Description"
            type="text"
            fullWidth
            variant="standard"
            value={data.description}
            defaultValue={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
          <TextField
            required
            margin="dense"
            id="name"
            name="email"
            label="Service Price"
            type="number"
            fullWidth
            variant="standard"
            value={data.service_Amount}
            defaultValue={data.service_Amount}
            onChange={(e) => setData({ ...data, service_Amount: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleupdate}>Save</Button>
        </DialogActions>
      </Dialog>
    
        </div>
    );
}
export default Services;