import { createContext, useState } from "react";


const SurveyContext = createContext({
  state : { 
    categorys : [], 
    confirmCategorys : [],
    details : {
      current : [],
      detail : [],
    },
    survey : {
      food : {
        menu : [],
        place : [],
        shopping : []
      },
      travel : {
        menu : [],
        place : [],
        shopping : []
      },
    }
  },
  actions : { 
    insert : () => {},
    insertConfirm : () => {}, 
    insertDetails : () => {},
    remove : () => {},
    removeConfirm : () => {},
    removeDetails : () => {}
  }
})

const SurveyProvider = ({children}) => {
  const [categorys, setCategorys] = useState([])
  const [current, setCurrent] = useState([])
  const [confirmCategorys, setConfirmCategorys] = useState([])

  // 카테고리 추가
  const insert = (category) => { setCategorys(category) }
  const insertConfirm = (category) => { 
    if(!confirmCategorys.some((c) => c === category)){
      setConfirmCategorys(confirmCategorys.concat(category)) 
    }
  }

  // Details 추가
  const insertDetails = (detail) => { 
    if(!confirmCategorys.some((d) => d === detail)){
      setCurrent(current.concat(detail)) 
    }
  }
  
  // 이전 디테일 값 모두 추가
  const insertBeforeDetails = () => { 
    setCurrent(current.concat(['place', 'shopping'])) 
  }

  // 카테고리 삭제
  const remove = (category) => { 
    setCategorys(categorys.filter((c) => category !== c))
  }  
  const removeConfirm = (category) => { 
    setConfirmCategorys(confirmCategorys.filter((c) => category !== c))
  }  
  
  // Details 삭제
  const removeDetails = (detail) => { 
    setCurrent(current.filter((d) => detail !== d))
  }  

  // 디테일 초기화
  const resetDetails = () => {
    setCurrent([])
  }

  const value = {
    state : { 
      categorys : categorys, 
      confirmCategorys : confirmCategorys,
      details : {
        current : current,
        detail : ['', 'place', 'shopping'],
      },
      // 변수 추가, 
    },
    actions : { 
      // 이벤트 누를 때 변수가 추가되고 삭제되는 메서드
      insert : insert,
      insertConfirm : insertConfirm,
      insertDetails : insertDetails,
      insertBeforeDetails : insertBeforeDetails,
      resetDetails : resetDetails,
      remove : remove,
      removeConfirm: removeConfirm,
      removeDetails : removeDetails,
    }
  }

  return (
    <SurveyContext.Provider value={value}>
      {children}
    </SurveyContext.Provider>
  )
}

export { SurveyProvider, SurveyContext}