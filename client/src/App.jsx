import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import GalleryCardsPage from './pages/GalleryCardsPage.jsx';
import Products from './pages/Products.jsx';
import Contact from './pages/Contact.jsx';
import Footer from "./components/Footer.jsx";
import './css/general.css';
import './css/home.css';

function App() {
    useEffect(() => {
        // Scroll animation handler
        const handleScrollAnimations = () => {
            const elements = document.querySelectorAll('.fade-up');

            elements.forEach((element) => {
                const elementTop = element.getBoundingClientRect().top;
                const elementBottom = element.getBoundingClientRect().bottom;
                const windowHeight = window.innerHeight;

                if (elementTop < windowHeight * 0.8 && elementBottom > 0) {
                    element.classList.add('animate');
                }
            });
        };

        // const resetScrollAnimations = () => {
        //     const elements = document.querySelectorAll('.fade-up');
        //     elements.forEach((element) => element.classList.remove('animate'));
        //     window.scrollTo({ top: 0, behavior: 'smooth' });
        //
        //     const scrollIndicator = document.querySelector('.scroll-indicator');
        //     if (scrollIndicator) scrollIndicator.style.display = 'none';
        // };

        // Throttle scroll events
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScrollAnimations();
                    ticking = false;
                });
                ticking = true;
            }
        };

        // Initial animation
        handleScrollAnimations();

        window.addEventListener('scroll', onScroll);
        window.addEventListener('load', handleScrollAnimations);

        // Hide scroll indicator on first scroll
        let hasScrolled = false;
        const hideIndicator = () => {
            if (!hasScrolled) {
                const indicator = document.querySelector('.scroll-indicator');
                if (indicator) indicator.style.opacity = '0';
                hasScrolled = true;
            }
        };
        window.addEventListener('scroll', hideIndicator);

        // Clean up listeners on unmount
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('load', handleScrollAnimations);
            window.removeEventListener('scroll', hideIndicator);
        };
    }, []);

    return (
        <Router>
            <div className="appLayout">
                <Header />
                <div className="mainContent">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/weddings" element={<GalleryCardsPage pageType={"weddings"} />} />
                        <Route path="/babyshower" element={<GalleryCardsPage pageType={"babyShowers"} />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
