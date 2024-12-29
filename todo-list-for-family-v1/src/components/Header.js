import React from 'react';

const Header = ({ title, backIcon }) => (
  <header className="w-full bg-gray-100 sticky top-0 z-[99]">
    <div className="flex flex-row items-center px-4 py-4 gap-3">
      {backIcon && (
        <div className="relative w-6 h-6 shrink-0">
          <img
            src="./public/vector--01.svg"
            alt="뒤로가기"
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
      )}
      <h1 className="text-xl font-bold">{title}</h1>
    </div>
  </header>
);

export default Header;
