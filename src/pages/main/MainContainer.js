import React from 'react';
import CalenderAll from './calender/CalenderAll';
import CalenderHeader from './calender/calenderHeader/CalenderHeader';
import SectionAll from './section/SectionAll';


const MainContainer = () => {
    return (
        <div>          
            <CalenderHeader />
            <CalenderAll />
            <SectionAll />
        </div>
    );
};

export default MainContainer;