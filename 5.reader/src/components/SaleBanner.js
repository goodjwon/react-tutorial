import React from "react";

const SaleBanner = ({ isSale }) => {
  return isSale && <div className="banner">🔥 Sale is on! 🔥</div>;
};

export default SaleBanner;
