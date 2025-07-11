import React, { useState, useEffect } from 'react';
import {
    Box, Card, CardMedia, CardContent, CardActions,
    Typography, Button, Dialog, DialogContent, IconButton
} from '@mui/material';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Visibility } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const GalleryCard = ({ id, title, description, mainImage, gallery, likeCount, pageType, onLikeUpdate }) => {
    const [open, setOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [liked, setLiked] = useState(false);
    const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);
    const [loading, setLoading] = useState(false);
    const [visitorId, setVisitorId] = useState(null);
    const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

    //opens the modal
    const handleOpen = () => {
        setCurrentIndex(0);
        setOpen(true);
    };
    //cloes modal
    const handleClose = () => setOpen(false);

    //previous and next image functionality for the modal gallery
    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? gallery.length - 1 : prevIndex - 1
        );
    };
    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === gallery.length - 1 ? 0 : prevIndex + 1
        );
    };

    // Initialize FingerprintJS and get visitorId once on mount, which uses unique ways to create the id for each device
    useEffect(() => {
        const initFingerprint = async () => {
            const fp = await FingerprintJS.load();
            const result = await fp.get();
            setVisitorId(result.visitorId);
        };
        initFingerprint();
    }, []);

    // Check like.js status once visitorId is available to fill the heart or not
    useEffect(() => {
        if (!visitorId) return;

        const checkLikeStatus = async () => {
            try {
                const response = await fetch(`${API_BASE}/api/check-like/${pageType}/${id}/${visitorId}`);
                if (response.ok) {
                    const data = await response.json();
                    setLiked(data.hasLiked);
                }
            } catch (error) {
                console.error('Error checking like.js status:', error);
            }
        };

        checkLikeStatus();
    }, [id, pageType,API_BASE, visitorId]);

    //set the like.js count
    useEffect(() => {
        setCurrentLikeCount(likeCount);
    }, [likeCount]);


    const handleLike = async () => {
        if (!visitorId) return;

        try {
            //sending request with post in the app.post of node.js
            const response = await fetch(`${API_BASE}/api/like`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ itemId: id, pageType, visitorId }), //values to be sent
            });

            if (response.ok) {
                const data = await response.json(); //res.json sent from node backend
                //change to the state og count and emoji sent from json values from node
                setLiked(data.liked);
                setCurrentLikeCount(data.newLikeCount);

                // Optional: Show brief feedback
                console.log(`Item ${data.action} successfully`);

                // Notify parent component to update the data
                if (onLikeUpdate) {
                    onLikeUpdate(id, data.newLikeCount);
                }

            } else {
                const errorData = await response.json();
                alert(`Failed to ${liked ? 'unlike' : 'like.js'}: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('Network error. Please check your connection.');
        } finally {
            setLoading(false);
        }

    };

    return (
        <>
            <Card sx={{
                height: '100%',
                display: 'flex',
                flexDirection:'column',
                width: '100%',
                minWidth: 250,
                maxWidth: 450,
                margin: 'auto',
                boxShadow: 8,
                borderRadius: 4,
                '&:hover': {
                    transform: 'scale(1.02)',
                },
            }}>
                <Box
                    sx={{
                        position: 'relative',
                        cursor: 'pointer',
                        '&:hover .overlay': {
                            opacity: 1,
                        },
                    }}
                    onClick={handleOpen}
                >
                    <CardMedia
                        component="img"
                        image={mainImage}
                        alt={title}
                        style={{
                            width: "100%",
                            height: "300px",
                            objectFit: "cover",
                        }}
                    />
                    <Box
                        className="overlay"
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            color: 'white',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            opacity: 0,
                            transition: 'opacity 0.3s ease',
                            borderRadius: '4px 4px 0 0'
                        }}
                    >
                        <Visibility sx={{ mr: 1 }} />
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            View Gallery
                        </Typography>
                    </Box>
                </Box>

                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>

                <CardActions sx={{display:'flex',justifyContent:"space-between",alignItems:"center", px:3}}>
                    <Button
                        onClick={handleOpen}
                        sx={{
                            width:"80%",
                            borderRadius:"20px",
                            backgroundColor:'rgba(238, 172, 153,0.7)',
                            color:'black',
                            fontSize:'medium'
                        }}
                        variant="contained"
                    >
                        <Visibility sx={{ mr: 1 }} /> View Gallery
                    </Button>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton
                            onClick={handleLike}
                            color={liked ? 'error' : 'default'}
                            disabled={loading}
                            sx={{
                                fontSize: 32,
                                '&:disabled': {
                                    opacity: 0.6
                                },
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    transform: 'scale(1.1)',
                                    backgroundColor: liked ? 'rgba(244, 67, 54, 0.1)' : 'rgba(0, 0, 0, 0.04)'
                                }
                            }}
                            title={liked ? 'Unlike this item' : 'Like this item'}
                        >
                            {liked ? (
                                <Favorite sx={{ fontSize: 32 }} />  // icon size
                            ) : (
                                <FavoriteBorder sx={{ fontSize: 32 }} />
                            )}
                        </IconButton>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ fontSize: '1.25rem'}}
                        >
                            {currentLikeCount}
                        </Typography>
                    </Box>
                </CardActions>
            </Card>

            {/* Modal Slideshow */}
            <Dialog
                open={open}
                onClose={handleClose}
                fullScreen
                PaperProps={{
                    sx: {
                        backgroundColor: 'rgba(0,0,0,0.9)',
                    },
                }}
                TransitionComponent={Transition}
            >
                <DialogContent
                    sx={{
                        position: 'relative',
                        p: 0,
                        m: 0,
                        height: '100vh',
                        width: '100vw',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            top: 16,
                            right: 20,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            color: 'white',
                            zIndex: 10,
                            '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.7)',
                            },
                        }}
                    >
                        <CloseIcon fontSize="large"/>
                    </IconButton>

                    <img
                        src={gallery[currentIndex]}
                        alt={`Slide ${currentIndex}`}
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain',
                            borderRadius: '0',
                        }}
                    />

                    <IconButton
                        onClick={handlePrev}
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: 20,
                            transform: 'translateY(-50%)',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            color: 'white',
                            '&:hover': { backgroundColor: 'rgba(255,255,255,0.7)' }
                        }}
                    >
                        <ArrowBackIos />
                    </IconButton>
                    <IconButton
                        onClick={handleNext}
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            right: 20,
                            transform: 'translateY(-50%)',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            color: 'white',
                            '&:hover': { backgroundColor: 'rgba(255,255,255,0.7)' }
                        }}
                    >
                        <ArrowForwardIos />
                    </IconButton>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default GalleryCard;