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


app.get("/api/:date?", (req, res) => {
  const { date } = req.params;
  let inputDate;

  if (!date) {
    inputDate = new Date();
  } else if (/^\d+$/.test(date)) {
    inputDate = new Date(parseInt(date));
  } else {
    inputDate = new Date(date);
  }

  if (isNaN(inputDate)) {
    res.json({ error: "Invalid Date" });
  } else {
    const unixTimestamp = inputDate.getTime();
    const utcFormatted = inputDate.toUTCString();
    res.json({ unix: unixTimestamp, utc: utcFormatted });
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
