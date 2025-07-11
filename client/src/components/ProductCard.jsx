import React, {useState} from 'react';
import {
    Card, CardMedia, CardContent, CardActions,
    Typography, Button, IconButton, Dialog, DialogContent
} from '@mui/material';
import { Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {Visibility} from "@mui/icons-material"; //close button
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

//fade animation
import Slide from '@mui/material/Slide';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ProductCard = ({title, description, perfectFor, imgSrc, url }) => {
    const [open, setOpen] = useState(false); //track whether the gallery is open or not

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => setOpen(false);

    return(
       <>
           <Card sx={{
               display:'flex',
               flexDirection:'column',
               width: '100%',
               height:'100%',
               minWidth: 250,
               maxWidth: 450,
               margin: 'auto',
               boxShadow: 9,
               borderRadius: 4,
               '&:hover': {
                   transform: 'scale(1.02)',
               }
           }}>
               {/*a box so when user hovers over the main page to be able to see the gallery and also overlay effect*/}
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
                       image={imgSrc}
                       alt={title}
                       style={{
                           width: "100%",
                           height: "300px", // fixed consistent height
                           objectFit: "cover", // crop while maintaining aspect ratio
                           backgroundColor: '#F0FFFF'
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
                           View Product
                       </Typography>
                   </Box>
               </Box>

               <CardContent sx={{ flexGrow: 1 }}>
                   <Typography gutterBottom variant="h6" component="div">
                       {title}
                   </Typography>
               </CardContent>
               <CardActions sx={{display:'flex',justifyContent:"Center",alignItems:"center"}}>
                   <Button onClick={handleOpen} sx={{ width: "90%", borderRadius: "20px", backgroundColor:'rgba(238, 172, 153,0.7)',color:'black'}} variant="contained">
                       <Visibility sx={{ mr: 1 }} /> View Product Details
                   </Button>
               </CardActions>
           </Card>

           <Dialog
               open={open}
               onClose={handleClose}
               fullScreen
               TransitionComponent={Transition}
               PaperProps={{
                   sx: {
                       backgroundColor: '#F0FFFF', // no global background, we set per side
                   },
               }}
           >
               <DialogContent
                   sx={{
                       p: 0,
                       m: 0,
                       width: '100%',
                       overflowY: 'auto',
                       backgroundColor: '#F0FFFF'
                   }}
               >

                   <Box
                       sx={{
                           display: 'flex',
                           flexDirection: ['column', 'column', 'row'],
                           width: '100%',
                           minHeight: '100vh',
                           alignItems: 'stretch',          // Ensure both children stretch full height
                       }}
                   >
                       {/* LEFT: Image on black background (Top on mobile)*/}
                       <Box
                           sx={{
                               width: ['100%', '100%', '70%'],
                               backgroundColor: '#f9f9f9',
                               display: 'flex',
                               justifyContent: 'center',
                               alignItems: 'center',
                               position: 'relative',
                               height: 'auto',                 //Let it grow with content
                               minHeight: ['45vh', '45vh', '100%'], // Stretch to match on desktop
                           }}
                       >
                           {/* Close button in left section */}
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
                                       color:'black'
                                   },
                               }}
                           >
                               <CloseIcon fontSize="large" />
                           </IconButton>

                           <img
                               src={imgSrc}
                               alt={title}
                               style={{
                                   maxWidth: '100%',
                                   maxHeight: '100%',
                                   objectFit: 'contain',
                               }}
                           />
                       </Box>

                       {/* RIGHT: White panel for description (Bottom on mobile)*/}
                       <Box
                           sx={{
                               width:['100%','100%','30%','30%','30%'],
                               height: ['55%','55%','100%','100%','100%'],
                               backgroundColor: '#F0FFFF',
                               padding: {
                                   xs:0,
                                   md: 4
                               },
                           }}
                       >
                           <Typography variant="h4" gutterBottom>
                               {title}
                           </Typography>
                           <Typography variant="body1">
                               {description}
                           </Typography>

                           <Box
                               sx={{
                                   backgroundColor: '#F2F2F2',       // light gray background
                                   color: '#1A1A1A',                 // strong dark text
                                   borderRadius: '12px',
                                   padding: '12px 16px',
                                   mt: 2,
                                   fontSize: '1.2rem',
                                   fontWeight: 500,
                                   lineHeight: 1.6,
                                   boxShadow: '0 1px 3px rgba(0,0,0,0.1)',  // subtle depth
                               }}
                           >
                               <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                                   🌟 Perfect For:
                               </Typography>
                               {perfectFor}
                           </Box>

                           <Button onClick={() => window.open(url, '_blank')}
                                   sx={{
                                       marginTop:"3vh",marginBottom:'8vh', fontSize:'large',
                                       width:"100%", borderRadius:"20px",backgroundColor:'rgba(238, 172, 153,0.7)',color:'black',
                                   }}
                                   variant="contained"
                           >
                               <LocalShippingIcon sx={{ mr: 1 }} />Order Product
                           </Button>
                       </Box>

                   </Box>

               </DialogContent>
           </Dialog>



       </>
    );
}

export default ProductCard;