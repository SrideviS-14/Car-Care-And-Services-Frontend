import { useEffect, useState } from 'react';
import axios from 'axios';
import {  Checkbox, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useAuth } from '../Pages/AuthContext';
 
function Booking(){
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
    const [data,setdata]=useState([]);
    const [userData,setUserData]=useState([]);
    const [serviceData,setServiceData]=useState([]);
    const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [checkedStatus, setCheckedStatus] = useState({});
  const [confirmOpen, setConfirmOpen] = useState(false);
const [pendingCheck, setPendingCheck] = useState(null);
  const handleCellClick = (params) => {
    if (params.field === 'user_ID') {
      const user = userData.find((user) => user.userName === params.value);
      setSelectedUser(user);
      setOpen(true);
    }
  };
 
  const handleClose = () => {
    setOpen(false);
  };
 
    useEffect(() => {
      api.get('/booking/getAllBookings')
      .then((response) => {
        setdata(response.data);
        // Reset checked status
        const newCheckedStatus = {};
        response.data.forEach((item) => {
          newCheckedStatus[item.booking_ID] = item.paid;
        });
        setCheckedStatus(newCheckedStatus);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
        api.get('/account/getAllUsers')
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error(error);
        })
        api.get('/service/getAllServicesAndPackages')
        .then((response) => {
          setServiceData(response.data);
        })
        .catch((error) => {
          console.error(error);
        })
      }, []);
      const columns = [
        {
            field: 'booking_ID',
            headerName: 'Booking ID',
            type: 'number',
            width: 130,
            editable: true,
          },
        {
            field: 'user_ID',
            headerName: 'User Name',
            width: 130,
            editable: true,
          },
        {
          field: 'time_Period_In_Days',
          headerName: 'Time Period (Days)',
          type: 'number',
          width: 180,
          editable: true,
        },
        {
          field: 'service_List',
          headerName: 'Services Bought',
          width: 150,
          editable: true,
        },
        {
          field: 'package_Amount',
          headerName: 'Bill Amount',
          type: 'number',
          width: 150,
          editable: true,
        },
        {
          field: 'paid',
          headerName: 'Paid',
          width: 130,
          editable: true,
          renderCell: (params) => (
            <Checkbox
              checked={checkedStatus[params.id] || false}
              onChange={(event) => {
                console.log(`Checkbox clicked for booking ID ${params.id}`);
                console.log(`Paid status: ${event.target.checked}`); // This will log the 'paid' value
                // Store the pending checkbox change and open the confirmation dialog
                setPendingCheck({ id: params.id, checked: event.target.checked });
                setConfirmOpen(true);
              }}
            />
          ),
        }      
         
      ];
      const userIdToUsername = {};
        userData.forEach(user => {
          userIdToUsername[user.id] = user.userName;
      });
 
      const serviceIdToServicename = {};
      serviceData.forEach(service => {
        serviceIdToServicename[service.service_ID] = service.service_Name;
    });
   
    const splitString = (service_List) => {
      return service_List.split(', ').map(id => serviceIdToServicename[id]);
    }
      const rows = data.map((item) => ({
        id: item.booking_ID,
        user_ID: userIdToUsername[item.user_ID] || item.user_ID,
        booking_ID: item.booking_ID,
        active: item.active,
        time_Period_In_Days: item.time_Period_In_Days,
        paid: item.paid,
        service_Type: item.service_Type,
        service_List: splitString(item.service_List).join(', '),
        package_Amount: item.package_Amount,
      }));
     
      const handleConfirm = () => {
        const { id, checked } = pendingCheck;
        setCheckedStatus({
          ...checkedStatus,
          [id]: checked,
        });
        api.put(`/booking/updateBookingPayment/${id}`, { paid: checked })
          .then((response) => {
            console.log(`Updated paid status for booking ID ${id}:`, response.data);
          })
          .catch((error) => {
            console.error(`Error updating paid status for booking ID ${id}:`, error);
          });
        setConfirmOpen(false);
      };
     
      return(
        <div>
            <br></br>
            <br></br>
            <br></br>
          <Box sx={{ height: 700, width: '100%' }}>
          <DataGrid
  rows={rows}
  columns={columns}
  slots={{
      toolbar: GridToolbar,
  }}
  initialState={{
    pagination: {
      paginationModel: {
        pageSize: 10,
      },
    },
  }}
 
  pageSizeOptions={[10]}
  onCellClick={handleCellClick}
 
/>
 
    </Box>  
    <Dialog open={open} onClose={handleClose} maxWidth={'xl'} >
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
          {selectedUser &&
        <>
          Username: {selectedUser.userName}<br />
          Email: {selectedUser.email}<br />
          Phone Number: {selectedUser.phoneNumber}
        </>
      }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
  <DialogTitle>Confirm Change</DialogTitle>
  <DialogContent>
    <DialogContentText>
      Are you sure you want to change the paid status?
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setConfirmOpen(false)}>No</Button>
    <Button onClick={handleConfirm}>Yes</Button>
  </DialogActions>
</Dialog>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
        </div>
    );
}
export default Booking;