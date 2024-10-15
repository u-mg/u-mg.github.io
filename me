const twilio = require('twilio');

// Twilio credentials
const accountSid = 'ACbaa146e0794595892fa97d298a455468';
const authToken = 'badb93dca0a74152cc95dae286f752ed';
const client = new twilio(accountSid, authToken);

// Twilio phone number
const twilioNumber = '+1234567890';

// Source and destination numbers
const sourceNumber = '+27608143246'; // 0608143246
const destinationNumber = '+27794833168'; // 0794833168

// Receive SMS webhook
const express = require('express');
const app = express();

app.post('/receive-sms', (req, res) => {
  const message = req.body;
  if (message.From === sourceNumber) {
    // Forward SMS
    client.messages
      .create({
        body: `From: ${message.From}\nMessage: ${message.Body}`,
        from: twilioNumber,
        to: destinationNumber,
      })
      .then((message) => console.log(`Forwarded SMS: ${message.sid}`))
      .done();
  }
  res.end();
});

// Start server
const port = 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
