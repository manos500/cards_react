import { useState } from "react"
import { Card } from "./Card.jsx"
import { CardStats } from "./CardStats.jsx"
import { Sort } from "./Sort.jsx"
import {useQuery} from "@tanstack/react-query"
import { fetchPack1 } from "../api/pack1.js"
import '../styles/collection.css'
import { filter, search } from "../assets/index.js"
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export const Collection = () => {
  const location = useLocation();
  const {
    selectedTypes = [],
    selectedAttributes = [],
    selectedLevels = [],
    selectedMonsterTypes = [],
    selectedSpellTrapTypes = [],
  } = location.state || {};

  console.log("Selected Filters:", {
    selectedTypes,
    selectedAttributes,
    selectedLevels,
    selectedMonsterTypes,
    selectedSpellTrapTypes
  });
  const [selectedCard, setSelectedCard] = useState(null);
  const [isSortbtnPressed, setisSortbtnPressed] = useState(false)
  const {isLoading, isError , data: cards} = useQuery({
    queryKey: ['cards'],
    queryFn: fetchPack1,
  })

  if (isLoading) return <p style={{text:"red"}}>Loading cards...</p>;
  if (isError) return <p>Failed to load cards.</p>;

  const cardTypes = [...new Set(cards.map((card) => card.cardType))];
  const filterCardTypes = [...new Set(cards.map((card) => card.filterCardType))];
  const attributeTypes = [...new Set(cards.map((card) => card.attribute))];
  const levelTypes = [...new Set(cards.map((card) => card.level))];
  const monsterTypes = [...new Set(cards.map((card) => card.monsterType))];
  const SpellTrapCardType = [...new Set(cards.map((card) => card.SpellTrapCardType))];
  
 
  return (
    
    <div className="collection_container">
      <h1 className="collection_title">My Card Collection</h1>
      <div className="filter_container">
        <div className="search_container">
           <input className="searchBar" type="text" placeholder="Search" />
           <button className="search_btn">
            <img src={search} alt="" />
           </button>
        </div>

        <button className="sortBtn" onClick={() => setisSortbtnPressed(true)}>
            <h2>Sort</h2>
            <img src={filter} alt="" />
          </button>
         <Link to="/collection/filter" state={{ filterCardTypes, attributeTypes, levelTypes, monsterTypes, SpellTrapCardType }}>
          <button className="filterBtn">
            <h2>Filters</h2>
            <img src={filter} alt="" />
          </button>
        </Link>
         
      </div>
     
      {cardTypes.map((type) => (
        <h2 key={type} className="type_title"></h2>
      ))}
    
      <div className="cards_grid">
        {cardTypes.map((type) => {
          const filteredCards = cards.filter((card) => card.cardType === type);
          return filteredCards.map((card) => (
            <div key={card.id} onClick={() => setSelectedCard(card)}>
              <Card data={card} />
            </div>
          ));
        })}
      </div>
        {selectedCard && (
          <CardStats card={selectedCard} onClose={() => setSelectedCard(null)} />
        )}
        {isSortbtnPressed && (
          <Sort onClose={() => setisSortbtnPressed(false)} />
        )}
        
  </div>
  )
}
