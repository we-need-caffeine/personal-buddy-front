import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SurveyContext } from '../../../context/SurveyContext';

const SurveyType = () => {
  const { state, actions } = useContext(SurveyContext)
  const { insert, insertConfirm } = actions
  const [catogerys, setCategorys] = useState([])

  const navigate = useNavigate();

  const onClickToCheck = (e) => {
    let value = e.target.value
    if(e.target.checked){
      setCategorys([...catogerys, value])
    } else {
      setCategorys(catogerys.filter((c) => c !== value))
    }
  }

  const onClickToInsertAndNavigate = () => {
    insert(catogerys)
    insertConfirm(catogerys[0])
    navigate(catogerys[0])
  }

  return (
    <div>
      <div>타입</div>
      <div>
        <label>
          <input onClick={onClickToCheck} type='checkbox' value="food" />
          <p>음식</p>
        </label>
      </div>
      <div>
        <label>
          <input onClick={onClickToCheck} type='checkbox' value="travel" />
          <p>여행</p>
        </label>
      </div>
      <div>
        <label>
          <input  onClick={onClickToCheck}type='checkbox' value="health" />
          <p>운동</p>
        </label>
      </div>
      <div>
        <button onClick={onClickToInsertAndNavigate}>다음으로</button>
      </div>
    </div>
  );
};

export default SurveyType;