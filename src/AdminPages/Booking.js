
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CheckBox } from '@mui/icons-material';
import Box from '@mui/material/Box';
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
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
    useEffect(() => {
        api.get('/booking/getAllBookings')
          .then((response) => {
            console.log(response.data);
            setdata(response.data);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }, []);
      const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'booking_ID',
            headerName: 'Booking ID',
            type: 'number',
            width: 130,
            editable: true,
          },
        {
            field: 'user_ID',
            headerName: 'User ID',
            type: 'number',
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
          field: 'service_Type',
          headerName: 'Service Type',
          width: 150,
          editable: true,
        },
        {
          field: 'service_List',
          headerName: 'Service List',
          width: 150,
          editable: true,
        },
        {
          field: 'package_Amount',
          headerName: 'Package Amount',
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
              <CheckBox checked={params.value=='true'}  />
            ),
          },
          {
            field: 'active',
            headerName: 'Active',
            width: 130,
            editable: true,
            renderCell: (params) => (
              <CheckBox checked={params.value}/>
            ),
          }
          
      ];

      const rows = data.map((item) => ({
        id: item.booking_ID,
        user_ID: item.user_ID,
        booking_ID: item.booking_ID,
        active: item.active,
        time_Period_In_Days: item.time_Period_In_Days,
        paid: item.paid,
        service_Type: item.service_Type,
        service_List: item.service_List,
        package_Amount: item.package_Amount,
      }));
      
        
      return(
        <div>
            <br></br>
            <br></br>
            <br></br>
          <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        slots={{
            toolbar: GridToolbar,
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
      />
    </Box>  
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