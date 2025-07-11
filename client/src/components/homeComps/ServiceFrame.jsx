import React from 'react';
import { Box, Typography, Card, CardActionArea, CardContent, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

function ServiceFrame() {
    const services = [
        {
            title: 'Wedding Decoration',
            description: 'Elegant floral designs for your special day.',
            link: '/weddings',
        },
        {
            title: 'Baby Shower Decoration',
            description: 'Soft, joyful blooms to welcome new life.',
            link: '/babyshower',
        },
        {
            title: 'Selling Flower Creations',
            description: 'Handcrafted bouquets for any occasion.',
            link: '/products',
        },
    ];

    return (
        <Box sx={{ borderTop: 1, borderColor: '#ccc', py: 6 }} className={'fade-up'}>
            <Typography
                variant="h4"
                align="center"
                gutterBottom
                sx={{ fontFamily: 'Baskervville SC, serif', fontStyle: 'italic', color: '#4b2e2e' }}
            >
                What Services Do We Provide?
            </Typography>

            <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
                {services.map((service, index) => (
                    <Grid item xs={10} sm={6} md={4} key={index}>
                        <Card
                            sx={{
                                borderRadius: 3,
                                backgroundColor: 'rgba(238, 172, 153,0.5)',
                                transition: 'transform 0.3s ease',
                                // color:'rgb(250, 250, 250)',
                                '&:hover': { transform: 'translateY(-5px)', backgroundColor: 'rgba(238, 172, 153, 0.15)', color:'#4b2e2e' },
                            }}
                        >
                            <CardActionArea component={Link} to={service.link}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {service.title}
                                    </Typography>
                                    <Typography variant="body2">{service.description}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default ServiceFrame;
