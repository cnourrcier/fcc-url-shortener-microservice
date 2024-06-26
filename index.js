require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient } = require('mongodb');
const { URL } = require('url');
const dns = require('dns');

// MongoDB
const client = new MongoClient(process.env.CONN_STR);
const db = client.db("url-shortener-microservice");
const urls = db.collection("urls");

// Basic Configuration
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(`${process.cwd()}/public`));

// Handle static file 'index.html'
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Handle post requests to '/api/shorturl' endpoint
app.post('/api/shorturl', function (req, res) {
  const { url } = req.body;
  // Validate provided url
  dns.lookup(new URL(url).hostname, async (err, address) => {
    if (!address) {
      return res.json({ error: 'Invalid URL' });
    } else {
      const count = await urls.countDocuments({}); // create a count of total documents in collection
      const urlDoc = {
        original_url: url,
        short_url: count // create shorturl based on document count in db
      }
      await urls.insertOne(urlDoc); // insert original url and short url into db
      const insertedDoc = await urls.findOne(urlDoc, { projection: { _id: 0 } }) // make sure url is stored in db successfully
      if (!insertedDoc) {
        res.send('Error: The document was not saved to the database')
      }
      return res.json({ ...insertedDoc });
    }
  })
});

// Serve short url redirect
app.get('/api/shorturl/:shorturl', async (req, res) => {
  const { shorturl } = req.params;
  const urlDoc = await urls.findOne({ short_url: +shorturl }); // find url object in database
  res.redirect(urlDoc.original_url); // redirect using original_url
})

// Start the server
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
