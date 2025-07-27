import '../styles/pack.css'
import { Link } from 'react-router-dom';

export const Pack = ({ data, onSelect }) => {
  const { packImage, packName } = data;
  return (
    <div className="pack_container">
      <h3>{packName}</h3>
      <img src={packImage} alt="Pack" />
      <div className="button_container">
      <Link to="/shop/buy">
        <button className="buyPack" onClick={onSelect}>Buy</button>
      </Link>
      <Link to="/shop/info">
        <button className="PackInfo" onClick={onSelect}>Info</button>
      </Link>
      </div>
    </div>
  );
};