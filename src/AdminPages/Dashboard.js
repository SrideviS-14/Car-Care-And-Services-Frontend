import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../Pages/AuthContext';
import axios from 'axios';
import Chart from 'chart.js/auto';
import myChart from 'chart.js/auto'
import {Card,Grid, Typography,Box} from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
const AdminDashboard = () => {
    const [data, setData] = useState({});
    const lineChartRef = useRef(null);
const barChartRef = useRef(null);
    const {jwt, setJwt } = useAuth();
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
    const api = axios.create({
        baseURL: 'http://localhost:8080',
        headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": 'application/json'
        },
    });
    const labels = ["Standard Package","Classic Package","Premium Package"];
const chartData = {
  labels: labels,
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    backgroundColor: [
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)'
    ],
    borderColor: [
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',

    ],
    borderWidth: 1
  }]
};
const config = {
    type: 'bar',
    data: chartData,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };
  

useEffect(() => {
    api.get('/booking/getAllBookings')
    .then(response => {
        const responseData = response.data;
        const bookingIDs = Array.from(responseData.map(item => `Booking ${item.booking_ID}`));
        const amount = Array.from(responseData.map(item => item.package_Amount));
        if (Array.isArray(responseData)) {
            setData({
                labels: bookingIDs,
                datasets: [
                    {
                        label: 'Package Amount',
                        data: amount,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderWidth: 1,
                        fill: true,
                        tension: 0.1
                    },
                ],
            });
        }
    });
}, []);

useEffect(() => {
    const ctx = document.getElementById('chart1');
    if (lineChartRef.current) {
        lineChartRef.current.destroy();  // Destroy the previous chart
    }
    lineChartRef.current = new Chart(ctx, {
        type: 'line',
        data: data
    });
}, [data]);

useEffect(() => {
    const ctx = document.getElementById('chart2');
    if (barChartRef.current) {
        barChartRef.current.destroy();  // Destroy the previous chart
    }
    barChartRef.current = new Chart(ctx, config);  // Use the config object here
}, [data]);


    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            return 0;
          }
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 100);
        });
      }, 500);
  
      return () => {
        clearInterval(timer);
      };
    }, []);

    return (
        <div>
            <br></br>
            <br></br>
           <Grid container spacing={3}>
            <Grid item xs={4}>
                <Card sx={{width:'450px',height:'250px'}}>
                    <Typography variant='h4' sx={{fontFamily: 'Times New Roman, Times, serif',marginTop:'10%',marginLeft:'15%'}}>Total Income</Typography>
                    <br></br>
                    <Typography variant='h4' sx={{fontFamily: 'Times New Roman, Times, serif',marginLeft:'15%'}}>$7.8M</Typography>
                    <br></br>
                    <Box sx={{ width: '100%' }}>
      <LinearProgress variant="determinate" value={progress} sx={{  borderRadius:'5px',justifyContent:'center',marginLeft:'15%',alignContent:'center',height:'10px',width:'300px'}} />
    </Box>
                </Card>
                <br></br>
                <Card sx={{width:'450px',height:'250px'}}>
                <Typography variant='h5' sx={{fontFamily: 'Times New Roman, Times, serif',marginTop:'5%',marginLeft:'15%'}}>Orders Completed</Typography>
                    <Typography variant='h6' sx={{fontFamily: 'Times New Roman, Times, serif',marginLeft:'15%'}}>1500</Typography>
                    <br></br>
                    <Box sx={{ width: '100%' }}>
      <LinearProgress variant="determinate" value={progress} sx={{  borderRadius:'5px',justifyContent:'center',marginLeft:'15%',alignContent:'center',height:'10px',width:'300px'}} />
    </Box>
                    <Typography variant='h5' sx={{fontFamily: 'Times New Roman, Times, serif',marginTop:'3%',marginLeft:'15%'}}>Orders Pending</Typography>
                    <Typography variant='h6' sx={{fontFamily: 'Times New Roman, Times, serif',marginLeft:'15%'}}>150</Typography>
                    <br></br>
                    <Box sx={{ width: '100%' }}>
      <LinearProgress variant="determinate" value={progress} sx={{  borderRadius:'5px',justifyContent:'center',marginLeft:'15%',alignContent:'center',height:'10px',width:'300px'}} />
    </Box>
                </Card>
            </Grid>
            <Grid item xs={4} justifyContent="center" alignItems="center">
                <canvas id="chart1" style={{width:'400px', height:'300px',marginLeft:'5%'}}></canvas>
            </Grid>
            <Grid item xs={4}>
                <Card id="card3" sx={{width:'450px',height:'250px'}}>
                <canvas id="chart2" ></canvas>
                </Card>
                <br></br>
                <Card sx={{width:'450px',height:'250px'}}>
                    <h1>Card 4</h1>
                </Card>
            </Grid>
        </Grid>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        </div>
    );
};

export default AdminDashboard;
