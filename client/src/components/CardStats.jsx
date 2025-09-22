import '../styles/cardStats.css'
import { spellTrapTypeImages, attributeImages, levelImages } from '../utils/imageMaps';

export const CardStats = ({card, onClose}) => {

  const attributeImage = attributeImages[card.attribute];
  const levelImage = levelImages[card.level];
  const spellTrapTypeImage = spellTrapTypeImages[card.race];

  
  return (
    <div className="cardStats_overlay" onClick={onClose}>
        <div className={`cardStats_container ${card.frametype}`} onClick={(e) => e.stopPropagation()}>
        <div className="cardStats_image">
            <img src={card.image} alt={card.name} />
        </div>
        <div className="cardStats_top1">
            <h2>{card.name}</h2>
            <p className='gray_text'><strong>[{card.race}/{card.frametype}]</strong></p>           
             {card.attack != null && <p>ATK: {card.attack} / DEF: {card.defense}</p>}   
        </div>
        <div className="cardStats_top2">
          {levelImage && <img src={levelImage} alt={card.level} />}
          {spellTrapTypeImage && <img src={spellTrapTypeImage} alt={card.spellTrapTypeImage} />}
          <img src={attributeImage} alt={card.attribute} />
        </div>
        <div className="cardStats_mid">
          <p>{card.description}</p>
        </div>
        <div className="cardStats_bottom">
          <p className='underline'>How to Obtain</p>
          <p>{card.set}</p>
        </div>
      </div>
  </div>
  )
}
