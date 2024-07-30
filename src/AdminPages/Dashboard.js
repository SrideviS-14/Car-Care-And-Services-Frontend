import React from 'react';
import {Grid} from '@mui/material';
const AdminDashboard = () => {
    return (
        <div>
            <h1 style={{ color: 'black', justifyContent: 'center', marginTop: '75px' }}>Welcome to Admin Dashboard</h1>
                <iframe title="CarCareAndServicesDashboard" style={{backgroundColor:'#5f9ea0',justifyContent:'center',marginLeft:'75px',marginBottom:'50px'}}width="1300" height="700" src="https://app.powerbi.com/reportEmbed?reportId=bc51f44c-5793-4673-86db-67b2847fd9c8&autoAuth=true&ctid=00a2f2d9-1d7b-4a75-adb1-0c64636b806b" frameborder="0" allowFullScreen="true"></iframe>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        </div>
    );
};
 
export default AdminDashboard;