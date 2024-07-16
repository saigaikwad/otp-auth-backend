const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

// Twilio credentials
const accountSid = 'ACe5f417e680e4d2817dcbacb7559fe2d2'; // Replace with your Twilio account SID
const authToken =  '48a86be6143c39303bd262bdf86ef44e'; // Replace with your Twilio auth token
const client = twilio(accountSid, authToken);

const app = express();
app.use(bodyParser.json());

app.post('/generateOTP', (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  client.messages
    .create({
      body: `Your OTP is ${otp}`,
      from: '+917887413838', // Replace with your Twilio phone number
      to: phoneNumber,
    })
    .then(message => {
      res.status(200).send({ otp });
    })
    .catch(error => {
      res.status(500).send({ error: error.message });
    });
});

app.post('/verifyOTP', (req, res) => {
  const { phoneNumber, otp } = req.body;
  // For demonstration, we simply compare the OTP directly
  // In a real-world scenario, you would store the OTP in a database and compare it
  if (otp === '123456') {
    res.status(200).send({ verified: true });
  } else {
    res.status(400).send({ verified: false });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
