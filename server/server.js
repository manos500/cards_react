import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Δημιουργία __dirname για ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(cors());

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/packs', async (req, res) => {
    try {
        const data = await fs.readFile('./packs.json', 'utf8');
        const json = JSON.parse(data);
        res.json(json);
    }catch (err){
        res.status(500).json({ error: 'Failed to load'})
    }
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
