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
  try {
    const response = await axios.get(`http://localhost:5000/collection/${userId}`);
    console.log("UserCollection from API:", response.data);
    return response.data;
  }catch (error) {
    console.error('fetchUserCollection API error:', error.response?.data || error.message);
  }
};


export const fetchCards = async () => {
    const response = await axios.get(
        'http://localhost:5000/cards'
      );
      return response.data.map((card) => ({
        id: card.id,
        name: card.name,
        cardType: card.type,
        SpellTrapCardType: card.humanReadableCardType,
        filterCardTypes: card.frametype,
        description: card.description,
        monsterType: card.race,
        attack: card.attack,
        defense: card.defense,
        level: card.level,    
        attribute: card.attribute,   
        rarity: card.rarity,
        cardPack: card.set,
        image: card.image,
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

