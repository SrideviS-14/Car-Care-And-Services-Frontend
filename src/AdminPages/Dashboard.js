import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../Pages/AuthContext';
import axios from 'axios';
import Chart from 'chart.js/auto';
import {Card,Grid, Typography,Box} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const AdminDashboard = () => {
    const [data, setData] = useState({});
    const lineChartRef = useRef(null);
    const lineChartRef1 =useRef(null);
    const scatterChartRef = useRef(null);
    const barChartRef = useRef(null);
    const piechartref = useRef(null);
    const [statusData, setStatusData] = useState({});
    const [packageData, setPackageData] = useState({});
    const [monthData, setMonthData] = useState({});
    const {jwt, setJwt } = useAuth();
    const [salesData, setSalesData] = useState('');  // New state variable for sales data
    const salesChartRef = useRef(null);
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
    const api = axios.create({
        baseURL: 'http://localhost:8080',
        headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": 'application/json'
        },
    });
    
    const chartdata3 = {
    labels: ['January','February','March','April','May','June','July','August','Septmeber','October','November','December'],
    datasets: [{
    label: 'My First Dataset',
    data: [monthData.January, monthData.February, monthData.March, monthData.April, monthData.May, monthData.June, monthData.July, monthData.August, monthData.Septmeber, monthData.October, monthData.November, monthData.December],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
    }]
    };
    
    const lineChartConfig = {
    type: 'line',
    data: chartdata3,
    };
    
    useEffect(() => {
    const ctx = document.getElementById('chart4');
    if (lineChartRef1.current) {
        lineChartRef1.current.destroy();  // Destroy the previous chart
    }
    lineChartRef1.current = new Chart(ctx, lineChartConfig);
    }, [data]);
    
    const chartdata2 = {
        labels: [
          'Orders Pending',
          'Orders Confirmed',
          'Orders Completed',
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [statusData.Pending, statusData.Confirmed, statusData.Completed],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      };
    const pieChartConfig = {
        type: 'pie',
        data: chartdata2,
    };
    
    useEffect(() => {
        const ctx = document.getElementById('chart3');
        if (piechartref.current) {
            piechartref.current.destroy();  // Destroy the previous chart
        }
        piechartref.current = new Chart(ctx, pieChartConfig);
    }, [data]);

    const labels = ["Standard Package","Classic Package","Premium Package"];
    const chartData = {
    labels: labels,
    datasets: [{
    label: 'My First Dataset',
    data: [packageData.Standard, packageData.Classic, packageData.Premium],
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
    const barchartConfig = {
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
      api.get('/dashboard/getCountOfStatus')
      .then(response => {
        console.log(response.data);
        setStatusData(response.data)
      });
      api.get('/dashboard/getPackageStatus')
      .then(response => {
        console.log(response.data);
        setPackageData(response.data)
      });
      api.get('/dashboard/getMonthlyOrders')
      .then(response => {
        console.log(response.data);
        setMonthData(response.data)
      });
      }, []);
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
    barChartRef.current = new Chart(ctx, barchartConfig);  // Use the config object here
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
    
    const scatterdata1 = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [{
            label: 'Scatter Dataset',
            data: [15, 10, 25, 30, 35, 5, 10],
            backgroundColor: 'rgb(255, 99, 132)',
            showLine: false // This will give a scatter-like appearance
        }]
    };
    
    const scatterconfig = {
        type: 'line', // Change this to 'line'
        data: scatterdata1,
    };
    
    
    useEffect(() => {
        const ctx = document.getElementById('chart5');
        if (scatterChartRef.current) {
            scatterChartRef.current.destroy();  // Destroy the previous chart
        }
        scatterChartRef.current = new Chart(ctx, scatterconfig);  // Use the config object here
    }, [data]);
    useEffect(() => {
      api.get('/dashboard/getTotalSales')  // Assuming this endpoint returns total sales data
      .then(response => {
          console.log(response.data);
          setSalesData(response.data)  // Set the fetched sales data
      });
  }, []);
    return (
        <div>
            <h1 style={{ color: 'black', justifyContent: 'center', marginTop: '75px' }}>Welcome to our Admin Dashboard</h1>
            <p style={{ textAlign: 'center', fontSize: 'x-large', color: 'white', justifyContent: 'center', marginTop: '75px'}}>
              View the statistics of the WheelsUp sales performance!
            </p>
           <Grid container spacing={8} sx={{marginleft:'5px', backgroundColor:'#000080'}} >
            <Grid item xs={4} sx={{marginleft:'5px'}}>
                <Card sx={{width:'490px',height:'300px',textAlign:'center'}}>
                    <Typography variant='body' sx={{textAlign:'center',marginTop:"15%"}}>Monthly Number Of People Opted For Service</Typography>
                    <br></br>
                    <br></br>
                    <canvas id='chart4'></canvas>
                </Card>
                <br></br>
                <Card sx={{width:'490px',height:'300px',textAlign:'center'}}>
                    <Typography variant='body' sx={{textAlign:'center',marginTop:"15%"}}>Total Sales of the Company</Typography>
                    <br></br>
                    <br></br>
                    <div style={{ fontSize: '2em', alignContent: 'center', justifyContent:'center'}}>
                        <AttachMoneyIcon />  {/* Add the money icon here */}<br></br>
                        {salesData}
                    </div>
            </Card>
            </Grid>
            <Grid item xs={4}>
                <Card id="card3"sx={{width:'490px',height:'300px',textAlign:'center'}}>
                <Typography variant='body'sx={{textAlign:'center',marginTop:"15%"}}>Maxmium Opted For Packages</Typography>    
                <br></br>
                <br></br>
                <canvas id="chart2" ></canvas>
                </Card>
                <br></br>
                <Card sx={{width:'490px',height:'300px',textAlign:'center'}}>
                <Typography variant='body'sx={{textAlign:'center',marginTop:"5%"}}>Relationship between the booking and Amount</Typography> 
                <br></br>
                <br></br>
                <canvas id="chart1" ></canvas>
                </Card>
            </Grid>
            <Grid item xs={4}>
                    <Card sx={{width:'430px',height:'618px'}}>
                <br></br>
                <Typography variant='h5' sx={{fontFamily: 'Times New Roman, Times, serif',marginTop:'5%',marginLeft:'15%'}}>Orders Completed</Typography>
                <canvas id="chart3" style={{width:'100%', height:'100%'}}></canvas>
                    <br></br>
                </Card>
                <br></br><br></br>
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