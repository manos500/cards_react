import { useState } from 'react';
import { rarityImages } from '../utils/imageMaps.js';
import '../styles/card.css';

const backCardUrl = "http://localhost:5000/public/assets/backCard.png";

export const Card = ({ data, onClick, flippable = false }) => {
  const {
    id,
    name,
    image,
    cardType,
    attribute,
    level,
    monsterType,
    rarity,
    description,
    unlocked
  } = data;

  const rarityImage = rarityImages[rarity];

  const [isFlipped, setIsFlipped] = useState(flippable); 

  const handleClick = () => {
    if (flippable && isFlipped) {
      setIsFlipped(false); 
    }
    if (onClick) onClick(); 
  };

  const shownImage = flippable && isFlipped ? backCardUrl : image;

  return (
    <div className="card_container" onClick={handleClick}>
      {shownImage &&  (
        <div className="card_rarity">
          <img src={rarityImage} alt={rarity} />
        </div>
      )}
      <img
        src={shownImage}
        alt={name}
        className={unlocked ? '' : 'locked'}
      />
    </div>
  );
};
