import '../styles/sort.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFilterSort } from '../Contexts/FilterSortContext';

export const Sort = ({onClose}) => {
  const { selectedSortOption, setSelectedSortOption } = useFilterSort();

  const handleSelect = (value) => {
    setLocalSelectedSortOption(prev => prev === value ? "" : value)
  }

  const [localSelectedSortOption, setLocalSelectedSortOption] = useState(selectedSortOption);

  const handleOk = () => {
    setSelectedSortOption(localSelectedSortOption)
    onClose();
  }
  return (
    <div className="sort_overlay" onClick={onClose}>
      <div className='sort_container' onClick={(e) => e.stopPropagation()}>
        <h1 className='sort_title'>Sorting Options</h1>

        <div className='sort_categories'>
          <button className='main_sort_btn'>Alphabetical Sorting</button>
          <button
            className={`sort_option_btn ${localSelectedSortOption === "A-Z" ? 'selected' : ''}`}
            onClick={() => handleSelect("A-Z")}
          >
            A → Z
          </button>
          <button
            className={`sort_option_btn ${localSelectedSortOption === "Z-A" ? 'selected' : ''}`}
            onClick={() => handleSelect("Z-A")}
          >
            Z → A
          </button>
        </div>

        <div className='sort_categories'>
          <button className='main_sort_btn'>Attack Sorting</button>
          <button
            className={`sort_option_btn ${localSelectedSortOption === "Highest_Attack" ? 'selected' : ''}`}
            onClick={() => handleSelect("Highest_Attack")}
          >
            ↑ Attack
          </button>
          <button
            className={`sort_option_btn ${localSelectedSortOption === "Lowest_Attack" ? 'selected' : ''}`}
            onClick={() => handleSelect("Lowest_Attack")}
          >
            ↓ Attack
          </button>
        </div>

        <div className='sort_categories'>
          <button className='main_sort_btn'>Defense Sorting</button>
          <button
            className={`sort_option_btn ${localSelectedSortOption === "Highest_Defense" ? 'selected' : ''}`}
            onClick={() => handleSelect("Highest_Defense")}
          >
            ↑ Defense
          </button>
          <button
            className={`sort_option_btn ${localSelectedSortOption === "Lowest_Defense" ? 'selected' : ''}`}
            onClick={() => handleSelect("Lowest_Defense")}
          >
            ↓ Defense
          </button>
        </div>

        <div className='sort_categories'>
          <button className='main_sort_btn'>Card Level Sorting</button>
          <button
            className={`sort_option_btn ${localSelectedSortOption === "Highest_CardLevel" ? 'selected' : ''}`}
            onClick={() => handleSelect("Highest_CardLevel")}
          >
            ↑ Level
          </button>
          <button
            className={`sort_option_btn ${localSelectedSortOption === "Lowest_CardLevel" ? 'selected' : ''}`}
            onClick={() => handleSelect("Lowest_CardLevel")}
          >
            ↓ Level
          </button>
        </div>
        <div className='sort_categories'>
          <button className='main_sort_btn'>Rarity Sorting</button>
          <button
            className={`sort_option_btn ${localSelectedSortOption === "Highest_CardRarity" ? 'selected' : ''}`}
            onClick={() => handleSelect("Highest_CardRarity")}
          >
            ↑ Rarity
          </button>
          <button
            className={`sort_option_btn ${localSelectedSortOption === "Lowest_CardRarity" ? 'selected' : ''}`}
            onClick={() => handleSelect("Lowest_CardRarity")}
          >
            ↓ Rarity
          </button>
        </div>
        <Link to="/collection">
          <button className='sort_ok_btn' onClick={handleOk}>Ok</button>
         </Link>
       
      </div>
    </div>
  )
}
