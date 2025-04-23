import { useParams, Outlet } from "react-router-dom";

const SurveyDetailContainer = () => {
  const { category } = useParams();

  return (
    <div>
      <p>{category} 설문</p> {/* /survey/food */}, {/* /survey/fashion */}, {/* /survey/sports */}
      <Outlet /> 
    </div>
  );
};

export default SurveyDetailContainer;