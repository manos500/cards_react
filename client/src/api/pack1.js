import axios from "axios"

export const fetchPack1 = async () => {
    const response = await axios.get(
        'http://localhost:5000/packs'
      );
      return response.data.data.map((card) => ({
        id: card.id,
        name: card.name,
        attack: card.atk,
        defense: card.def,
        filterCardType: card.frameType,
        image: card.card_images[0].image_url_small,
        cardType: card.type,
        attribute: card.attribute,
        level: card.level,
        monsterType: card.race,
        SpellTrapCardType: card.humanReadableCardType,
        rarity: card.card_sets ? card.card_sets[0].set_rarity : "Unknown",
        description: card.desc,
        cardPack: card.card_sets[0].set_name,
        unlocked: false,
      }));
}