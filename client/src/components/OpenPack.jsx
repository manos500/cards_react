import { useContext, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCards, unlockCards } from '../api/pack1.js';
import { PackContext } from '../Contexts/PackContext.jsx';
import '../styles/openPack.css';
import { Card } from './Card.jsx';
import { drawCards } from '../utils/randomCards';
import { CardStats } from './CardStats.jsx';
import { useNavigate } from 'react-router-dom';

const rarityOrder = ['Common', 'Rare', 'Super Rare', 'Ultra Rare', 'Secret Rare'];

export const OpenPack = () => {
  const navigate = useNavigate();
  const { selectedPack } = useContext(PackContext);
  const [openedCards, setOpenedCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const user = JSON.parse(sessionStorage.getItem("user"));

  const { isLoading, isError, data: cards } = useQuery({
    queryKey: ['cards'],
    queryFn: fetchCards,
  });

  useEffect(() => {
    if (!cards || !selectedPack) return;
    const filteredByPack = cards.filter(card => card.cardPack === selectedPack.packName);
    const newCards = drawCards(filteredByPack);

    newCards.sort((a, b) => {
      const indexA = rarityOrder.indexOf(a.rarity);
      const indexB = rarityOrder.indexOf(b.rarity);
      return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
    });

    setOpenedCards(newCards);
  }, [cards, selectedPack]);

  const handleUnlockCard = async (card) => {
  try {
    await unlockCards(user.userid, card.id); // στέλνεις μόνο το μοναδικό card.id
    console.log(user.userid, card.id);
  } catch (error) {
    alert("Failed to unlock card");
  }
}

  if (isLoading) return <p style={{ color: "red" }}>Loading cards...</p>;
  if (isError) return <p>Failed to load cards.</p>;
  if (!selectedPack) return <p>No pack selected.</p>;

  const goToShopSection = () => {
    navigate('/shop', { replace: true });
  }

  return (
    <div className='openPack_container'> 
      <div className="packCards_container">
        {openedCards.map(card => (
          <div key={card.id} onClick={() => handleUnlockCard(card)}>
            <Card data={{ ...card, unlocked: true}} flippable={true}/>
          </div>
        ))}
        {selectedCard && (
          <CardStats card={selectedCard} onClose={() => setSelectedCard(null)} />
        )}
        
      </div>
      <div className='button_section'>
        <button onClick={goToShopSection} className='goToShopSection_btn'>Ok</button>
      </div>
      
    </div>
  );
};
