export function generateEmailVerificationTemplate(
  username,
  senderName,
  verificationToken,
  appName,
  expirationTime
) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          color: #333;
          margin: 0;
          padding: 20px;
        }
        .email-container {
          max-width: 600px;
          background-color: #fff;
          padding: 20px;
          margin: 0 auto;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .email-header {
          text-align: center;
          margin-bottom: 20px;
        }
        .email-header h1 {
          color: #2c3e50;
        }
        .email-body {
          margin-bottom: 20px;
        }
        .token {
          background-color: #ecf0f1;
          padding: 15px;
          font-size: 18px;
          letter-spacing: 2px;
          text-align: center;
          font-weight: bold;
          color: #34495e;
          border-radius: 5px;
          display: inline-block;
        }
        .footer {
          text-align: center;
          color: #888;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          <h1>${appName} Email Verification</h1>
        </div>
        <div class="email-body">
          <p>Hi <strong>${username}</strong>,</p>
          <p>Thank you for registering with <strong>${appName}</strong>! Please verify your email address by using the verification token below.</p>
          <p>Here is your email verification token:</p>
          <p><span class="token">${verificationToken}</span></p>
          <p>Please enter this token in the application to complete your registration.</p>
          <p>This token will expire in <strong>${expirationTime}</strong>.</p>
        </div>
        <div class="footer">
          <p>Best regards,</p>
          <p>${senderName}</p>
          <p>&copy; ${new Date().getFullYear()} ${appName}. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function generateWelcomeEmailTemplate(
  username,
  senderName,
  appName,
  supportEmail
) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to ${appName}</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f2f4f7;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .email-container {
          max-width: 600px;
          margin: 40px auto;
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        .email-header {
          background-color: #3498db;
          padding: 20px;
          color: #ffffff;
          text-align: center;
        }
        .email-header h1 {
          font-size: 28px;
          margin: 0;
        }
        .email-body {
          padding: 30px;
          text-align: left;
          color: #2c3e50;
        }
        .email-body h2 {
          color: #3498db;
        }
        .email-body p {
          line-height: 1.6;
        }
        .email-body a {
          display: inline-block;
          padding: 10px 20px;
          margin-top: 20px;
          background-color: #2ecc71;
          color: #ffffff;
          text-decoration: none;
          font-weight: bold;
          border-radius: 5px;
        }
        .email-footer {
          padding: 20px;
          text-align: center;
          background-color: #f0f0f0;
          color: #888;
          font-size: 14px;
        }
        .email-footer p {
          margin: 0;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <!-- Email Header -->
        <div class="email-header">
          <h1>Welcome to ${appName}, ${username}!</h1>
        </div>
        <!-- Email Body -->
        <div class="email-body">
          <h2>We're thrilled to have you with us!</h2>
          <p>Hi <strong>${username}</strong>,</p>
          <p>Thank you for joining <strong>${appName}</strong>! We're excited to have you on board and can't wait for you to explore all the amazing features we've built just for you.</p>
          <p>If you ever need help or have any questions, don't hesitate to reach out to our support team at <a href="mailto:${supportEmail}">${supportEmail}</a>. We're here to ensure you have the best experience possible.</p>
          <p>In the meantime, feel free to visit our website and explore the platform. Let’s get started on your journey with us!</p>
          <a href="https://example.com/login">Get Started Now</a>
        </div>
        <!-- Email Footer -->
        <div class="email-footer">
          <p>Best regards,</p>
          <p>${senderName} and the ${appName} Team</p>
          <p>&copy; ${new Date().getFullYear()} ${appName}. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
