import '../styles/sort.css'
import { useState } from 'react';

export const Sort = ({onClose}) => {
  const [selectedSortOption, setselectedSortOption] = useState("");

  const handleSelect = (value) => {
    setselectedSortOption(prev => prev === value ? "" : value)
  }
  return (
    <div className="sort_overlay" onClick={onClose}>
      <div className='sort_container' onClick={(e) => e.stopPropagation()}>
        <h1 className='sort_title'>Sorting Options</h1>

        <div className='sort_categories'>
          <button className='main_sort_btn'>Alphabetical Sorting</button>
          <button
            className={`sort_option_btn ${selectedSortOption === "A-Z" ? 'selected' : ''}`}
            onClick={() => handleSelect("A-Z")}
          >
            A → Z
          </button>
          <button
            className={`sort_option_btn ${selectedSortOption === "Z-A" ? 'selected' : ''}`}
            onClick={() => handleSelect("Z-A")}
          >
            Z → A
          </button>
        </div>

        <div className='sort_categories'>
          <button className='main_sort_btn'>Attack Sorting</button>
          <button
            className={`sort_option_btn ${selectedSortOption === "Highest_Attack" ? 'selected' : ''}`}
            onClick={() => handleSelect("Highest_Attack")}
          >
            ↑ Attack
          </button>
          <button
            className={`sort_option_btn ${selectedSortOption === "Lowest_Attack" ? 'selected' : ''}`}
            onClick={() => handleSelect("Lowest_Attack")}
          >
            ↓ Attack
          </button>
        </div>

        <div className='sort_categories'>
          <button className='main_sort_btn'>Defense Sorting</button>
          <button
            className={`sort_option_btn ${selectedSortOption === "Highest_Defense" ? 'selected' : ''}`}
            onClick={() => handleSelect("Highest_Defense")}
          >
            ↑ Defense
          </button>
          <button
            className={`sort_option_btn ${selectedSortOption === "Lowest_Defense" ? 'selected' : ''}`}
            onClick={() => handleSelect("Lowest_Defense")}
          >
            ↓ Defense
          </button>
        </div>

        <div className='sort_categories'>
          <button className='main_sort_btn'>Card Level Sorting</button>
          <button
            className={`sort_option_btn ${selectedSortOption === "Highest_CardLevel" ? 'selected' : ''}`}
            onClick={() => handleSelect("Highest_CardLevel")}
          >
            ↑ Level
          </button>
          <button
            className={`sort_option_btn ${selectedSortOption === "Lowest_CardLevel" ? 'selected' : ''}`}
            onClick={() => handleSelect("Lowest_CardLevel")}
          >
            ↓ Level
          </button>
        </div>

        <button className='sort_ok_btn' onClick={onClose}>Ok</button>
      </div>
    </div>
  )
}
