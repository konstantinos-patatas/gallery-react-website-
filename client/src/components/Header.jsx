import React, {useState} from 'react';
import { Link, NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Button } from '@mui/material';
import {IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function Header() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const openNav = () => {
        setIsSidebarOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeNav = () => {
        setIsSidebarOpen(false);
        document.body.style.overflow = '';
    };


    return (
        <>
            <Box
                component="nav"
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 20px',
                    height: '60px',
                    position: 'static',
                    zIndex: 10,
                    animation: 'slideInTop 0.8s ease-out forwards' /*add the animation to the navbar*/
                }}
            >
                {/* Logo */}
                <Box
                    sx={{
                        fontFamily: 'New Amsterdam', fontSize: '40px',
                        '&:hover': {
                            transform: 'translateY(-5px)',
                        },
                    }}
                >
                    <NavLink to="/" style={{ textDecoration: 'none', color: 'black' }}>
                        {/*<img src={"/images/icons/evergreen logo.gif"} alt={"E V E R G R E E N"}  style={{width:'180px', borderRadius:'20px'}} />*/}
                        E v e r g r e e n
                    </NavLink>
                </Box>

                {/* Desktop Nav Links */}
                <Box
                    sx={{
                        display: { xs: 'none', md: 'flex' },
                        gap: '2vw',
                        alignItems: 'center',
                        pl:7
                    }}
                >
                    {[
                        { to: '/', label: 'Home' },
                        { to: '/weddings', label: 'Weddings' },
                        { to: '/babyshower', label: 'Baby Showers' },
                        { to: '/products', label: 'Products' },
                        { to: '/contact', label: 'Contact Us' },
                    ].map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            style={{ textDecoration: 'none' }}
                        >
                            {({ isActive }) => (
                                <Box
                                    sx={{
                                        fontSize: '25px',
                                        color: isActive ? 'rgba(238, 172, 153)' : 'black',
                                        fontWeight: isActive ? 'bold' : 'normal',
                                        borderBottom: isActive ? '1px solid rgba(238, 172, 153)' : 'none',
                                        pb: '2px',
                                        transition: 'all 0.3s',
                                        '&:hover': {
                                            transform: 'translateY(-5px)',
                                            color: 'rgba(238, 172, 153)',
                                        },
                                    }}
                                >
                                    {item.label}
                                </Box>
                            )}
                        </NavLink>
                    ))}
                </Box>

                {/* Mobile Button (right-aligned on small screens) */}
                <Box
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        marginLeft: 'auto', // This pushes the button to the right on mobile
                    }}
                >
                    <Button
                        onClick={openNav}
                        sx={{
                            minWidth: 0,
                            padding: '6px',
                            borderRadius:'50%',
                            border:'1px solid black',
                            color:'black'
                        }}
                    >
                        <MenuIcon fontSize="large" />
                    </Button>
                </Box>
            </Box>

            {/* Sidebar menu for mobile*/}
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '88vw',
                    height: '100%',
                    transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
                    transition: 'transform 0.3s ease-in-out',
                    backgroundColor: 'rgb(240, 240, 240)',
                    zIndex: 999,
                    padding: '30px 20px',
                    borderTopRightRadius: '20px',
                    borderBottomRightRadius: '20px',
                    overflowY: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    scrollbarWidth: 'thin',
                    '&::-webkit-scrollbar': {
                        width: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        borderRadius: '4px',
                    },
                }}
            >
                <IconButton
                    onClick={closeNav}
                    sx={{
                        color: 'black',
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        border:'1px solid black',
                        borderRadius:'50%'
                    }}
                >
                    <CloseIcon sx={{ fontSize: 40 }} />
                </IconButton>

                <Box sx={{mt:5}}>
                    {[
                        { to: '/', label: 'Home' },
                        { to: '/weddings', label: 'Weddings' },
                        { to: '/babyshower', label: 'Baby Showers' },
                        { to: '/products', label: 'Products' },
                        { to: '/contact', label: 'Contact Us' },
                    ].map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            onClick={closeNav}
                            style={{ textDecoration: 'none' }}
                        >
                            <Box
                                sx={{
                                    padding: '10px 32px',
                                    fontSize: '30px',
                                    color: '#4b2e2e',
                                    transition: '0.3s',
                                    '&:hover': {
                                        padding: '7px',
                                    },
                                }}
                            >
                                {item.label}
                            </Box>
                        </NavLink>
                    ))}
                </Box>
            </Box>
        </>
    );
}

export default Header;