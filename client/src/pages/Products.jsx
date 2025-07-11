import React, { useEffect, useState } from 'react';
import {Box, CircularProgress, Grid, Typography} from '@mui/material'; //responsive page using grids
import ProductCard from '../components/ProductCard.jsx';
import {Helmet} from "react-helmet-async";

function Products() {
    const [jsonData, setJsonData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch JSON
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(`/data/introProducts.json`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch products data`);
                }

                const data = await response.json();
                setJsonData(data);

            } catch (err) {
                console.error('Failed to load data:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    //create a loading circle
    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '400px'
                }}
            >
                <CircularProgress size={60} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '400px'
                }}
            >
                <Typography color="error" variant="h6">
                    Error loading Products: {error}
                </Typography>
            </Box>
        );
    }


    return (
        <>
            <Helmet>
                {/* Standard SEO */}
                <title>Evergreen Flower cy – Shop Our floral products</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta
                    name="description"
                    content="Visit Evergreen Flower Shop in Kato Polemidia, Limassol. We specialize in floral arrangements, wedding and baby shower decorations, and custom designs."
                />
                <meta
                    name="keywords"
                    content="Evergreen, flower shop, Limassol, Kato Polemidia, Cyprus, wedding flowers, baby shower flowers, floral design"
                />

                {/* Open Graph for Facebook & LinkedIn */}
                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://evergreenflowerscy.com/products"/>
                <meta property="og:title" content="Evergreen Flower cy – Shop Our floral products"/>
                <meta
                    property="og:description"
                    content="Exquisite flower shop in Kato Polemidia, Limassol. Specializing in elegant floral design for weddings and events in Cyprus."
                />
                <meta
                    property="og:image"
                    content="https://evergreenflowerscy.com/images/icons/banner.png"
                />
                <meta property="og:image:width" content="1200"/>
                <meta property="og:image:height" content="630"/>

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:url" content="https://evergreenflowerscy.com/products"/>
                <meta name="twitter:title" content="Evergreen Flower cy – Shop Our floral products"/>
                <meta
                    name="twitter:description"
                    content="Elegant floral arrangements and wedding,baby shower decor by Evergreen in Kato Polemidia, Limassol."
                />
                <meta
                    name="twitter:image"
                    content="https://evergreenflowerscy.com/images/icons/banner.png"
                />

                {/* Canonical URL */}
                <link rel="canonical" href="https://evergreenflowerscy.com/products"/>
                <link rel="icon" type="image/png" href="https://evergreenflowerscy.com/images/icons/favicon.png"/>
            </Helmet>


            <Grid
                container
                spacing={4}
                justifyContent="center"
                sx={{
                    paddingX: { xs: 2, sm: 4 }, paddingY: 6, //responsive padding
                    //styling to keep all items to adjust the size off the tallest one
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: 4,
                    alignItems: 'stretch'
                }}
            >
                {/*wrap the products in the box to all match the biggest one*/}

                {jsonData.map(({title,description,perfectFor,imgSrc,url}, index) => (
                    <Grid item key={index} xs={12} sm={6} md={6} lg={4} xl={3} style={{animation: "slideInBottom 1.5s ease-out forwards"}}>
                        <ProductCard
                            title = {title}
                            description = {description}
                            perfectFor = {perfectFor}
                            imgSrc={imgSrc}
                            url={url}
                        />
                    </Grid>

                ))}
            </Grid>
        </>
    );
}

export default Products;