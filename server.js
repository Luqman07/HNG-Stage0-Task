const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get("/api/classify", async (req, res) => {
  const { name } = req.query;

  try {
    if (name === undefined || name === null || name.trim() === "") {
      return res.status(400).json({ status: "error", message: "Bad Request" });
    }
    if (typeof name !== "string") {
        return res
        .status(422)
        .json({ status: "error", message: "Unprocessable Entity" });
    }
    const response = await fetch(`https://api.genderize.io?name=${encodeURIComponent(name)}`);
    
    if (!response.ok) {
        return res
        .status(502)
        .json({ status: "error", message: "Failed to fetch data from API" });
    }
    const data = await response.json();
    
    if (data.gender === null || data.count === 0) {
        return res.status(200).json({
            status: "error",
            message: "No prediction available for the provided name",
        });
    }

    const processedData = {
      name: data.name,
      gender: data.gender,
      probability: data.probability,
      sample_size: data.count,
      is_confident: data.probability >= 0.7 && data.count >= 100,
      processed_at: new Date().toISOString(),
    };
    // Here you would typically call your classification function and return the result
    res.status(200).json({
      status: "success",
      data: processedData,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});