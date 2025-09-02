import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { client } from './connection.js';
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
const PORT = 5000;

app.use(cors());

client.connect();

app.use('/public', express.static(path.join(__dirname, 'public')));



app.get('/cards', async (req, res) => {
    client.query(`SELECT * FROM cards`, (err, result) => {
      if (err){
        res.send(err.message)
      }else{
        res.send(result.rows)
      }
    })
})

app.get('/packs', (req, res) => {
    client.query(`Select * from packs`, (err, result) => {
      if (err) {
            res.send(err.message)
        } else {
            res.send(result.rows)
        }
     
    })
})

app.post('/login', async (req, res) => {
    try{
        const {username, password} = req.body;

        const result = await client.query('SELECT * FROM users WHERE username = $1', [username])

        const user = result.rows[0];
            if (!user) {
                return res.status(400).json({ message: 'No such user' });
            }
        
        const doesPasswordMatch = await bcrypt.compare(password, user.password)

        if (!doesPasswordMatch){
            return res.status(400).json({ message: 'Wrong password' });
        }

        return res.json(user)
    } catch (err) {
        res.status(500).send('Error processing the request: ' + err.message);
    }
    
})

app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await client.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "Ο χρήστης υπάρχει ήδη." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await client.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, hashedPassword]
    );

    const userId = newUser.rows[0].userid;


    const userCollectionResults = await client.query(
      `INSERT INTO user_collection (user_id) VALUES ($1) RETURNING id`,[userId]
    )

    const collectionId = userCollectionResults.rows[0].id;

    await client.query(
      `INSERT INTO user_collection_cards (user_collection_id, cards_id, unlocked) SELECT $1, id, false FROM cards`,
      [collectionId]
    )

    res.status(201).json({ message: "Ο χρήστης δημιουργήθηκε επιτυχώς." });

  } catch (err) {
    res.status(500).send('Error inserting data: ' + err.message);
  }
});

app.post('/unlockCards', async (req, res) => {
  try {
    const { userId, cardId } = req.body;

    if (!userId || !cardId) {
      return res.status(400).json({ message: 'Missing userId or cardId' });
    }

    const result = await client.query(
      `UPDATE user_collection_cards ucc
       SET unlocked = true
       FROM user_collection uc
       WHERE ucc.user_collection_id = uc.id
         AND uc.user_id = $1
         AND ucc.cards_id = $2
       RETURNING ucc.*;`,
      [userId, cardId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Card not found for this user' });
    }

    res.status(200).json({
      message: 'Card unlocked successfully',
      card: result.rows[0],
    });
  } catch (err) {
    console.error('UnlockCards error:', err);
    res.status(500).json({ message: 'Failed to unlock card', error: err.message });
  }
});




app.get('/collection/:userId' , async (req, res) =>{
  const userId = req.params.userId;
  console.log(userId)
   try {
    console.log("Fetching cards for user:", userId);

    const result = await client.query(`
      SELECT c.*, uc.*
      FROM user_collection_cards uc
      JOIN cards c ON uc.cards_id = c.id
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user collection' });
  }
})




app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
