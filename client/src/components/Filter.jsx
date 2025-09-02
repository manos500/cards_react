import '../styles/filter.css'
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useFilterSort } from '../Contexts/FilterSortContext';

export const Filter = () => {
  const {
    selectedTypes, setSelectedTypes,
    selectedAttributes, setSelectedAttributes,
    selectedLevels, setSelectedLevels,
    selectedMonsterTypes, setSelectedMonsterTypes,
    selectedSpellTrapTypes, setSelectedSpellTrapTypes,
    clearFilters
  } = useFilterSort();

const location = useLocation();
const {
  filterCardTypes = [],
  attributeTypes = [],
  levelTypes = [],
  monsterTypes = [],
} = location.state || {};

  const toggleTypes = (type) => {
    setSelectedTypes((prev) => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
  );
};

  return (
    <div className='filter_options_container'>
      <h1 className="filter_title">Filters</h1>

      <h2>Card Type</h2>
      <div className="card_type_section">
        {filterCardTypes.map((type, index) => (
          <li key={index}>
            <button
            className={`option_btn ${selectedTypes.includes(type) ? 'selected' : ''}`}
            onClick={() => toggleTypes(type, selectedTypes, setSelectedTypes)}
          >
            {type}
          </button>

          </li>
        ))}
      </div>

      <h2>Attribute</h2>
      <div className="card_type_section">
        {attributeTypes.map((type, index) => (
          <li key={index}>
            <button className='option_btn'>{type}</button>
          </li>
        ))}
      </div>

      <h2>Card Level</h2>
      <div className="card_type_section">  
        {levelTypes.map((type, index) => (
          <li key={index}>
            <button className='option_btn'>{type}</button>
          </li>
        ))}
      </div>

      <h2>Monster Type</h2>
      <div className="card_type_section">
        {monsterTypes.map((type, index) => (
          <li key={index}>
            <button className='option_btn'>{type}</button>
          </li>
        ))}
      </div>

   
      <div className='options_footer'>
        <button className='filter_btn clear_filter_btn' onClick={clearFilters}>Clear Filters</button>
        <Link to="/collection">
          <button className='filter_btn cancel_btn' onClick={clearFilters}>Cancel</button>
        </Link>
        <Link to="/collection" state={{ selectedTypes, selectedAttributes, selectedLevels, selectedMonsterTypes, selectedSpellTrapTypes }}>
          <button className='filter_btn ok_btn'>Ok</button>
        </Link>
      </div>
    </div>
  );
}
