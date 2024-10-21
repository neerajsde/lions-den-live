exports.AdminContactUsMail = (userName, userEmail) => {
    return `
    <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New User Registration</title>
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
          .heading {
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
          .user-details {
              background-color: #f0f0f0;
              padding: 15px;
              border-radius: 5px;
              font-size: 16px;
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
  
          <h2 class="heading">New User Registration Alert</h2>
  
          <div class="message">
              <p>A new user has registered their details on your Gym website. Below are the user details:</p>
              <div class="user-details">
                  <p><strong>Name:</strong> ${userName}</p>
                  <p><strong>Email:</strong> ${userEmail}</p>
              </div>
              <p>Please reach out to the user if necessary or follow up through your admin dashboard.</p>
          </div>
  
          <div class="footer">
              <p>Best regards,</p>
              <p><strong>Your Gym Website System</strong></p>
              <p>© 2024 Your Gym Name. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>`;
}
