// pages/api/savePin.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { pin } = req.body;

        try {
            // Read the current state of games from db.json
            const filePath = path.join(process.cwd(), 'data', 'db.json');
            const db = JSON.parse(fs.readFileSync(filePath, 'utf8'));

            // Add a new object to the games array with the pin as the key
            db.games[pin] = {
                // Add any additional properties you need for the game object
                // For example:
                // name: 'Your Game Name'
                playerArray:[
                    {
                        nickName:{
                            currentScore: 0,
                            userAnswersArray:[]

                        }
                    }

                ]
            };

            // Write the updated games JSON back to db.json
            fs.writeFileSync(filePath, JSON.stringify(db, null, 2));

            res.status(200).json({ message: 'Pin saved successfully' });
        } catch (error) {
            console.error('Error saving pin:', error);
            res.status(500).json({ message: 'Error saving pin' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
