exports.userSignupMail = (name, email) => {
    return `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Welcome to Our Gym!</title>
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
      
                  <h2 class="greeting">Welcome, ${name}!</h2>
      
                  <div class="message">
                      <p>Thank you for signing up with us! We are excited to have you as part of our fitness community.</p>
      
                      <p>Your account has been created with the following details:</p>
                      <p><strong>Name:</strong> ${name}</p>
                      <p><strong>Email:</strong> ${email}</p>
                      
                      <p>You can now log in to your account and start exploring the variety of fitness programs and services we offer.</p>
      
                      <p>If you have any questions or need assistance, don't hesitate to reach out to our support team. We're here to help you on your journey to fitness success!</p>
                  </div>
      
                  <div class="cta">
                      <a href="https://yourgymwebsite.com/login" target="_blank">Log In to Your Account</a>
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
  