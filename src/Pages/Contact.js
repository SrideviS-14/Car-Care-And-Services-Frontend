import {Card, CardContent, Typography, Box, TextField, Button} from '@mui/material';

function Contact() {
    return (
        <div>
            <Card sx={{width:'600px',height:'350px',justifyContent:'center',alignContent:'center',marginLeft:'450px',marginTop:'180px'}}>
                <Typography gutterBottom variant="h6" style={{fontWeight:'bolder',textAlign:'center', fontFamily: 'Times New Roman, Times, serif' }}>
                    For further queries do reach out to us 
                </Typography>
                <CardContent>
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
                    <Button variant="contained" sx={{width:'100px',height:'40px',alignContent:'center',alignItems:'center',justifyContent:'center',backgroundColor:'#bc0808', marginLeft:'235px'}} color="primary">
                        Submit
                    </Button>
                </CardContent>
            </Card>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </div>
    )
}

export default Contact;
