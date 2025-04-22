import React from 'react';
import DropdownAlert from './dropdown/DropdownAlert';
import DropdownMessage from './dropdown/DropdownMessage';

const Header = () => {
    return (
        <div>
             헤더
            <DropdownAlert />
            <DropdownMessage />
        </div>
    );
};

export default Header;