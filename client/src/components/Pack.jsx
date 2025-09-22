import '../styles/pack.css'
import { Link } from 'react-router-dom';
import { BuyPackButton } from './BuyPackButton';


export const Pack = ({ data, onSelect }) => {
  const { packImage, packName } = data;

  return (
    <div className="pack_container lightblack">
      <h3>{packName}</h3>
      <img src={packImage} alt="Pack" />
      <div className="button_container">
        <BuyPackButton onClick={onSelect} />
      <Link to="/shop/info">
        <button className="PackInfo blue" onClick={onSelect}>Info</button>
      </Link>
      </div>
    </div>
  );
};