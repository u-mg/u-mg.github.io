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



const express = require('express');
const http = require('http');
const app = express();

// Source and destination numbers
const sourceNumber = '+27608143246'; // 0608143246
const destinationNumber = '+27794833168'; // 0794833168

// SMS forwarding endpoint
app.post('/forward-sms', (req, res) => {
  const message = req.body;
  if (message.from === sourceNumber) {
    // Forward SMS using HTTP request
    const options = {
      method: 'POST',
      hostname: 'localhost',
      port: 8080,
      path: '/receive-sms',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = http.request(options, (res) => {
      console.log(`Forwarded SMS: ${res.statusCode}`);
    });

    req.write(JSON.stringify({
      to: destinationNumber,
      body: `From: ${message.from}\nMessage: ${message.body}`,
    }));
    req.end();
  }
  res.end();
});

// Start server
const port = 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));



const http = require('http');

const server = http.createServer((req, res) => {
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  });

  req.on('end', () => {
    const message = JSON.parse(data);
    console.log(`Received SMS: ${message.body}`);
    // Handle received SMS
    res.end();
  });
});

server.listen(8080, () => console.log('Receiving SMS server listening on port 8080'));
