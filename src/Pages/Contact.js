import {Card, CardContent, Typography, Box, TextField, Button} from '@mui/material';

function Contact() {
    return (
        <div>
            <Card sx={{width:'600px',height:'600px',justifyContent:'center',alignContent:'center',marginLeft:'450px',marginTop:'150px'}}>
                <Typography gutterBottom variant="h6" style={{fontWeight:'bolder',textAlign:'center', fontFamily: 'Times New Roman, Times, serif' }}>
                    For further queries do reach out to us 
                </Typography>
                <CardContent>
                    <Box md={2}>
                        <Typography gutterBottom variant="subtitle1" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                            Username
                        </Typography>
                        <TextField
                            required
                            id="outlined-required"
                            label="Enter Your Username"
                            fullWidth
                        />
                    </Box>
                    <br></br>
                    <Box md={2}>
                        <Typography gutterBottom variant="subtitle1" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                            Phone Number
                        </Typography>
                        <TextField
                            required
                            id="outlined-required"
                            label="Enter Your Phone Number"
                            fullWidth
                        />
                    </Box>
                    <br></br>
                    <Box md={2}>
                        <Typography gutterBottom variant="subtitle1" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                            Please type out your further queries
                        </Typography>
                        <TextField
                            required
                            id="outlined-required"
                            multiline
                            rows={4}
                            sx={{width:'566px'}}
                        />
                    </Box>
                    <br></br>
                    <Button variant="contained" sx={{width:'100px',height:'40px',alignContent:'center',alignItems:'center',justifyContent:'center',backgroundColor:'#008b8b', marginLeft:'245px'}} color="primary">
                        Submit
                    </Button>
                </CardContent>
            </Card>
            <br></br>
            <br></br>
            <br></br>
        </div>
    )
}

export default Contact;
