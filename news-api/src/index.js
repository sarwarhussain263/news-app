// ./src/index.js
// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const axios = require('axios');

// defining the Express app
const app = express();
// defining an array to work as the database (temporary solution)
const ads = [
  { title: 'Hello, world (again)!' }
];

// adding Helmet to enhance your Rest API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// defining an endpoint to return all ads
app.get('/', (req, res) => {
  const API_KEY = "684d8abe750242ed991d8d6fcf1ce3a5";
  const url = "https://newsapi.org/v2/everything?q="

  console.log(url + req.query + "&apiKey=" + API_KEY);
  axios.get(url + req.query.q + "&apiKey=" + API_KEY)
    .then(response => {

      console.log(JSON.stringify(response.data));
      res.send(response.data);
    })
    .catch(error => {
      console.log(error);
    });


});

// starting the server
app.listen(3001, () => {
  console.log('listening on port 3001');
});