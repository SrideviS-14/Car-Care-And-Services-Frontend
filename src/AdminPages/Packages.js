import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../Pages/AuthContext';
import {Grid,Card, CardActions,Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TextField,CardContent} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
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
  const [data, setData] = useState([]);
  const [carddata, setcarddata] = useState([]);
  const [open, setOpen] = React.useState(false);
 
  const handleClickOpen = (item) => {
   
    setData(item);
    setOpen(true);
  };
 
  const handleClose = () => {
    setOpen(false);
  };
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
 
  const handleDeleteConfirmationOpen = (service_ID) => {
    console.log(service_ID);
    setServiceToDelete(service_ID);
    setDeleteConfirmOpen(true);
  };
 
  const handleDeleteConfirmationClose = () => {
    setDeleteConfirmOpen(false);
  };
  const handledelete = async () => {
    try {
      const response = await api.delete(`/service/deleteService/${serviceToDelete}`);
      console.log('Deleted successfully!', response.data);
      setpackagedata(carddata.filter(item => item.service_ID !== serviceToDelete));
      window.location.reload();
      setDeleteConfirmOpen(false);
    } catch (error) {
      alert('Could not delete the service!');
      console.error('Deletion failed:', error);
    }
  }
   
    const handleupdate = async () => {
      try {
        console.log(data);
        const response = await api.put(`/service/updateService`, data);
        console.log('Updates successfully!', response.data);
        api.get('/service/getAllPackages')
        .then((response) => {
          setpackagedata(response.data);
        })
        setOpen(false);
      } catch (error) {
        alert('Could not update the service!');
        console.error('Update failed:', error);
      }
    }
    return (
      <div>
              <h1 style={{ color: 'black', justifyContent: 'center', marginTop: '50px' }}>Package Updation</h1>
      <p style={{ textAlign: 'center', fontSize: 'x-large', color: 'black', justifyContent: 'center', marginTop: '25px' }}>
        Update or Delete Packages!
      </p>
      <Grid container spacing={4} style={{ marginTop: '10px', justifyContent: 'center'}}>
        {packagedata.map((item) => (
          <Grid item key={item.service_ID} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Card style={{backgroundColor:'#F2F3F4',width:'400px',height:'400px',fontFamily:'Times New Roman, Times, serif',fontSize:'large',color:'black',borderColor:'#d4af37',borderRadius:'15px',border:'5px 5px 5px 5px'}}>
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
                <Button size='medium' variant='contained' sx={{backgroundColor:'#bc0808'}} onClick={() => handleClickOpen(item)}><EditIcon /></Button>
                <Button size='medium' variant='contained' sx={{backgroundColor:'#bc0808'}} onClick={() => handleDeleteConfirmationOpen(item.service_ID)}><DeleteIcon /></Button>
                </CardActions>
              </div>
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
            multiline
            maxRows={5}
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
