import axios from "axios"

export const loginUser = async (username, password) => {
  try{
  const response = await axios.post("http://localhost:5000/api/v1/auth/login", {
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
  const response = await axios.post("http://localhost:5000/api/v1/auth/register", {
    username,
    email,
    password,
  })

  return response.data;
  } catch (error) {
    throw new Error("Invalid credentials");
  }
}

export const unlockCards = async (cardId) => {
  try {
    const token = sessionStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const response = await axios.put(
    "http://localhost:5000/api/v1/cards/unlockCards",
    { cardId },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response.data;
  } catch (error) {
    console.error('unlockCards API error:', error.response?.data || error.message);
    throw new Error("Failed to unlock card");
  }
};



export const fetchUserCollection = async () => {
  const token = sessionStorage.getItem("token");
  if (!token) throw new Error("No token found");

  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/collections", // no userId in URL
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "fetchUserCollection API error:",
      error.response?.data || error.message
    );
    throw error;
  }
};



export const fetchCards = async () => {
    const response = await axios.get(
        'http://localhost:5000/api/v1/cards'
      );
      return response.data.map((card) => ({
        id: card.id,
        name: card.name,
        type: card.type,
        humanReadableCardType: card.humanReadableCardType,
        frametype: card.frametype,
        description: card.description,
        race: card.race,
        attack: card.attack,
        defense: card.defense,
        level: card.level,    
        attribute: card.attribute,   
        rarity: card.rarity,
        set: card.set,
        image: card.image,
      }));
}

export const fetchPacks = async () => {
  const response = await axios.get("http://localhost:5000/api/v1/packs")
  return response.data.map((pack) => ({
    packID: pack.id,
    packName: pack.pack_name,
    packImage: `http://localhost:5000/public/assets/${pack.pack_image}.png`,
    packYear: pack.pack_year,
  }))
}

