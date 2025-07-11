const GoogleMap = () => (
    <div
        style={{
            display: 'flex',
            flexDirection:'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: "5px",
            overflow: "hidden",
            maxWidth:'80%',
            height: 550,
            margin: '0 auto 5vh auto',
            animation: 'slideInBottom 1.5s ease-out forwards'
        }}
    >
        <h2
            style={{color: '#4b2e2e',fontFamily: 'Baskervville SC, serif',fontStyle: 'italic',fontSize: '2rem', lineHeight: '1.6'}}
        >
            Where to find Us?
        </h2>
        <iframe
            title="Flower Shop Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d820.0951154714962!2d32.9999347!3d34.6955826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14e733d515322c39%3A0x29fb674fe289da45!2sEvergreen%20Flowers%20Shop%20CY!5e0!3m2!1sel!2s!4v1751554303398!5m2!1sel!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
    </div>
);

export default GoogleMap;
