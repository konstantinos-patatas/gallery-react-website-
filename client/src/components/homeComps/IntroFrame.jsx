import React, { useEffect, useState, useRef } from 'react';

function IntroFrame() {
    const [images, setImages] = useState([]);
    const slideIndexRef = useRef(0);
    const timerRef = useRef(null);
    const slideContainerRef = useRef(null);

    // Fetch JSON
    useEffect(() => {
        fetch('/data/introProducts.json')
            .then(res => res.json())
            .then(data => setImages(data))
            .catch(err => console.error('Failed to load images', err));
    }, []);

    // Slideshow logic
    useEffect(() => {
        if (images.length === 0) return;

        const slides = slideContainerRef.current?.children;

        const showSlides = () => {
            if (!slides) return;
            for (let i = 0; i < slides.length; i++) {
                slides[i].classList.remove('active', 'exit');
            }

            let currentIndex = slideIndexRef.current;
            const prevIndex = (currentIndex - 1 + slides.length) % slides.length;

            if (slides[prevIndex]) slides[prevIndex].classList.add('exit');
            slides[currentIndex].classList.add('active');

            slideIndexRef.current = (currentIndex + 1) % slides.length;
            timerRef.current = setTimeout(showSlides, 3000);
        };

        showSlides();

        // Cleanup on unmount
        return () => clearTimeout(timerRef.current);
    }, [images]);

    // Pause on hover
    useEffect(() => {
        const container = slideContainerRef.current;
        if (!container) return;

        const pause = () => clearTimeout(timerRef.current);
        const resume = () => {
            timerRef.current = setTimeout(() => {
                slideIndexRef.current = (slideIndexRef.current + 1) % images.length;
                const event = new Event('manualResume');
                window.dispatchEvent(event);
            }, 3000);
        };

        container.addEventListener('mouseenter', pause);
        container.addEventListener('mouseleave', resume);

        return () => {
            container.removeEventListener('mouseenter', pause);
            container.removeEventListener('mouseleave', resume);
        };
    }, [images]);

    return (
        <div className="introFrame">
            <div className="intro-quote-frame">
                <blockquote>
                    <strong>"From first blessings to forever vows <br /> beauty blooms at Evergreen"</strong>
                </blockquote>
                <div className="contactBtnDiv">
                    <a href="/contact" style={{width:"fit-content", borderRadius:"20px",backgroundColor:'rgba(238, 172, 153,0.7)',color:'black'}}>
                        Contact Us
                    </a>
                </div>
            </div>

            <div className="intro-image-frame" ref={slideContainerRef}>
                {images.map(({imgSrc}, index) => (
                    <div className="mySlides fade" key={index}>
                        <img src={imgSrc} alt={`slide-${index}`} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default IntroFrame;
