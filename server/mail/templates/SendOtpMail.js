exports.sendOtpVerificationMail = (name, otp) => {
    return `
    <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your OTP</title>
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
          .otp {
              font-size: 20px;
              font-weight: bold;
              background-color: #f0f0f0;
              padding: 10px;
              text-align: center;
              border-radius: 5px;
              margin-bottom: 20px;
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
  
          <h2 class="greeting">Hello ${name},</h2>
  
          <div class="message">
              <p>Thank you for registering on our Gym website. To complete your registration, please verify your email address by entering the following One-Time Password (OTP) in the verification form:</p>
              <div class="otp">
                  ${otp}
              </div>
              <p>This OTP is valid for the next 10 minutes. Please do not share it with anyone for security purposes.</p>
          </div>
  
          <div class="footer">
              <p>Best regards,</p>
              <p><strong>Your Gym Team</strong><br>Your Gym Name</p>
              <p>© 2024 Your Gym Name. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>`;
}
