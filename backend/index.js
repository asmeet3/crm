const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'crm'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


// Save audience
app.post('/api/save-audience', (req, res) => {
    const { criteria, operator, audienceList } = req.body;
    const category = criteria.join(' ' + operator + ' ');
  
    audienceList.forEach(audience => {
      const { name, phone, email } = audience;
      db.query('INSERT INTO audience (name, phone, email, category) VALUES (?, ?, ?, ?)', 
        [name, phone, email, category], (err, result) => {
          if (err) {
            console.error('Error saving audience:', err);
            return res.status(500).send('Error saving audience');
          }
        });
    });
    res.send('Audience saved successfully!');
  });
  
  // Fetch audiences by category
  app.get('/api/view-audience', (req, res) => {
    const { category } = req.query;
    db.query('SELECT * FROM audience WHERE category = ?', [category], (err, results) => {
      if (err) {
        console.error('Error fetching audience:', err);
        return res.status(500).send('Error fetching audience');
      }
      res.json(results);
    });
  });
  
  // Send campaign
  app.post('/api/send-campaign', (req, res) => {
    const { category, message } = req.body;
    db.query('SELECT * FROM audience WHERE category = ?', [category], (err, results) => {
      if (err) {
        console.error('Error fetching audience for campaign:', err);
        return res.status(500).send('Error fetching audience for campaign');
      }
      // Here you would integrate with an email/SMS API to send the message
      res.send('Campaign sent successfully!');
    });
  });
  