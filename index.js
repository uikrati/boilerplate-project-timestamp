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


const unixRegex = /^\d+$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

app.get("/api/:date", (req, res) => {
  const { date } = req.params;

  if (unixRegex.test(date)) {
    const timestamp = parseInt(date);
    const dateObj = new Date(timestamp);
    const utcFormatted = dateObj.toUTCString();
    res.json({ unix: timestamp, utc: utcFormatted });
  } else if (dateRegex.test(date)) {
    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
      res.json({ error: "Invalid Date" });
    } else {
      const unixTimestamp = parsedDate.getTime();
      const utcFormatted = parsedDate.toUTCString();
      res.json({ unix: unixTimestamp, utc: utcFormatted });
    }
  } else {
    res.status(400).json({ error: "Invalid input" });
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
