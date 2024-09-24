const nodemailer = require("nodemailer");
require("dotenv").config();

// Define the sendResetEmailLink function
const sendResetEmailLink = async (email, token) => {
  try {
    // Nodemailer transporter setup using Mailtrap or any other SMTP service
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io", // Mailtrap SMTP host
      port: 2525, // Mailtrap SMTP port
      auth: {
        user: process.env.MAIL_USER, // Use environment variable for Mailtrap user
        pass: process.env.MAIL_PASS, // Use environment variable for Mailtrap password
      },
    });

    // Define mail options
    const mailOptions = {
      from: '"Blog Support" <noreply@yourapp.com>', // Sender address
      to: email, // Recipient email address
      subject: "Reset Your Password", // Subject line
      text: `Click this link to reset your password: http://localhost:5000/api/auth/reset-password/${token}`, // Plain text body
      html: `<p>Click this link to reset your password: <a href="http://localhost:5000/api/auth/reset-password/${token}">Reset Password</a></p>`, // HTML body
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${email}`);
  } catch (error) {
    console.error("Error sending reset password email:", error.message);
    throw new Error("Error sending reset password email");
  }
};

// Export the function to use it in other parts of your application
module.exports = sendResetEmailLink;
