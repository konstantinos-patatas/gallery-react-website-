import React from 'react';
import IntroFrame from "../components/homeComps/IntroFrame.jsx";
import StoreShowcaseFrame from "../components/homeComps/StoreShowcaseFrame.jsx";
import ServiceFrame from "../components/homeComps/ServiceFrame.jsx";
import { Helmet } from 'react-helmet-async';


function Home(){
    return (
        <>
            <Helmet>
                {/* Standard SEO */}
                <title>Evergreen Flower cy – Kato Polemidia, Limassol Cyprus</title>
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
                <meta property="og:url" content="https://evergreenflowerscy.com/"/>
                <meta property="og:title" content="Evergreen Flower cy – Kato Polemidia, Limassol"/>
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
                <meta name="twitter:url" content="https://evergreenflowerscy.com/"/>
                <meta name="twitter:title" content="Evergreen Flower Shop – Limassol, Cyprus"/>
                <meta
                    name="twitter:description"
                    content="Elegant floral arrangements and wedding,baby shower decor by Evergreen in Kato Polemidia, Limassol."
                />
                <meta
                    name="twitter:image"
                    content="https://evergreenflowerscy.com/images/icons/banner.png"
                />

                {/* Canonical URL */}
                <link rel="canonical" href="https://evergreenflowerscy.com/"/>
                <link rel="icon" type="image/png" href="https://evergreenflowerscy.com/images/icons/favicon.png"/>
            </Helmet>

            <IntroFrame/>
            <StoreShowcaseFrame/>
            <ServiceFrame />
        </>
    );
}

export default Home;