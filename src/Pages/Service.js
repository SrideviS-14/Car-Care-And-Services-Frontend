import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import EastIcon from '@mui/icons-material/East';
import BuildIcon from '@mui/icons-material/Build';
import SettingsIcon from '@mui/icons-material/Settings';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import CarCrashSharpIcon from '@mui/icons-material/CarCrashSharp';
import HighlightIcon from '@mui/icons-material/Highlight';
 
function Service() {
  const cardsData = [
    { title: 'Inspection & Checks', icon: EastIcon },
    { title: 'Car Repair Service', icon: BuildIcon },
    { title: 'Tyre Service', icon: LocalGasStationIcon },
    { title: 'Electronic Services', icon: ElectricCarIcon },
    { title: 'Air Conditioning Service', icon: AcUnitIcon },
    { title: 'Engine Service', icon: CarCrashSharpIcon },
    { title: 'Brake Service', icon: SettingsIcon },
    { title: 'Car Bulb Check', icon: HighlightIcon }
  ];
 
  return (
<Box display="flex" justifyContent="center" alignItems="center" marginTop="20px">
      <Card sx={{ width: 800, height: 870, justifyContent: "center", borderRadius: 12, backgroundColor: '#d7dce2' }}>
      <Typography gutterBottom variant="h5" component="div"style={{textAlign:'center',padding:5,marginTop:10}}>Book A Car Service</Typography>
      <Typography gutterBottom variant="h6" component="div"style={{textAlign:'center'}}>Experience An Exquisite On A Click </Typography><br></br>
        <Grid container spacing={2}>
          <Grid item xs={15} md={6}>
          <CardContent>
            <Box md={2}>
            <Typography gutterBottom variant="subtitle1">
              Car Number
              </Typography>
              <TextField
                required
                id="outlined-required"
                label="Enter Your Car Number"
                fullWidth
              />
            </Box>
            <br></br>
            <Box md={2}>
            <Typography gutterBottom variant="subtitle1">
              Car Model
              </Typography>
              <TextField
                required
                id="outlined-required"
                label="Enter Your Car Model"
                fullWidth
              />
            </Box>
            <br></br>
            <Box md={2}>
            <Typography gutterBottom variant="subtitle1">
              Car Company
              </Typography>
              <TextField
                required
                id="outlined-required"
                label="Enter Your Car Company"
                fullWidth
              />
            </Box>
            <br></br>
            <Box md={2}>
            <Typography gutterBottom variant="subtitle1">
              Car Type
              </Typography>
              <TextField
                required
                id="outlined-required"
                label="Enter Your Car Type"
                fullWidth
              />
              </Box>
              <Box md={2}>
            <br></br>
            <Typography gutterBottom variant="subtitle1">
              Car Number
              </Typography>
              <TextField
                required
                id="outlined-required"
                label="Enter Your Car Number"
                fullWidth
              />
            </Box>
            <br></br>
            <Box md={2}>
            <Typography gutterBottom variant="subtitle1">
              Car Colour
              </Typography>
              <TextField
                required
                id="outlined-required"
                label="Enter Your Car Colour"
                fullWidth
              />
            </Box>
            </CardContent>
          </Grid>
          <Grid item xs={12} md={6} style={{marginTop:5}}>
            <CardContent>
              <FormLabel component="legend">Select Your Services</FormLabel>
              <FormGroup>
                {cardsData.map((card, index) => (
                  <FormControlLabel
                    key={index}
                    control={<Checkbox />
                  }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <card.icon sx={{ marginRight: 1 }} /> {/* Icon with a margin */}
                      {card.title}
                    </Box>
                    }
                  />
                ))}
              </FormGroup>
            </CardContent>
            <Box width="100%" display="flex" justifyContent="center">
              <Button size="large" variant="contained" sx={{ backgroundColor: '#000080' }}>
                Book Service
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}
 
export default Service;