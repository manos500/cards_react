import { backCard } from '../assets/index.js'
import '../styles/card.css'

export const Card = (props) => {
    const {id, name, image, cardType, attribute, level, monsterType, rarity, description, unlocked} = props.data;
  return (
    <div  className="card_container">
        <img
        src={image}
        alt={name}
        className={unlocked ? '' : 'locked'}
        />
    </div>
  )
}
