exports.blogSubmissionMail = (userName, blogTitle, blogDesc, btnUrl) => { // Added the missing comma
    return `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>New Blog Submission for Approval</title>
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
                  <img src="https://res.cloudinary.com/do1xweis7/image/upload/v1726229791/logo_k1z4mp.png" alt="Admin Logo" class="logo" />
      
                  <h2 class="greeting">New Blog Submission from ${userName}</h2>
      
                  <div class="message">
                      <p>A new blog has been submitted by ${userName} and is awaiting your approval.</p>
                      
                      <p><strong>Blog Title:</strong> ${blogTitle}</p>
                      <p><strong>Blog Description:</strong> ${blogDesc}</p>
                      
                      <p>Please review the blog and approve or provide feedback as necessary. You can log in to the admin dashboard to take action.</p>
                      
                      <p>Thank you for keeping the content quality high!</p>
                  </div>
      
                  <div class="cta">
                      <a href="${btnUrl}" target="_blank">Go to Admin Dashboard</a> <!-- Added quotes around btnUrl -->
                  </div>
      
                  <div class="footer">
                      <p>Best regards,</p>
                      <p><strong>Lions Den</strong>Team</p>
                      <p>© 2024 Lions Den Website. All rights reserved.</p>
                  </div>
              </div>
          </body>
          </html>`;
};
