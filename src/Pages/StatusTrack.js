import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';
import LinearProgress from '@mui/material/LinearProgress';
 
const StatusTrack = () => {
    const [data, setdata] = useState([]);
    const {jwt} = useAuth();
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
    const api = axios.create({
      baseURL: 'http://localhost:8080',
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": 'application/json'
      },
    });
    useEffect(() => {
        api.get('/booking/getBookingsOfUser')
        .then((response) => {
          setdata(response.data);
          console.log(data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
        }, []);
    return (
        <div>
            <h2>Status Track Page</h2>
            {data.map((item) => {
                return (
                    <div key={item.booking_ID}>
                        <h2>{item.booking_ID}</h2>
                        <label>Status: {item.status}</label>
                        <LinearProgress variant="determinate" value={item.status === 'completed' ? 100 : item.status === 'pending' ? 50 : item.status === 'confirmed' ? 25 : 0} />
                    </div>
                )
            })}
        </div>
    );
};
 
export default StatusTrack;