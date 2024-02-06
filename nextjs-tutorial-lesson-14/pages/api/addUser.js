import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const dbPath = path.join(process.cwd(), 'data', 'Games.json'); // Path to db.json

  if (req.method === 'POST') {
    const { nickname, pin } = req.body;

    if (!nickname || !pin) {
      return res.status(400).json({ error: 'Nickname and pin are required' });
    }

    try {
      let data = fs.readFileSync(dbPath, 'utf8');
      let jsonData = JSON.parse(data);

      if (!Array.isArray(jsonData)) {
        jsonData = [];
      }

      jsonData.push({ nickname, pin });

      fs.writeFileSync(dbPath, JSON.stringify(jsonData), 'utf8');

      return res.status(200).json({ message: 'User added successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while reading or writing the file' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
