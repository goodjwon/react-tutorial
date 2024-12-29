import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, title, backIcon, buttonLabel, onButtonClick }) => (
  <div className="flex flex-col min-h-screen">
    <Header title={title} backIcon={backIcon} />
    <main className="flex-grow">{children}</main>
    <Footer buttonLabel={buttonLabel} onButtonClick={onButtonClick} />
  </div>
);

export default Layout;
