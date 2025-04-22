import React from 'react';

import CalenderRight from './calenderRight/CalenderRight';
import CalenderLeft from './calenderLeft/CalenderLeft';

const CalenderAll = () => {
    return (
        <div>
            <CalenderLeft />
            <CalenderRight />
        </div>
    );
};

export default CalenderAll;