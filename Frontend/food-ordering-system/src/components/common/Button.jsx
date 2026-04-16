import React from 'react';

const Button = ({ children, variant = 'primary', size = '', onClick, disabled, type = 'button', ...rest }) => {
  const classes = `btn btn-${variant} ${size ? `btn-${size}` : ''}`.trim();
  return (
    <button className={classes} onClick={onClick} disabled={disabled} type={type} {...rest}>
      {children}
    </button>
  );
};

export default Button;
