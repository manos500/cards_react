import '../styles/filter.css'
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const Filter = () => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedMonsterTypes, setSelectedMonsterTypes] = useState([]);
  const [selectedSpellTrapTypes, setSelectedSpellTrapTypes] = useState([]);
  const location = useLocation();
  const {
    filterCardTypes = [],
    attributeTypes = [],
    levelTypes = [],
    monsterTypes = [],
    SpellTrapCardTypes = [],
  } = location.state || {};

  const toggleTypes = (type) => {
    setSelectedTypes((prev) => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
  );
};

  const handleClear = () => {
    setSelectedTypes([]);
    setSelectedAttributes([]);
    setSelectedLevels([]);
    setSelectedMonsterTypes([]);
    setSelectedSpellTrapTypes([]);
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
            onClick={() => toggleTypes(type)}
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

      <h2>Spell/Trap Type</h2>
      <div className="card_type_section">
        {SpellTrapCardTypes.map((type, index) => (
          <li key={index}>
            <button className='option_btn'>{type}</button>
          </li>
        ))}
      </div>
      <div className='options_footer'>
        <button className='option_btn clear_filter_btn' onClick={handleClear}>Clear Filters</button>
        <Link to="/collection">
          <button className='option_btn cancel_btn' onClick={handleClear}>Cancel</button>
        </Link>
        <Link to="/collection" state={{ selectedTypes, selectedAttributes, selectedLevels, selectedMonsterTypes, selectedSpellTrapTypes }}>
          <button className='option_btn ok_btn'>Ok</button>
        </Link>
      </div>
    </div>
  );
}
