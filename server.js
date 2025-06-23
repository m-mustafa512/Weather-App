require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/weather', async (req, res) => {
  const { city } = req.query;
  const apiKey = process.env.API_KEY;

  try {
    // Step 1: Get lat/lon
    const geoRes = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`);
    const geoData = await geoRes.json();
    if (!geoData[0]) return res.status(400).json({ error: "Invalid city" });

    const { lat, lon } = geoData[0];

    // Step 2: Get weather
    const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
    const weatherData = await weatherRes.json();

    res.json(weatherData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
