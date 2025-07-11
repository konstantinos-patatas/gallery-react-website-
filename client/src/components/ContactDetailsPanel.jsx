import React from 'react';
import EmailForm from "./EmailForm.jsx";
import {Box, Typography} from '@mui/material'
import { Link } from '@mui/material'; // instead of react-router-dom
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';

const titleStyle = {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#333'
};

const sectionBoxStyle ={
    marginBottom: 3,
    display:'flex',
    flexDirection:'column'
}

const contentStyle = {
    fontSize: '1.2rem',
    color: '#555',
};

const ContactDetailsPanel = () => {

    return(
        <Box
            sx={{
                display:'flex',
                flexDirection:{xs:'column', md:'row'},
                justifyContent:'center',
                alignItems:'center',
                gap:2,
                marginBottom:6
            }}
            className={'fade-up'}
        >

            <EmailForm />

            <Box sx={{marginLeft:'3vw'}}>
                <Box sx={sectionBoxStyle}>
                    <Typography sx={titleStyle}>
                        Address
                    </Typography>
                    <Typography sx={contentStyle}>
                        <LocationOnIcon />Πατριάρχη Φωτίου 28,
                        Κάτω Πολεμίδια 4158, Κύπρος
                    </Typography>
                </Box>

                <Box sx={sectionBoxStyle}>
                    <Typography sx={titleStyle}>
                        Call us
                    </Typography>
                    <Link href="tel:+35799424147" sx={contentStyle}>
                        <PhoneIphoneIcon /> +357 99 42 41 47
                    </Link>
                    <Link href="tel:25260022" sx={contentStyle} >
                        <PhoneIcon /> 25 26 00 22
                    </Link>
                </Box>

                <Box sx={sectionBoxStyle}>
                    <Typography sx={titleStyle}>
                        Working Hours
                    </Typography>
                    <Typography sx={contentStyle}>
                        <AccessTimeIcon /> Mon-Sat: 08:00 - 19:00
                    </Typography>
                </Box>

                <Box sx={sectionBoxStyle}>
                    <Typography sx={titleStyle}>
                        Order Online(Through Foody)
                    </Typography >
                    <Link href="https://www.foody.com.cy/delivery/lemesos/evergreen-flowers-2000422282" target="_blank" rel="noopener noreferrer" >
                        <img src="/images/icons/foody logo1.gif" alt="Order Through Foody" style={{ borderRadius: '10px', width: '130px', height: '35px' }} />
                    </Link>
                </Box>

                <Box sx={{display:'flex',flexDirection:'column'}}>
                    <Typography sx={titleStyle}>
                       Social Media
                    </Typography >

                    <Typography>
                        <Link href={"https://www.instagram.com/evergreen.flowerscy/"} target="_blank">
                            <img src="/images/icons/instagram logo.png" alt="Instagram" className="socialIcons" />
                        </Link>
                        <Link href={"https://www.facebook.com/evergreen.flowerscy"} target={"_blank"}>
                            <img src="/images/icons/facebook logo.png" alt="Facebook" className="socialIcons" />
                        </Link>
                    </Typography>

                </Box>


            </Box>

        </Box>
    );
}

export default ContactDetailsPanel;