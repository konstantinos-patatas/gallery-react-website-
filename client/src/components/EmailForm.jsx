import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';

const EmailForm = () => {
    const form = useRef();
    const [buttonText, setButtonText] = useState('Submit');

    const sendEmail = (e) => {
        e.preventDefault();
        setButtonText('Sending...');

        emailjs.sendForm('service_8mt846b', 'template_vsqa2fn', form.current, 'YEb-iHuz89OIkwJzc')
            .then((result) => {
                setButtonText('Message Sent ✓');
                form.current.reset();

                // Optional: Reset button text after 3 seconds
                setTimeout(() => {
                    setButtonText('Submit');
                }, 3000);
            }, (error) => {
                setButtonText('Failed to Send ✗');

                // Reset button text after 3 seconds
                setTimeout(() => {
                    setButtonText('Submit');
                }, 3000);
            });
    };

    return (
        <form ref={form} onSubmit={sendEmail}
              style={{
                  display:"flex",
                  justifyContent:'center',
                  alignItems:'center',
                  flexDirection:'column',
                  width: '80%',
                  maxWidth: 700,
                  margin: '40px 2vh auto 2vh',
                  borderRadius: '20px',
                  border: '2px solid black',
                  backgroundColor: '#fafafa',
                  padding: '20px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
        >
            <div style={{display:"flex", justifyContent:'center', alignItems:'center', flexDirection:'column',paddingTop:'1vh'}}>
                <h2>We'd Love to Hear from You</h2>
                <h4>Have a Question? Drop Us a Line!</h4>
            </div>

            <input type="text" name="user_name" placeholder="Your Name" required style={inputStyle} />
            <input type="email" name="user_email" placeholder="Your Email" required style={inputStyle} />
            <input type="text" name="subject" placeholder="Subject" required style={inputStyle} />
            <textarea name="message" placeholder="Message" required style={{ ...inputStyle, height: 120 }} />
            <button type="submit" style={buttonStyle}>{buttonText}</button>
        </form>
    );
};

const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc'
};

const buttonStyle = {
    width: '80%',
    padding: '10px',
    backgroundColor: 'rgba(238, 172, 153)',
    color: 'black',
    border: 'none',
    borderRadius: '5px',
    fontSize: 'large',
    cursor: 'pointer'
};

export default EmailForm;
