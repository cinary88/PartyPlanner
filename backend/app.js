const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser')
const mysql = require('mysql')
const generateActivities = require('./activityFinder'); 

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  })
  
  connection.connect(err => {
    if (err) {
      console.error('Database connection failed: ' + err.stack)
      return
    }
    console.log('Connected to the database')
  })

app.get('/generate-activities', async (req, res) => {
  const partyName = req.query.partyName || 'DefaultParty';

  try {
    const resultText = await generateActivities(partyName);
    res.json({ resultText });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/create-party-entry', (req, res) => {
  const { partyName, description, date, time, location } = req.body
  console.log('in the endpoint')
  const sql =
    'INSERT INTO PartyTable (partyName, description, date, time, location) VALUES (?, ?, ?, ?, ?)'
  const values = [partyName, description, date, time, location]

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data: ' + err.message)
      res.status(500).json({ error: 'Internal Server Error' })
    } else {
      console.log('Party entry created:', result)
      res.json({ message: 'Party entry created successfully' })
    }
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
