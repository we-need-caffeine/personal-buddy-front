import React from 'react';
import { Outlet } from 'react-router-dom';

const Banner = () => {
    return (
        <div>
            배너
            <Outlet />
        </div>
    );
};

export default Banner;