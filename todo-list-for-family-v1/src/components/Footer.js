import React from 'react';

const Footer = ({ buttonLabel, onButtonClick }) => (
  <footer className="w-full py-4 bg-yellow-400 flex justify-center items-center">
    <button
      className="px-6 py-2 text-white font-bold rounded"
      onClick={onButtonClick}
    >
      {buttonLabel}
    </button>
  </footer>
);

export default Footer;
