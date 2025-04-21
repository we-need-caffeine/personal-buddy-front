import React from 'react';
import Button from './style';

  // ...rest
  // variant, font, color, size, shape, children
const BasicButton = ({children, ...rest}) => {
  return (
    <Button {...rest} >
      {children}
    </Button>
  );
};

export default BasicButton;