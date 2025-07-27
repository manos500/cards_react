import '../styles/cardStats.css'
import { dark, light, fire, earth, wind, water, spell, trap, divine, star1, star2, star3, star4, star5, star6, star7, star8, star9, star10, star12, equipSpell, fieldSpell, ritualSpell, counterSpell, continuousSpell, quickSpell} from '../assets/index.js'

export const CardStats = ({card, onClose}) => {

  const attributeImages = {
    WATER: water,
    FIRE: fire,
    WIND: wind,
    DARK: dark,
    LIGHT: light,
    EARTH: earth,
    SPELL: spell,
    TRAP: trap,
    DIVINE: divine,
  }

  const spellTrapTypeImages = {
    "Field Spell": fieldSpell,
    "Continuous Spell": continuousSpell,
    "Quick-Play Spell": quickSpell,
    "Equip Spell": equipSpell,
    "Counter Spell": counterSpell,
    "Ritual Spell": ritualSpell,
    "Counter Trap": counterSpell,
    "Continuous Trap": continuousSpell
    
  }

  const levelImages = {
    1: star1,
    2: star2,
    3: star3,
    4: star4,
    5: star5,
    6: star6,
    7: star7,
    8: star8,
    9: star9,
    10: star10,
    12: star12,
  }

  const attributeImage = attributeImages[card.attribute];
  const levelImage = levelImages[card.level];
  const spellTrapTypeImage = spellTrapTypeImages[card.SpellTrapCardType];
  
  return (
    <div className="cardStats_overlay" onClick={onClose}>
        <div className={`cardStats_container ${card.filterCardType}`} onClick={(e) => e.stopPropagation()}>
        <div className="cardStats_image">
            <img src={card.image} alt={card.name} />
        </div>
        <div className="cardStats_top1">
            <h2>{card.name}</h2>
            <p className='gray_text'><strong>[{card.monsterType}/{card.cardType}]</strong></p>           
             {card.attack >= 0 &&<p>ATK: {card.attack} / DEF: {card.defense}</p>}   
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
          <p>{card.pack}</p>
        </div>
      </div>
  </div>
  )
}
