// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const timestampRegex = /^\d+$/;

app.get('/api/:input?', (req, res) => {
  const input = req.params.input;

  if (!input) {
    const currentTimestamp = Date.now();
    const currentUTC = new Date(currentTimestamp).toUTCString();
    res.json({ unix: currentTimestamp, UTC: currentUTC });
    return;
  }
  if (dateRegex.test(input)) {
    const inputDate = new Date(input);
    const UTCTimestamp = inputDate.toUTCString();
    const unix = inputDate.getTime();
    res.json({ "unix": unix, "UTC": UTCTimestamp });
  } else if (timestampRegex.test(input)) {
    const timestamp = parseInt(input);
    const date = new Date(timestamp);
    const response = {
      unix: timestamp,
      utc: date.toUTCString()
    };
    res.json(response);
  } else {
    res.status(400).json({ error: 'Invalid input' });
  }
});








// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
