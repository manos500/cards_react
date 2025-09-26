import { useContext, useState, useEffect } from "react"
import { Card } from "./Card.jsx"
import { CardStats } from "./CardStats.jsx"
import {useQuery} from "@tanstack/react-query"
import { fetchCards } from "../services/apiClient.js"
import '../styles/collection.css'
import { PackContext } from "../Contexts/PackContext.jsx"
import { Loader } from "./Loader"
import { Error } from "./Error";
import { useNavigate } from 'react-router-dom';

export const PackInfo = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const {selectedPack} = useContext(PackContext);
  const navigate = useNavigate();
  const {isLoading, isError , data: cards} = useQuery({
    queryKey: ['cards'],
    queryFn: fetchCards,
  })

  useEffect(() => {
    if (!selectedPack) {
      navigate("/shop", { replace: true });
    }
  }, [selectedPack, navigate]);

   if (isLoading) { return (
     <div className="loader_container">
      <Loader />
    </div>
    );
  }
   
  if (isError) {
    return (
      <div className="error_container">
        <Error />
      </div>
    )
  }
 

  const cardTypes  = [...new Set(cards.map((card) => card.type))];

 

  const filteredByPack = cards.filter((card) => card.set === selectedPack.packName);



  return (
    <div className="collection_container">
    <h1 className="collection_title">{selectedPack.packName}</h1>
  
    {cardTypes.map((type) => (
      <h2 key={type} className="type_title"></h2>
    ))}
  
    <div className="cards_grid">
      {cardTypes.map((type) => {
        const filteredCards = filteredByPack.filter((card) => card.type === type); 
        return filteredCards.map((card) => (
          <div key={card.id} onClick={() => setSelectedCard(card)}>
            <Card data={{...card, unlocked: true}} />
          </div>
        ));
      })}
    </div>
      {selectedCard && (
        <CardStats card={selectedCard} onClose={() => setSelectedCard(null)} />
      )}
  </div>
  )
}
