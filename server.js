const express = require('express');
const axios = require('axios');
const app = express();

app.get('*', async (req, res) => {
  const url = "https://www.discord.com" + req.url;

  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });

    if (response.status === 404) {
      res.status(404).send('Not Found');
      return;
    }

    const contentType = response.headers['content-type'];

    if (contentType) {
      res.setHeader('Content-Type', contentType);
      res.setHeader('Content-Length', response.data.length);
      res.setHeader('Cache-Control', 'public, max-age=31536000');

      res.end(Buffer.from(response.data, 'binary'));
    } else {
      console.error('Error: Content-Type header is missing');
      res.status(500).send('Error fetching data');
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Error fetching data');
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});