import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} FoodApp. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
