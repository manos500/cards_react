const rarityChances = {
  "Common": 68.5,
  "Rare": 26,
  "Super Rare": 5,
  "Ultra Rare": 0.5
};


const getRandomRarity = () => {
  const total = Object.values(rarityChances).reduce((sum, val) => sum + val, 0);
  const rand = Math.random() * total;

  let accumulated = 0;
  for (const [rarity, chance] of Object.entries(rarityChances)) {
    accumulated += chance;
    if (rand <= accumulated) return rarity;
  }
  return "Common";
};

export const drawCards = (cards, count = 9) => {
  const drawn = [];

  for (let i = 0; i < count; i++) {
    let rarity = getRandomRarity();

    const available = cards.filter(c => c.rarity === rarity);

    if (available.length === 0) {
      const random = cards[Math.floor(Math.random() * cards.length)];
      drawn.push(random);
    } else {
      const random = available[Math.floor(Math.random() * available.length)];
      drawn.push(random);
    }
  }

  return drawn;
};



