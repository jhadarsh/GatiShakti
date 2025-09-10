import React from "react";
import banner from "../../../assets/user/banner.png";

const Banner = ({ altText = "Banner" }) => {
  return (
    <img
      src={banner}
      alt={altText}
      className="w-full h-60 md:h-80 lg:h-96 object-contain rounded-2xl "
    />
  );
};

export default Banner;
