import { createContext, useContext, useState } from 'react';

const FilterSortContext = createContext();

export const useFilterSort = () => useContext(FilterSortContext);

export const FilterSortProvider = ({ children }) => {
  const [selectedSortOption, setSelectedSortOption] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedMonsterSpellTrapTypes, setSelectedMonsterSpellTrapTypes] = useState([]);

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedAttributes([]);
    setSelectedLevels([]);
    setSelectedMonsterSpellTrapTypes([]);

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
        selectedMonsterSpellTrapTypes,
        setSelectedMonsterSpellTrapTypes,
        clearFilters,
      }}
    >
      {children}
    </FilterSortContext.Provider>
  );
};
