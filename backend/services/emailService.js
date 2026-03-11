const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEmail(to, content) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "Sales Insight Summary",
    text: content,
  });
}

module.exports = sendEmail;