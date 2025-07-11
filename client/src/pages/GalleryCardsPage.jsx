import React, { useEffect, useState } from 'react';
import GalleryCard from "../components/GalleryCard.jsx";
import { Grid, CircularProgress, Box, Typography } from '@mui/material';
import {Helmet} from "react-helmet-async";

function GalleryCardsPage({ pageType }) {
    const [jsonData, setJsonData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch base JSON data (your existing gallery data)
                const response = await fetch(`/data/${pageType}.json`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch ${pageType} data`);
                }

                const data = await response.json();

                // Fetch current like counts from database
                try {
                    const likesResponse = await fetch(`${API_BASE}/api/likes/${pageType}`);
                    if (likesResponse.ok) {
                        const likeCounts = await likesResponse.json();

                        // Merge database like counts with JSON data
                        const updatedData = data.map(item => ({
                            ...item,
                            likeCount: likeCounts[item.id] || 0 // Use database count or default to 0
                        }));

                        setJsonData(updatedData);
                    } else {
                        // If likes API fails, use default counts from JSON (fallback)
                        console.warn('Failed to fetch like counts, using defaults');
                        setJsonData(data);
                    }
                } catch (likesError) {
                    console.warn('Failed to fetch like counts:', likesError);
                    // Use default counts from JSON as fallback
                    setJsonData(data);
                }

            } catch (err) {
                console.error('Failed to load data:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [pageType]);

    // Handle like updates from child components - same as before
    const handleLikeUpdate = (itemId, newLikeCount) => {
        setJsonData(prevData =>
            prevData.map(item =>
                item.id === itemId
                    ? { ...item, likeCount: newLikeCount }
                    : item
            )
        );
    };

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
                    Error loading {pageType}: {error}
                </Typography>
            </Box>
        );
    }

    const canonicalUrl = pageType ? `https://evergreenflowerscy.com/${pageType}` : "https://evergreenflowerscy.com";

    return (
        <>
            <Helmet>
                {/* Standard SEO */}
                <title>{`${pageType} Floral Design – Evergreen Flower cy, Limassol`}</title>
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
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:title" content={`${pageType} Floral Design – Evergreen Flower cy, Limassol`}/>
                <meta
                    property="og:description"
                    content="Exquisite flower shop in Kato Polemidia, Limassol. We sell and Specializing in elegant floral designs for weddings and events in Cyprus."
                />
                <meta
                    property="og:image"
                    content="https://evergreenflowerscy.com/images/icons/banner.png"
                />
                <meta property="og:image:width" content="1200"/>
                <meta property="og:image:height" content="630"/>

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:url" content={canonicalUrl}/>
                <meta name="twitter:title" content={`${pageType} Floral Design – Evergreen Flower cy, Limassol`}/>
                <meta
                    name="twitter:description"
                    content="Exquisite flower shop in Kato Polemidia, Limassol. We sell and Specializing in elegant floral designs for weddings and events in Cyprus."
                />
                <meta
                    name="twitter:image"
                    content="https://evergreenflowerscy.com/images/icons/favicon.png"
                />

                {/* Canonical URL */}
                <link rel="canonical" href={canonicalUrl}/>
                <link rel="icon" type="image/png" href="https://evergreenflowerscy.com/images/icons/favicon.png"/>
            </Helmet>
            <Grid
                container
                spacing={4}
                justifyContent="center"
                sx={{
                    paddingX: { xs: 2, sm: 4 },
                    paddingY: 6,
                }}
            >
                {jsonData.map(({ id, title, description, mainImage, gallery, likeCount }) => (
                    <Grid
                        item
                        key={id}
                        xs={12}
                        sm={6}
                        md={6}
                        lg={4}
                        xl={3}
                        sx={{
                            display: 'flex',
                            animation: "slideInBottom 1.5s ease-out forwards"
                        }}
                    >
                        <GalleryCard
                            id={id}
                            title={title}
                            description={description}
                            mainImage={mainImage}
                            gallery={gallery}
                            likeCount={likeCount}
                            pageType={pageType}
                            onLikeUpdate={handleLikeUpdate}
                        />
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export default GalleryCardsPage;