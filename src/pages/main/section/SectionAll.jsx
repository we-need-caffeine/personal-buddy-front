import React from 'react';

import SectionPlace from './SectionPlace';
import SectionRecommend from './SectionRecommend';
import SectionShopping from './SectionShopping';

const SectionAll = () => {
    return (
        <div>
            <SectionRecommend />
            <SectionPlace />
            <SectionShopping />
        </div>
    );
};

export default SectionAll;