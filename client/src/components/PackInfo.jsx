import { useContext, useState } from "react"
import { Card } from "./Card.jsx"
import { CardStats } from "./CardStats.jsx"
import {useQuery} from "@tanstack/react-query"
import { fetchCards } from "../api/pack1.js"
import '../styles/collection.css'
import { PackContext } from "../Contexts/PackContext.jsx"

export const PackInfo = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const {selectedPack} = useContext(PackContext);
  const {isLoading, isError , data: cards} = useQuery({
    queryKey: ['cards'],
    queryFn: fetchCards,
  })

  if (isLoading) return <p style={{text:"red"}}>Loading cards...</p>;
  if (isError) return <p>Failed to load cards.</p>;
  if (!selectedPack) return <p>No pack selected.</p>;

  const cardTypes  = [...new Set(cards.map((card) => card.cardType))];

  const filteredByPack = cards.filter((card) => card.cardPack === selectedPack.packName);

  return (
    <div className="collection_container">
    <h1 className="collection_title">{selectedPack.packName}</h1>
  
    {cardTypes.map((type) => (
      <h2 key={type} className="type_title"></h2>
    ))}
  
    <div className="cards_grid">
      {cardTypes.map((type) => {
          const filteredCards = filteredByPack.filter((card) => card.cardType === type);
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
