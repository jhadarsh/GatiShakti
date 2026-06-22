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
  const [offsets, setOffsets] = useState({ x: 260, y: 140 });

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

  useEffect(() => {
    const updateOffsets = () => {
      if (window.innerWidth < 640) {
        setOffsets({ x: 110, y: 170 });
      } else if (window.innerWidth < 1024) {
        setOffsets({ x: 180, y: 160 });
      } else {
        setOffsets({ x: 260, y: 150 });
      }
    };
    updateOffsets();
    window.addEventListener("resize", updateOffsets);
    return () => window.removeEventListener("resize", updateOffsets);
  }, []);

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

  // diff: 0 = active (center top), 1 = next (right-down), 2 = prev (left-down)
  const getCirclePosition = (index) => {
    const total = teamMembers.length;
    const diff = (index - activeIndex + total) % total;

    if (diff === 0) {
      return { x: 0, y: 0, isActive: true };
    } else if (diff === 1) {
      return { x: offsets.x, y: offsets.y, isActive: false };
    } else {
      return { x: -offsets.x, y: offsets.y, isActive: false };
    }
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
    <div className="min-h-screen bg-section py-12 px-4 sm:px-6 pt-32 lg:px-8 overflow-hidden relative">
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header Section */}
        <div className="text-center mb-16 mt-16">
          <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-4 animate-fade-in">
            Team <span className="text-primary">Dronacharya</span>
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto">
            Empowering cities with smarter traffic intelligence, real-time insights, and seamless mobility solutions.
          </p>
        </div>

        {/* Team Members Circular Carousel Section */}
        <div className="mb-32">
          <div className="relative">

            <div className="relative h-[520px] sm:h-[560px] mt-8">

              {/* Small Circles (rendered first, lower z-index) */}
              <div className="absolute inset-0">
                {teamMembers.map((member, index) => {
                  const pos = getCirclePosition(index);
                  if (pos.isActive) return null;

                  return (
                    <div
                      key={member.id}
                      className="absolute transition-all duration-700 ease-in-out cursor-pointer opacity-100 z-10"
                      style={{
                        left: "50%",
                        top: "50%",
                        width: "176px",
                        height: "176px",
                        marginLeft: "-88px",
                        marginTop: "-88px",
                        transform: `translate(${pos.x}px, ${pos.y}px)`,
                      }}
                      onClick={() => {
                        setActiveIndex(index);
                        setIsAutoPlaying(false);
                      }}
                    >
                      <div className="rounded-full overflow-hidden border-4 border-primary/30 w-44 h-44 shadow-[0_15px_35px_rgba(217,93,3,0.2)] hover:scale-110 hover:border-primary transition-all duration-300">
                        <div className="w-full h-full bg-surface flex items-center justify-center">
                          {member.image ? (
                            <img src={member.image} className="w-full h-full object-cover" />
                          ) : (
                            <div className="text-5xl font-bold text-text-primary">
                              {member.name.charAt(0)}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="absolute -bottom-8 left-[80%] transform -translate-x-1/2 whitespace-nowrap">
                        <p className="text-sm font-bold text-text-secondary">
                          {member.name}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Center (active member, rendered last, highest z-index) */}
              <div
                className="absolute flex flex-col items-center"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 50,
                }}
              >
                <div className="animate-scale-in flex flex-col items-center w-full max-w-xs">

                  <div className="rounded-full overflow-hidden border-8 border-primary w-64 h-64 shadow-[0_15px_35px_rgba(217,93,3,0.2)] mb-6 mx-auto">
                    <div className="w-full h-full bg-surface flex items-center justify-center">
                      {activeMember.image ? (
                        <img src={activeMember.image} className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-8xl font-bold text-text-primary">
                          {activeMember.name.charAt(0)}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-center mb-4">
                    <h3 className="text-3xl font-bold text-text-primary mb-2">
                      {activeMember.name}
                    </h3>
                    <p className="text-primary font-semibold text-xl">
                      {activeMember.role}
                    </p>
                  </div>

                <div className="flex justify-center items-center space-x-4">
                    <a
                      href={activeMember.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-full bg-surface border border-primary/10 transition-all duration-300 hover:bg-primary hover:text-white hover:scale-110 hover:shadow-[0_10px_25px_rgba(217,93,3,0.2)]"
                    >
                      <Linkedin size={24} className="text-primary" />
                    </a>

                    <a
                      href={`mailto:${activeMember.email}`}
                      className="p-4 rounded-full bg-surface border border-primary/10 transition-all duration-300 hover:bg-primary hover:text-white hover:scale-110 hover:shadow-[0_10px_25px_rgba(217,93,3,0.2)]"
                    >
                      <Mail size={24} className="text-primary" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-4 rounded-full bg-surface border border-primary/10 transition-all duration-300 hover:bg-primary hover:scale-110 hover:shadow-lg"
              >
                <ChevronLeft size={28} className="text-primary" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-4 rounded-full bg-surface border border-primary/10 transition-all duration-300 hover:bg-primary hover:scale-110 hover:shadow-lg"
              >
                <ChevronRight size={28} className="text-primary" />
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
                      ? "bg-primary w-10 h-3"
                      : "bg-primary/30 hover:bg-primary/50 w-3 h-3"
                  }`}
                />
              ))}
            </div>

            {/* Auto-play */}
            <div className="text-center mt-4">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="text-sm text-text-secondary hover:text-primary transition-colors"
              >
                {isAutoPlaying ? "⏸ Pause auto-rotate" : "▶ Resume auto-rotate"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Animations (UNCHANGED) */}
      <style>{`
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