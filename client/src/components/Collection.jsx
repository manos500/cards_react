import { useState } from "react"
import { Card } from "./Card.jsx"
import { CardStats } from "./CardStats.jsx"
import { Sort } from "./Sort.jsx"
import {useQuery} from "@tanstack/react-query"
import { fetchUserCollection } from "../api/pack1.js"
import '../styles/collection.css'
import { filter, search } from "../assets/index.js"
import { Link } from 'react-router-dom';
import { useFilterSort } from "../Contexts/FilterSortContext.jsx"
import { Loader } from "./Loader.jsx"
import { Error } from "./Error.jsx"


export const Collection = () => {

  const {
    selectedTypes,
    selectedAttributes,
    selectedLevels,
    selectedMonsterTypes,
    selectedSpellTrapTypes,
    selectedSortOption
  } = useFilterSort();

  const [selectedCard, setSelectedCard] = useState(null);
  const [isSortbtnPressed, setisSortbtnPressed] = useState(false);
  const [searchCard, setsearchCard] = useState('');
  const [inputValue, setInputValue] = useState('');
  const user = JSON.parse(sessionStorage.getItem("user"));

  // Get the filtered options tha user selected
  
  if (!user) {
    return (
      <div className="noCollection_container">
       <h1>Login to access collection</h1>
      </div>
    ) 
  }


  const {
  isLoading: isLoadingCards,
  isError: isErrorCards,
  data: cards,
} = useQuery({
  queryKey: ['cards', user.userid],
  queryFn: () => fetchUserCollection(user.userid),
});



if (isLoadingCards) { return (
     <div className="loader_container">
      <Loader />
    </div>
    );
  }
   
  if (isErrorCards) {
    return (
      <div className="error_container">
        <Error />
      </div>
    )
  }

// const cardsWithUnlockStatus = cards.map(card => {
//   const matching = (car || []).find(uc => uc.id === card.id);
//   return {
//     ...card,
//     unlocked: matching?.unlocked ?? false
//   };
// });



  // Send to Filter Component for dynamic 
  const unlockedCards = cards.filter(card => card.unlocked);
  console.log("Unlocked Cards:", unlockedCards);

  const cardTypes = [...new Set(cards.map((card) => card.cardType))];
  const filterCardTypes = [...new Set(cards.map((card) => card.frametype))];
  const attributeTypes = [...new Set(cards.map((card) => card.attribute))];
  const levelTypes = [...new Set(cards.map((card) => card.level))];
  const monsterTypes = [...new Set(cards.map((card) => card.race))];
  const rarityTypes = [...new Set(cards.map((card) => card.rarity))];

  
  // Apply filters
  const filteredCards = cards.filter((card) => {
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(card.filterCardType);
    const matchesAttribute = selectedAttributes.length === 0 || selectedAttributes.includes(card.attribute);
    const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(card.level);
    const matchesMonsterType = selectedMonsterTypes.length === 0 || selectedMonsterTypes.includes(card.monsterType);
    const matchesSpellTrapType = selectedSpellTrapTypes.length === 0 || selectedSpellTrapTypes.includes(card.SpellTrapCardType);
    const rarityType = rarityTypes.length === 0 || rarityTypes.includes(card.rarity);
    
    const matchesSearchCard = searchCard === '' || card.name.toLowerCase().includes(searchCard.toLowerCase())

    return matchesType && matchesAttribute && matchesLevel && matchesMonsterType && matchesSpellTrapType && rarityType && matchesSearchCard;
  })

  const rarityOrder = ["Common", "Rare", "Super Rare", "Ultra Rare"];

  // Apply sorting
  let sortedCards = [...filteredCards];

 if (!selectedSortOption) {
  // Default sort by cardTypeOrder
  sortedCards.sort((a, b) => {
    const indexA = cardTypes.indexOf(a.cardType);
    const indexB = cardTypes.indexOf(b.cardType);
    return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
  });
  } else if (selectedSortOption === "A-Z") {
    sortedCards.sort((a, b) => a.name.localeCompare(b.name));
  } else if (selectedSortOption === "Z-A") {
    sortedCards.sort((a, b) => b.name.localeCompare(a.name));
  } else if (selectedSortOption === "Highest_Attack") {
    sortedCards.sort((a, b) => (b.attack || 0) - (a.attack || 0));
  } else if (selectedSortOption === "Lowest_Attack") {
    sortedCards.sort((a, b) => (a.attack || 0) - (b.attack || 0));
  } else if (selectedSortOption === "Highest_Defense") {
    sortedCards.sort((a, b) => (b.defense || 0) - (a.defense || 0));
  } else if (selectedSortOption === "Lowest_Defense") {
    sortedCards.sort((a, b) => (a.defense || 0) - (b.defense || 0));
  } else if (selectedSortOption === "Highest_CardLevel") {
    sortedCards.sort((a, b) => (b.level || 0) - (a.level || 0));
  } else if (selectedSortOption === "Lowest_CardLevel") {
    sortedCards.sort((a, b) => (a.level || 0) - (b.level || 0));
  } else if (selectedSortOption === "Highest_CardRarity") {
    sortedCards.sort((a, b) => {
      const indexA = rarityOrder.indexOf(a.rarity);
      const indexB = rarityOrder.indexOf(b.rarity);
      return (indexB === -1 ? -1 : indexB) - (indexA === -1 ? -1 : indexA);
    });
  } else if (selectedSortOption === "Lowest_CardRarity") {
    sortedCards.sort((a, b) => {
      const indexA = rarityOrder.indexOf(a.rarity);
      const indexB = rarityOrder.indexOf(b.rarity);
      return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB); 
  });
}

  const handleSearchCard = () => {
    setsearchCard(inputValue);
  }

  return (
    
    <div className="collection_container">
      <h1 className="collection_title">My Card Collection</h1>
      <div className="filter_container">
        <div className="search_container">
           <input className="searchBar" type="text" placeholder="Search" onChange={(e) => setInputValue(e.target.value)}/>
           <button className="search_btn" onClick={() => handleSearchCard()}>
            <img src={search} alt="" />
           </button>
        </div>

        <button className="sortBtn" onClick={() => setisSortbtnPressed(true)}>
            <h2>Sort</h2>
            <img src={filter} alt="" />
          </button>
         <Link to="/collection/filter" state={{
          filterCardTypes,
          attributeTypes,
          levelTypes,
          monsterTypes,
        }}>
          <button className="filterBtn">
            <h2>Filters</h2>
            <img src={filter} alt="" />
          </button>
        </Link>
         
      </div>
     
      {cardTypes.map((type, index) => (
        <h2 key={`${type}-${index}`} className="type_title">
          {type}
        </h2>
      ))}
    
      <div className="cards_grid">
        {sortedCards.map((card) => (
        <div key={card.id} onClick={() => setSelectedCard(card)}>
          <Card data={card} />
        </div>
      ))}
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
