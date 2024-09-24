// Import Nodemailer
const nodemailer = require("nodemailer");
require("dotenv").config();

// Define the sendVerificationEmail function
const sendVerificationEmail = async (email, token) => {
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
      subject: "Verify Your Email", // Subject line
      text: `Click this link to verify your email: http://localhost:5000/api/auth/verify/${token}`, // Plain text body
      html: `<p>Click this link to verify your email: <a href="http://localhost:5000/api/auth/verify/${token}">Verify Email</a></p>`, // HTML body
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    // Log error in case of failure
    console.error("Error sending verification email:", error.message);
    throw new Error("Error sending verification email");
  }
};

// Export the function to use it in other parts of your application
module.exports = sendVerificationEmail;
