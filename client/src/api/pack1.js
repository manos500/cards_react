import axios from "axios"

export const loginUser = async (username, password) => {
  try{
  const response = await axios.post("http://localhost:5000/login", {
    username,
    password,
  })

  return response.data;
  } catch (error) {
    throw new Error("Invalid credentials");
  }
}

export const registerUser = async (username, email, password) => {
  try{
  const response = await axios.post("http://localhost:5000/register", {
    username,
    email,
    password,
  })

  return response.data;
  } catch (error) {
    throw new Error("Invalid credentials");
  }
}

export const unlockCards = async (userId, cardId) => {
  console.log('UnlockCards called with:', { userId, cardId });  // debug
  try {
    const response = await axios.post("http://localhost:5000/unlockCards", {
      userId,
      cardId,
    });
    return response.data;
  } catch (error) {
    console.error('unlockCards API error:', error.response?.data || error.message);
    throw new Error("Failed to unlock card");
  }
}


export const fetchUserCollection = async (userId) => {
  const res = await fetch(`http://localhost:5000/collection/${userId}`);
  const data = await res.json();
  console.log("UserCollection from API:", data);
  return data;
};


export const fetchCards = async () => {
    const response = await axios.get(
        'http://localhost:5000/cards'
      );
      return response.data.map((card) => ({
        id: card.id,
        name: card.name,
        attack: card.attack,
        defense: card.defense,
        filterCardType: card.frametype,
        image: card.card_images[0].image_url_small,
        cardType: card.type,
        attribute: card.attribute,
        level: card.level,
        monsterType: card.race,
        SpellTrapCardType: card.humanReadableCardType,
        rarity: card.card_sets ? card.card_sets[1].set_rarity : "Unknown",
        description: card.description,
        cardPack: card.card_sets[0].set_name,
        unlocked: false,
      }));
}

export const fetchPacks = async () => {
  const response = await axios.get("http://localhost:5000/packs")
  return response.data.map((pack) => ({
    packID: pack.id,
    packName: pack.pack_name,
    packImage: `http://localhost:5000/public/assets/${pack.pack_image}.png`,
    packYear: pack.pack_year,
  }))
}

