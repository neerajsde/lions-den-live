exports.contactUsMail = (name) => {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Your Free Trial Consultation Request</title>
            <style>
                body {
                    background-color: #f4f4f4;
                    font-family: 'Arial', sans-serif;
                    font-size: 16px;
                    line-height: 1.6;
                    color: #333;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .logo {
                    max-width: 80px;
                    margin-bottom: 20px;
                }
                .greeting {
                    font-size: 22px;
                    font-weight: bold;
                    margin-bottom: 10px;
                }
                .message {
                    font-size: 16px;
                    margin-bottom: 20px;
                }
                .message p {
                    margin-bottom: 15px;
                }
                .cta {
                    text-align: center;
                    margin: 30px 0;
                }
                .cta a {
                    display: inline-block;
                    background-color: #0073e6;
                    color: white;
                    padding: 10px 20px;
                    text-decoration: none;
                    border-radius: 5px;
                }
                .footer {
                    font-size: 14px;
                    color: #888;
                    text-align: center;
                    margin-top: 30px;
                }
                .footer p {
                    margin: 5px 0;
                }
                @media (max-width: 600px) {
                    .container {
                        padding: 15px;
                    }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <img src="https://res.cloudinary.com/do1xweis7/image/upload/v1726229791/logo_k1z4mp.png" alt="Gym Logo" class="logo" />
    
                <h2 class="greeting">Dear ${name},</h2>
    
                <div class="message">
                    <p>Thank you so much for your interest in our gym and for requesting a free trial consultation! We're thrilled to have the opportunity to assist you in reaching your fitness goals.</p>
    
                    <p>Our team has received your request and will reach out to you soon to schedule your consultation and discuss the best ways to help you on your fitness journey.</p>
    
                    <p>In the meantime, feel free to explore our website to learn more about our services, classes, and membership options. We are dedicated to offering you the best experience possible.</p>
                    
                    <p>If you have any immediate questions or need assistance, please don't hesitate to contact us by replying to this email. We’re here to help!</p>
                    
                    <p>Thank you once again for considering us as part of your fitness journey. We look forward to meeting you soon!</p>
                </div>
    
                <div class="cta">
                    <a href="https://yourgymwebsite.com" target="_blank">Visit Our Website</a>
                </div>
    
                <div class="footer">
                    <p>Best regards,</p>
                    <p><strong>Your Gym Team</strong><br>Your Gym Name</p>
                    <p>© 2024 Your Gym Name. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>`;
};
