import { createContext, useContext, useState } from 'react';

const FilterSortContext = createContext();

export const useFilterSort = () => useContext(FilterSortContext);

export const FilterSortProvider = ({ children }) => {
  const [selectedSortOption, setSelectedSortOption] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedMonsterTypes, setSelectedMonsterTypes] = useState([]);
  const [selectedSpellTrapTypes, setSelectedSpellTrapTypes] = useState([]);

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedAttributes([]);
    setSelectedLevels([]);
    setSelectedMonsterTypes([]);
    setSelectedSpellTrapTypes([]);
  };

  return (
    <FilterSortContext.Provider
      value={{
        selectedSortOption,
        setSelectedSortOption,
        selectedTypes,
        setSelectedTypes,
        selectedAttributes,
        setSelectedAttributes,
        selectedLevels,
        setSelectedLevels,
        selectedMonsterTypes,
        setSelectedMonsterTypes,
        selectedSpellTrapTypes,
        setSelectedSpellTrapTypes,
        clearFilters,
      }}
    >
      {children}
    </FilterSortContext.Provider>
  );
};
