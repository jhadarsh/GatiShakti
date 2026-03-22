import React, { useState, useEffect } from "react";
import Adarsh from "../../../assets/user/Adarsh-jha.jpg";
import Kishan from "../../../assets/user/kishan-kumar.jpg";
import Manas from "../../../assets/user/Manas-Singh.png";
import {
  Linkedin,
  Mail,
  Users,
  Target,
  Award,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useLocation } from "react-router-dom";
const About = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 200);
      }
    }
  }, [location]);

  const teamMembers = [
    {
      id: 1,
      name: "Adarsh Kumar",
      role: "Full Stack and AI/ML Developer",
      image: Adarsh,
      linkedin: "https://www.linkedin.com/in/adarsh-kumar-13a17b2a7/",
      email: "adarsh25nov@gmail.com",
      contributions: [
        "Backend Architecture",
        "User Interface Design",
        "API Development",
      ],
      bio: "Passionate about building scalable web applications and solving complex problems with clean code.",
    },
    {
      id: 2,
      name: "Kishan Kumar",
      role: "Full Stack Developer",
      image: Kishan,
      linkedin: "https://www.linkedin.com/in/kishan-kumar-00822428b/",
      email: "dronacharya.it2027@gmail.com",
      contributions: ["Project Management", "React Development", "Deployment"],
      bio: "Creative developer focused on creating intuitive user experiences and pixel-perfect designs.",
    },
    {
      id: 3,
      name: "Manas Singh",
      role: "Full Stack Developer",
      image: Manas,
      linkedin: "https://www.linkedin.com/in/manas-singh-1b7a23289/",
      email: "dronacharya.it2027@gmail.com",
      contributions: [
        "Project Management",
        "Full Stack Development",
        "System Architecture",
      ],
      bio: "Experienced in end-to-end project development with a focus on delivering robust solutions.",
    },
  ];

  const projectHighlights = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Our Mission",
      description:
        "To democratize placement preparation by providing free, high-quality mock tests and learning resources to students across India.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "For Students, By Students",
      description:
        "Built by students who understand the challenges of placement season, ensuring our platform addresses real pain points.",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "What We Offer",
      description:
        "Comprehensive mock tests, coding challenges, aptitude practice, and interview preparation for top tech companies.",
    },
  ];

  // Auto-rotate every 10 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % teamMembers.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const getCirclePosition = (index) => {
    const totalMembers = teamMembers.length;
    const angle = (index - activeIndex) * (360 / totalMembers);
    const radius = 350; // Increased radius for better visibility
    const angleRad = (angle * Math.PI) / 180;

    return {
      x: Math.sin(angleRad) * radius,
      y: -Math.cos(angleRad) * radius,
      isActive: index === activeIndex,
    };
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setActiveIndex(
      (prev) => (prev - 1 + teamMembers.length) % teamMembers.length,
    );
  };

  const activeMember = teamMembers[activeIndex];

  return (
  <div className="min-h-screen bg-[#08101e] py-12 px-4 sm:px-6 -mt-32 pt-24 lg:px-8 overflow-hidden">
  <div className="max-w-7xl mx-auto">

    {/* Header Section */}
    <div className="text-center mb-16 mt-16">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
        Team <span className="text-cyan-400">Dronacharya</span>
      </h1>
      <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto">
     Empowering cities with smarter traffic intelligence, real-time insights, and seamless mobility solutions.
      </p>
    </div>

    {/* Team Members Circular Carousel Section */}
    <div className="mb-20">
      <div className="relative">

        <div className="relative h-[800px] lg:-mt-36 flex items-center justify-center">

          {/* Center */}
          <div className="absolute z-50 flex flex-col items-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="animate-scale-in flex flex-col items-center">

              <div className="rounded-full overflow-hidden border-8 border-cyan-400 w-64 h-64 shadow-[0_0_40px_rgba(34,211,238,0.4)] mb-6">
                <div className="w-full h-full bg-[#0f172a] flex items-center justify-center">
                  {activeMember.image ? (
                    <img src={activeMember.image} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-8xl font-bold text-white">
                      {activeMember.name.charAt(0)}
                    </div>
                  )}
                </div>
              </div>

              <div className="text-center mb-4">
                <h3 className="text-3xl font-bold text-white mb-2">
                  {activeMember.name}
                </h3>
                <p className="text-cyan-400 font-semibold text-xl">
                  {activeMember.role}
                </p>
              </div>

              <div className="flex justify-center items-center space-x-4">
                <a
                  href={activeMember.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-full transition-all duration-300 transform hover:scale-110"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.15)"
                  }}
                >
                  <Linkedin size={24} className="text-cyan-400" />
                </a>

                <a
                  href={`mailto:${activeMember.email}`}
                  className="p-4 rounded-full transition-all duration-300 transform hover:scale-110"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.15)"
                  }}
                >
                  <Mail size={24} className="text-cyan-400" />
                </a>
              </div>
            </div>
          </div>

          {/* Small Circles */}
          <div className="absolute w-full h-full">
            {teamMembers.map((member, index) => {
              const pos = getCirclePosition(index);
              const isActive = pos.isActive;

              return (
                <div
                  key={member.id}
                  className={`absolute transition-all duration-700 ease-in-out cursor-pointer ${
                    isActive
                      ? "opacity-0 pointer-events-none"
                      : "opacity-100 z-10"
                  }`}
                  style={{
                    transform: `translate(${pos.x}px, ${pos.y}px)`,
                    left: "50%",
                    top: "50%",
                    marginLeft: "-90px",
                    marginTop: "-90px",
                  }}
                  onClick={() => {
                    setActiveIndex(index);
                    setIsAutoPlaying(false);
                  }}
                >
                  <div className="rounded-full overflow-hidden border-4 border-cyan-400/40 w-44 h-44 shadow-[0_0_25px_rgba(34,211,238,0.2)] hover:scale-110 hover:border-cyan-400 transition-all duration-300">
                    <div className="w-full h-full bg-[#0f172a] flex items-center justify-center">
                      {member.image ? (
                        <img src={member.image} className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-5xl font-bold text-white">
                          {member.name.charAt(0)}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <p className="text-sm font-bold text-slate-400">
                      {member.name}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-4 rounded-full transition-all duration-300 hover:scale-110"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.15)"
            }}
          >
            <ChevronLeft size={28} className="text-cyan-400" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-4 rounded-full transition-all duration-300 hover:scale-110"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.15)"
            }}
          >
            <ChevronRight size={28} className="text-cyan-400" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center space-x-3 mt-8">
          {teamMembers.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveIndex(index);
                setIsAutoPlaying(false);
              }}
              className={`rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "bg-cyan-400 w-10 h-3"
                  : "bg-slate-600 hover:bg-slate-500 w-3 h-3"
              }`}
            />
          ))}
        </div>

        {/* Auto-play */}
        <div className="text-center mt-4">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
          >
            {isAutoPlaying ? "⏸ Pause auto-rotate" : "▶ Resume auto-rotate"}
          </button>
        </div>
      </div>
    </div>
  </div>

  {/* Animations (UNCHANGED) */}
  <style jsx>{`
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes scale-in {
      from { opacity: 0; transform: scale(0.8); }
      to { opacity: 1; transform: scale(1); }
    }
    .animate-fade-in { animation: fade-in 0.8s ease-out; }
    .animate-scale-in { animation: scale-in 0.7s ease-out; }
  `}</style>
</div>
  );
};

export default About;
