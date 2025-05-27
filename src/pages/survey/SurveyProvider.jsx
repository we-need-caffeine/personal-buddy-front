import { createContext, useState } from 'react';

const SurveyContext = createContext();

const SurveyProvider = ({ children }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [details, setDetails] = useState({});  // 카테고리별 세부 선택 저장

  const insertCategories = (categories) => {
    setSelectedCategories(categories);
    setCurrentCategoryIndex(0);
  };

  const insertDetail = (category, type, values) => {
    setDetails(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [type]: values
      }
    }));
  };

  const goToNextCategory = () => {
    setCurrentCategoryIndex(prev => prev + 1);
  };

  const value = {
    state: {
      selectedCategories,
      currentCategory: selectedCategories[currentCategoryIndex] || null,
      currentCategoryIndex,
      details,
    },
    actions: {
      insertCategories,
      insertDetail,
      goToNextCategory,
    },
  };

  return (
    <SurveyContext.Provider value={value}>
      {children}
    </SurveyContext.Provider>
  );
};

export { SurveyProvider, SurveyContext };
