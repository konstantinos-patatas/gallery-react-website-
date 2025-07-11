import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Grid, Link } from '@mui/material';

function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: 'rgba(238, 172, 153, 0.5)',
                width: '100%',
                mt: 5,
                pt: 4,
                pb: 2,
            }}
        >
            {/* Logo */}
            <Box sx={{ fontFamily: 'New Amsterdam', fontSize: '2rem', mb: 3, pl:2 }}>
                <Link component={RouterLink} to="/" underline="none" color="black">
                    E v e r g r e e n
                </Link>
            </Box>

            {/* Info Sections */}
            <Grid container spacing={6} justifyContent="flex-start" sx={{pl:3}}>
                {/* Address */}
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="h6">Address</Typography>
                    <Link
                        href="https://maps.app.goo.gl/1boZB5MBYkL6sbJcA"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ color: '#4b2e2e', fontSize: '1.1rem', display: 'block', mt: 1 }}
                    >
                        Πατριάρχη Φωτίου 28,<br /> Κάτω Πολεμίδια 4158, Κύπρος
                    </Link>
                </Grid>

                {/* Contact Us */}
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="h6">
                        <Link component={RouterLink} to="/contact" underline="none" color="black">
                            Contact Us
                        </Link>
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        Call us: <Link href="tel:25260022" sx={{ color: '#4b2e2e' }}>25 260022</Link>
                    </Typography>
                    <Typography variant="body1">
                        Personal: <Link href="tel:99424147" sx={{ color: '#4b2e2e' }}>99 424147</Link>
                    </Typography>
                </Grid>

                {/* Foody */}
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="h6">Order Online</Typography>
                    <Box mt={1}>
                        <Link
                            href="https://www.foody.com.cy/delivery/lemesos/evergreen-flowers-2000422282"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Box
                                component="img"
                                src="/images/icons/foody logo1.gif"
                                alt="Order Through Foody"
                                sx={{ borderRadius: '10px', width: '130px', height: '35px' }}
                            />
                        </Link>
                    </Box>
                </Grid>

                {/* Working hours */}
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="h6">Working hours</Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        Mon-Sat: 08:00 - 19:00
                    </Typography>
                </Grid>

                {/* Socials */}
                <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Link
                            href="https://www.instagram.com/evergreen.flowerscy/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Box
                                component="img"
                                src="/images/icons/instagram logo.png"
                                alt="Instagram"
                                sx={{ width: 40 }}
                            />
                        </Link>
                        <Link
                            href="https://www.facebook.com/evergreen.flowerscy"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Box
                                component="img"
                                src="/images/icons/facebook logo.png"
                                alt="Facebook"
                                sx={{ width: 40 }}
                            />
                        </Link>
                    </Box>
                </Grid>
            </Grid>

            {/* Bottom Line */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: 4,
                    pt: 2,
                    pb:2,
                    borderTop: '1px solid #9aa89a',
                    textAlign: 'center',
                }}
            >
                <Typography variant="body1" sx={{ mb: 0.5 }}>
                    Evergreen © 2025. All Rights Reserved
                </Typography>
                <Typography variant="body1">
                    Developed by{' '}
                    <Link
                        href="https://www.linkedin.com/in/konstantinos-patatas-bb3671355/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Konstantinos Patatas
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
}

export default Footer;
