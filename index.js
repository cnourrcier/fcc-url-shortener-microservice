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

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.post('/api/shorturl', function (req, res) {
  const { url } = req.body;
  console.log(new URL(url).hostname);

  dns.lookup(new URL(url).hostname, async (err, address) => {
    if (!address) {
      return res.json({ error: 'Invalid URL' });
    } else {
      const urlCount = await urls.countDocuments({}); // create a count of total documents in collection
      const urlDoc = {
        url,
        short_url: urlCount // create shorturl based on document count in db
      }
      const insertedDoc = await urls.insertOne(urlDoc); // insert new url and short url into db
      console.log(insertedDoc);
      return res.json({ original_url: url, short_url: urlCount });
    }
  })
});

app.get('/api/shorturl/:shorturl', async (req, res) => {
  const { shorturl } = req.params;
  const urlDoc = await urls.findOne({ short_url: +shorturl });
  res.redirect(urlDoc.url);
})


app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
