import React from "react";
import Rules from "../Rules";

const Footer = () => {
  return (
    <div
      role="contentinfo"
      className="flex flex-col items-center space-y-4 p-4 pt-6 bg-white text-black w-full mt-12"
    >
      <Rules />
      <p data-testid="copyright" className="text-sm">
        © Darius Kaya
      </p>
    </div>
  );
};

export default Footer;
