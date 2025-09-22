import { useNavigate } from "react-router-dom";
import '../styles/buyPackButton.css'

export const BuyPackButton = ({ onClick }) => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const token = sessionStorage.getItem("token");

  const handleClick = () => {
    if (!user || !token) {
      navigate("/login"); 
      return;
    }

    onClick(); 
    navigate("/shop/buy"); 
  };

  return (
    <button className="buyPack" onClick={handleClick}>
      Buy
    </button>
  );
};
