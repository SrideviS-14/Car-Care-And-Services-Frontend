import { useEffect, useState } from 'react';
import axios from 'axios';
import {  Checkbox, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useAuth } from '../Pages/AuthContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
 
const theme = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: '#5f9ea0',
            color: 'white',
          },
 
          '& .MuiDataGrid-toolbarContainer': {
            backgroundColor: '#D7E4E3',
            color: 'black', // Change this to the color you want for the text/icons
          },
          '& .MuiDataGrid-pagination': {
            color: 'white', // Change this to the color you want for the text/icons
          },
        },
      },
    },
  },
});
 
 
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
  const [pendingStatus, setPendingStatus] = useState(null);
const [statusConfirmOpen, setStatusConfirmOpen] = useState(false);
 
 
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
            headerName: 'BOOKING_ID',
            type: 'number',
            width: 130,
            editable: false,
          },
        {
            field: 'user_ID',
            headerName: 'USERNAME',
            width: 130,
            editable: false,
          },
        {
          field: 'time_Period_In_Days',
          headerName: 'TIME PERIOD (DAYS)',
          type: 'number',
          width: 180,
          editable: false,
        },
        {
          field: 'service_List',
          headerName: 'SERVICES BOUGHT',
          width: 150,
          editable: false,
        },
        {
          field: 'package_Amount',
          headerName: 'BILL AMOUNT',
          type: 'number',
          width: 150,
          editable: false,
        },
        {
          field: 'paid',
          headerName: 'PAID',
          width: 130,
         
          editable: true,
          renderCell: (params) => (
            <Checkbox
            defaultChecked color="default"
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
        },
        {
          field: 'status',
          headerName: 'STATUS',
          width: 150,
          editable: true,
          renderCell: (params) => (
            <select
            style={{width:'90px',height:'35px'}}
              value={params.value}
              onChange={(event) => {
                console.log(`Status changed for booking ID ${params.id}`);
                console.log(`New status: ${event.target.value}`);
                // Store the pending status change and open the confirmation dialog
                setPendingStatus({ id: params.id, status: event.target.value });
                setStatusConfirmOpen(true);
              }}
            >
              <option style={{width:'50px',borderRadius:'5px',height:'50px'}} value="confirmed">Confirmed</option>
              <option style={{width:'50px',borderRadius:'5px',height:'50px'}} value="pending">Pending</option>
              <option style={{width:'50px',borderRadius:'5px',height:'50px'}} value="completed">Completed</option>
            </select>
          ),
        } ,
        {
          field: 'details',
          headerName: 'DETAILS',
          width: 150,
          renderCell: (params) => (
            <IconButton
              onClick={() => {
                const user = userData.find((user) => user.userName === params.row.user_ID);
                setSelectedUser(user);
                setOpen(true);
              }}
              title="Customer Details"
            >
              <InfoIcon />
            </IconButton>
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
        status: item.status
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
      const handleStatusConfirm = () => {
        const { id, status } = pendingStatus;
        console.log(status);
        api.put(`/booking/updateBookingStatus/${id}`, JSON.stringify(status))
          .then((response) => {
            window.location.reload();
            console.log(`Updated status for booking ID ${id}:`, response.data);
          })
          .catch((error) => {
            console.error(`Error updating status for booking ID ${id}:`, error);
          });
        setStatusConfirmOpen(false);
    };    
     
      return(
        <div >
                     <h1 style={{ color: 'black', justifyContent: 'center', marginTop: '50px' }}>Orders Log</h1>
      <p style={{ textAlign: 'center', fontSize: 'x-large', color: 'black', justifyContent: 'center', marginTop: '25px' }}>
        Update Bookings Of Users
      </p>
 
          <Box sx={{height: 730, width: '80%',alignContent:'center',alignItems:'center',justifyContent:'center',marginLeft:'170px' }}>
          <ThemeProvider theme={theme}>
            <DataGrid
              sx={{borderRadius:'15px',backgroundColor:'#5f9ea0  ',color:'white'}}
              rows={rows}
              columns={columns}
              slots={{
                  toolbar: GridToolbar,
              }}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 11,
                  },
                },
              }}
              pageSizeOptions={[11]}
              onCellClick={handleCellClick}
            />
          </ThemeProvider>
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
<Dialog open={statusConfirmOpen} onClose={() => setStatusConfirmOpen(false)}>
  <DialogTitle>Confirm Change</DialogTitle>
  <DialogContent>
    <DialogContentText>
      Are you sure you want to change the status?
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setStatusConfirmOpen(false)}>No</Button>
    <Button onClick={handleStatusConfirm}>Yes</Button>
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
export default Booking;
 