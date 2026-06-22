import { motion } from "framer-motion";
import { Map, ParkingCircle, AlertTriangle } from "lucide-react";

const features = [
  {
    icon: <Map size={28} />,
    title: "Plan Your Journey",
    desc: "Get optimized routes with real-time traffic insights for faster travel.",
  },
  {
    icon: <ParkingCircle size={28} />,
    title: "Book Parking",
    desc: "Find and reserve nearby parking spots before reaching your destination.",
  },
  {
    icon: <AlertTriangle size={28} />,
    title: "Raise Complaint",
    desc: "Report traffic issues instantly and help improve city infrastructure.",
  },
];

export default function WhatWeProvide() {
  return (
    <section className="relative pt-40 pb-24 bg-section overflow-hidden">

      {/* Hero -> Section Transition */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 120"
          className="relative block w-full h-[80px] md:h-[120px]"
          preserveAspectRatio="none"
        >
          <path
            fill="#F3E4DA"
            d="M0,64L80,74.7C160,85,320,107,480,106.7C640,107,800,85,960,69.3C1120,53,1280,43,1360,37.3L1440,32L1440,0L0,0Z"
          />
        </svg>
      </div>

      {/* Floating Background Effects */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />

      {/* Subtle Grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(217,93,3,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(217,93,3,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="
              font-script
              text-primary
              text-5xl
              md:text-6xl
            "
          >
            Services
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="
              font-sans
              text-text-primary
              text-4xl
              md:text-5xl
              font-bold
              uppercase
              tracking-wide
            "
          >
            What We Provide
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="
              mt-5
              max-w-2xl
              mx-auto
              text-text-secondary
              leading-relaxed
            "
          >
            Intelligent traffic solutions designed to reduce congestion,
            improve mobility, and create a smarter urban transportation
            experience.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-3">

          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.15,
                duration: 0.6,
              }}
              viewport={{ once: true }}
              className="
                group
                relative

                bg-surface
                rounded-3xl
                p-8

                border
                border-primary/10

                transition-all
                duration-500

                hover:-translate-y-3
                hover:shadow-[0_20px_50px_rgba(217,93,3,0.15)]

                overflow-hidden
              "
            >

              {/* Animated Top Border */}
              <div
                className="
                  absolute
                  top-0
                  left-0
                  h-1
                  w-0

                  bg-primary

                  transition-all
                  duration-500

                  group-hover:w-full
                "
              />

              {/* Icon */}
              <div
                className="
                  w-14
                  h-14

                  rounded-full

                  flex
                  items-center
                  justify-center

                  bg-primary/10
                  text-primary

                  mb-6

                  transition-all
                  duration-500

                  group-hover:bg-primary
                  group-hover:text-white
                  group-hover:rotate-6
                "
              >
                {item.icon}
              </div>

              {/* Title */}
              <h3
                className="
                  text-xl
                  font-semibold

                  text-text-primary

                  mb-3

                  transition-colors
                  duration-300

                  group-hover:text-primary
                "
              >
                {item.title}
              </h3>

              {/* Description */}
              <p
                className="
                  text-text-secondary
                  leading-relaxed
                "
              >
                {item.desc}
              </p>

              {/* Decorative Circle */}
              <div
                className="
                  absolute
                  -right-12
                  -bottom-12

                  w-32
                  h-32

                  rounded-full

                  bg-primary/5

                  scale-0
                  group-hover:scale-100

                  transition-all
                  duration-700
                "
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}