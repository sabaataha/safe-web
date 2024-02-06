const express = require('express');
const fs = require('fs');
const PORT = 3000;
const app = express();
app.use(express.json());
const newData = { name: 'John', age: 30 };
fs.readFile('../data/db.json', 'utf8', (err, data) => {
  if (err) {
      // console.error(err);
      return;
  }
  let jsonData;
  try {
      jsonData = JSON.parse(data);
  } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      return;
  }

  // If jsonData is not an array, initialize it as an empty array
  if (!Array.isArray(jsonData)) {
      jsonData = [];
  }

  // Add new data to existing data
  jsonData.push(newData);

  // Write updated data back to JSON file
  fs.writeFile('../data/db.json', JSON.stringify(jsonData), 'utf8', (err) => {
      if (err) {
          console.error(err);
          return;
      }
      console.log('Data written to file');
  });
});
app.post('/', (req, res) => {
  console.log('im here1');
  // Extract nickname and pin from the request body
  const { nickname, pin } = req.body;
console.log(req.body);
  // Check if nickname and pin are provided
  if (!nickname || !pin) {
      return res.status(400).json({ error: 'Nickname and pin are required' });
  }
  console.log('im here3');
  try {
      // Read existing data from the JSON file synchronously
      let data = fs.readFileSync('../data/db.json', 'utf8');
      console.log('im here2');
      let jsonData = JSON.parse(data);

      // If jsonData is not an array, initialize it as an empty array
      if (!Array.isArray(jsonData)) {
          jsonData = [];
          console.log(jsonData);
      }
      console.log(jsonData);
      // Add new user data to existing data
      jsonData.push({ nickname, pin });

      // Write updated data back to JSON file synchronously
      fs.writeFileSync('../data/db.json', JSON.stringify(jsonData), 'utf8');
      console.log('Data written to file');

      // Send response after writing to the file
      res.status(200).json({ message: 'User added successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while reading or writing the file' });
  }
});
  
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
