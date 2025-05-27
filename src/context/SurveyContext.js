import { createContext, useState } from "react";

const SurveyContext = createContext({
  state: {
    categorys: [],
    confirmCategorys: [],
    details: {}, // 카테고리별 정보 저장
    surveyCompleted: false,  // 설문 완료 여부
    currentUser: null,       // 현재 유저 정보 추가
  },
  actions: {
    insert: () => {},
    insertConfirm: () => {},
    insertDetails: () => {},
    remove: () => {},
    removeConfirm: () => {},
    resetDetails: () => {},
    setSurveyCompleted: () => {},  // 설문 완료 상태 관리
    setCurrentUser: () => {},      // 현재 유저 정보 관리
  }
});

const SurveyProvider = ({ children }) => {
  const [categorys, setCategorys] = useState([]);
  const [confirmCategorys, setConfirmCategorys] = useState([]);
  const [details, setDetails] = useState({});
  const [surveyCompleted, setSurveyCompleted] = useState(false); 
  const [currentUser, setCurrentUser] = useState(null);  // 현재 유저 상태 추가

  const insert = (category) => setCategorys(category);
  const insertConfirm = (category) => {
    if (!confirmCategorys.includes(category)) {
      setConfirmCategorys([...confirmCategorys, category]);
    }
  };
  const insertDetails = ({ category, section, values }) => {
    setDetails(prev => {
      const updated = { ...prev };
      if (!updated[category]) {
        updated[category] = { info: [], place: [], shopping: [] };
      }
      updated[category][section] = values;
      return updated;
    });
  };
  const remove = (category) => {
    setCategorys(categorys.filter(c => c !== category));
    setDetails(prev => {
      const updated = { ...prev };
      delete updated[category];
      return updated;
    });
  };
  const removeConfirm = (category) => {
    setConfirmCategorys(confirmCategorys.filter(c => c !== category));
  };
  const resetDetails = () => setDetails({});

  const value = {
    state: { categorys, confirmCategorys, details, surveyCompleted, currentUser },
    actions: { insert, insertConfirm, insertDetails, remove, removeConfirm, resetDetails, setSurveyCompleted, setCurrentUser }
  };

  return (
    <SurveyContext.Provider value={value}>
      {children}
    </SurveyContext.Provider>
  );
};

export { SurveyProvider, SurveyContext };
