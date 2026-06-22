// Hero.jsx
import React from "react";

const Hero = () => {
  return (
    <section className="relative h-screen   w-full overflow-hidden bg-bg">
      {/* Mobile Background */}
      <div
        className="absolute inset-0 bg-cover bg-center md:hidden"
        style={{
          backgroundImage: "url('/HeroPhone.png')",
        }}
      />

      {/* Desktop Background */}
      <div
        className="absolute inset-0 hidden bg-cover bg-center md:block"
        style={{
          backgroundImage: "url('/Heroweb.png')",
        }}
      />

      {/* Content */}
{/* Content */}
<div
  className="
    absolute
    inset-0
    z-10
    flex
    flex-col
    items-center
    justify-start

    pt-[10vh]
    md:pt-[6vh]

    px-6
  "
>
  <div className="text-center max-w-2xl">

    {/* Script Word */}
    <h1
      className="
        font-script
        text-text-primary

        text-[5rem]
        sm:text-[6rem]
        md:text-[6rem]

        leading-[0.7]
      "
    >
      Smart
    </h1>

    {/* Main Title */}
    <h2
      className="
        font-sans
        font-bold
      

        uppercase
        tracking-[0.04em]
        text-text-primary

        text-4xl
        sm:text-5xl
        md:text-5xl
        lg:text-4xl

        -mt-4
      "
    >
      Traffic Management
    </h2>
{/* 
    <h2
      className="
        font-sans
        font-bold
        md:font-extralight

        uppercase
        tracking-[0.04em]
        text-text-primary

        text-4xl
        sm:text-5xl
        md:text-5xl
        lg:text-6xl
      "
    >
      Management
    </h2> */}

    <h2
      className="
        font-sans
        font-bold
        

        uppercase
        tracking-[0.04em]
        text-text-primary

        text-4xl
        sm:text-5xl
        md:text-5xl
        lg:text-4xl
      "
    >
      System
    </h2>

    {/* Description */}
    <p
      className="
        mt-4
        md:mt-2
        mx-auto

        max-w-md
        md:max-w-lg

        text-text-secondary

        text-sm
        md:text-base

        leading-relaxed
      "
    >
      Transforming urban mobility through intelligent traffic monitoring.
    </p>

    {/* CTA */}
    <button
      className="
        mt-4

        bg-primary
        hover:bg-primary-hover

        text-white

        rounded-full

        px-7
        md:px-9

        py-3

        text-sm
        md:text-base

        font-semibold

        uppercase
        tracking-wider

        transition-all
        duration-300
      "
    >
      Explore Dashboard
    </button>

  </div>
</div>
    </section>
  );
};

export default Hero;