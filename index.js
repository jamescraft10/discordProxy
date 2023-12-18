const express = require('express');
const axios = require('axios');
const app = express();

function replace(originalString, search, replacement) {
  const regex = new RegExp(search, 'g');
  return originalString.replace(regex, replacement);
}

app.get('*', async (req, res) => {
  const url = replace("https://www.discord.com" + req.url, "www.discord.com", "www.localhost:4000");

  const NoDiscordResponse = await axios.get(url, { responseType: 'arraybuffer' });

  const contentType = NoDiscordResponse.headers['content-type'];

  if(contentType) {
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Length', NoDiscordResponse.data.length);
    res.end(Buffer.from(NoDiscordResponse.data, 'binary'));
  } else {
    console.error('Error: Content-Type header is missing');
    res.status(500).send('Error fetching data');
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});