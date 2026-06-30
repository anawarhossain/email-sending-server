const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const nodemailer = require("nodemailer");

app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.COMPANY_EMAIL,
    pass: process.env.COMPANY_EMAIL_PASSWORD,
  },
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/email-send", (req, res) => {
  try {
    console.log(req.body);
    res.status(200).send("Email sent successfully");
    const mailOptions = {
      from: process.env.COMPANY_EMAIL,
      to: req.body.email,
      subject: "Welcome to our website",
      html: `
          <h1>Welcome ${req.body.name}</h1>
          <p>Thank you for joining our website</p>
          <p>Have a nice day</p>
          `,
      };
      transporter.sendMail(mailOptions);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
