import React from "react";

const About = () => {
  return (
    <section className="bg-gradient-to-r from-[#736278] via-[#3730a3] to-[#10b981] text-white py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">About Us</h2>
        <p className="text-lg leading-relaxed opacity-90 max-w-3xl mx-auto">
          At <span className="font-semibold">GatiShakti</span>, we are committed
          to revolutionizing urban mobility through smart technology, intelligent
          traffic management, and sustainable solutions.  
          <br />  
          Our mission is to empower citizens with efficient journey planning,
          affordable transport options, and greener commuting choices — shaping
          the future of mobility for India.
        </p>
      </div>
    </section>
  );
};

export default About;
