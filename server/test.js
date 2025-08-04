import { Pool } from 'pg';
import fs from 'fs';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Yugioh_cards',
  password: 'password5',
  port: 5432,
});

async function importCards() {
  const rawData = fs.readFileSync('packs.json');
  const data = JSON.parse(rawData);
  const cards = data.data;  // εδώ είναι το array

  for (const card of cards) {
    const query = `
      INSERT INTO cards (
        id, name, typeline, type, humanReadableCardType, frameType, description,
        race, attack, defense, level, attribute, archetype, ygoprodeck_url,
        card_sets, card_images, card_prices, unlocked
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7,
        $8, $9, $10, $11, $12, $13, $14,
        $15, $16, $17, $18
      )
      ON CONFLICT (id) DO NOTHING;
    `;

    const values = [
      card.id,
      card.name,
      card.typeline,
      card.type,
      card.humanReadableCardType,
      card.frameType,
      card.desc,
      card.race,
      card.atk,
      card.def,
      card.level,
      card.attribute,
      card.archetype,
      card.ygoprodeck_url,
      JSON.stringify(card.card_sets),
      JSON.stringify(card.card_images),
      JSON.stringify(card.card_prices),
      false,
    ];

    await pool.query(query, values);
  }

  console.log("Cards imported successfully");
  await pool.end();
}

importCards().catch(console.error);