exports.adminNotificationMail = (name, phone, email, shedule_date, shedule_for, branch_name) => {
    return `
    <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Free Trial Request</title>
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
          .header {
              font-size: 22px;
              font-weight: bold;
              margin-bottom: 10px;
          }
          .details {
              font-size: 16px;
              margin-bottom: 20px;
          }
          .details p {
              margin-bottom: 15px;
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
          <h2 class="header">New Free Trial Request</h2>
  
          <div class="details">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Trial Date:</strong> ${shedule_date}</p>
              <p><strong>Schedule Time:</strong> ${shedule_for}</p>
              <p><strong>Branch Name:</strong> ${branch_name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p>A user has just submitted a request for a free trial consultation. Please reach out to them to schedule the trial and provide the necessary information.</p>
          </div>
  
          <div class="footer">
              <p>Best regards,</p>
              <p>Our <strong>Lions Den</strong><br>Team </p>
              <p>© 2024 Lions Den. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>`;
}
