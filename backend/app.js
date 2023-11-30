const express = require('express');
const path = require('path');
const cors = require('cors');
const generateActivities = require('./activityFinder'); 

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/generate-activities', async (req, res) => {
  console.log('Received request to /generate-activities');
  const partyName = req.query.partyName || 'DefaultParty';

  try {
    const resultText = await generateActivities(partyName);
    res.json({ resultText });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
