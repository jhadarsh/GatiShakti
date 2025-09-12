import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useNavigate } from "react-router-dom";

let currentAudio = null;

const languages = {
  en: { code: 'en', name: 'English', nativeName: 'English' },
  as: { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া' },
  brx: { code: 'brx', name: 'Bodo', nativeName: 'बड़ो' },
  gu: { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  hi: { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  kn: { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  ml: { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  mni: { code: 'mni', name: 'Manipuri', nativeName: 'মণিপুরী' },
  mr: { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  or: { code: 'or', name: 'Oriya', nativeName: 'ଓଡ଼ିଆ' },
  pa: { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  ta: { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  te: { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' }
};

const UI_TEXT = {
  helpLabel: "Tap for help!",
  Ivr: "Welcome to our support system. You can say the name of the section you'd like to visit please speak clearly after the beep. To go to the main page, say ",
  op1: "To ask a question or get support, say ",
  op2: "To connect with a mediator, say",
  op3: "To explore learning resources, say",
  op4: "To engage with the community, say",
  op5: "Voice Guide",
  op6: "Video Guide",
  op7: "Why use us ?",
  op8: "Live Traffic Dashboard: View real-time congestion levels at every signal, get instant reroute suggestions, and drive smarter across the city. Smart Parking & Complaints: Join virtual parking queues, reserve a spot ahead of arrival, and raise traffic or signal issues directly from the app.",
  selectLanguage: "Select Language",
  languageLabel: "Preferred Language:",
};

const playBeep = () => {
  return new Promise((resolve) => {
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(1000, context.currentTime);
    oscillator.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.2);
    oscillator.onended = () => {
      context.close();
      resolve();
    };
  });
};

export default function Guide() {
  const [chatOpen, setChatOpen] = useState(false);
  const [ivrOpen, setIVROpen] = useState(false);
  const [featureOpen, setFeatureOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageSelectOpen, setLanguageSelectOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Default to English
  const [uiText, setUiText] = useState(UI_TEXT);
  const [isLogging, setIsLogging] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const navigate = useNavigate();

  if (!browserSupportsSpeechRecognition) {
    return <div>Your browser does not support speech recognition.</div>;
  }

  // Handle language change
  const handleLanguageChange = (langCode) => {
    setSelectedLanguage(langCode);
    setLanguageSelectOpen(false);
    
    // Translate UI text when language changes
    translateUIText(langCode);
  };

  // Translate UI_TEXT when language changes
  const translateUIText = async (targetLang) => {
    if (targetLang === 'en') {
      setUiText(UI_TEXT);
      return;
    }

    try {
      const res = await fetch("https://samadhan-zq8e.onrender.com/translate/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jsonObject: UI_TEXT, targetLang }),
      });

      const data = await res.json();
      const map = {};
      (data?.pipelineResponse?.[0]?.output || []).forEach(
        ({ source, target }) => (map[source] = target)
      );

      const translated = Object.fromEntries(
        Object.entries(UI_TEXT).map(([key, val]) => [key, map[val] || val])
      );

      setUiText(translated);
    } catch (err) {
      console.error("Translation error:", err);
    }
  };

  // Play IVR message, then beep, then listen for commands
  const handleIVRSpeakOnly = async () => {
    const message = {
      ivr: "Welcome to our support system.You can say the name of the section you'd like to visit please speak clearly after the beep. To go to the main page, say 'one one'. To go to Dashboard, say 'two two'. for Fleet Boking for your Stocks, say 'three three'. To find Warehouses near you for your stock, say 'four four'. and if you want your future stock Data for each your warehouses to skip last minute hallucination, say 'five five' ",
    };

    try {
      const res = await fetch(
        "https://samadhan-zq8e.onrender.com/translate/translate-and-speak",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonObject: message,
            targetLang: selectedLanguage,
            sourceLang: "en",
          }),
        }
      );

      const data = await res.json();

      if (data?.audioContent && typeof data.audioContent === "string") {
        const audioSrc = `data:audio/wav;base64,${data.audioContent}`;
        const audio = new Audio(audioSrc);

        audio.onended = async () => {
          await playBeep();

          resetTranscript();
          SpeechRecognition.startListening({
            continuous: true,
            interimResults: true,
            language: selectedLanguage === "en" ? "en-IN" : selectedLanguage,
          });

          setIsLogging(true);

          setTimeout(() => {
            SpeechRecognition.stopListening();
            setIsLogging(false);
          }, 7000);
        };

        audio
          .play()
          .catch((err) => console.error("Audio play failed:", err.message));
      } else {
        console.warn("No audio content returned from TTS.");
        console.warn("Full response:", data?.pipelineResponse || data);
      }
    } catch (err) {
      console.error("TTS fetch error:", err.message);
    }
  };

  // React to voice commands and navigate accordingly
  useEffect(() => {
    if (!transcript) return;

    console.log("Transcript:", transcript);

    const command = transcript.toLowerCase();
    const routeMap = {
      11: "/",
      22: "/home/dashboard",
      33: "/home/fleetbook",
      44: "/home/slots",
      55: "/home/reports",
    };

    for (const [key, path] of Object.entries(routeMap)) {
      if (command.includes(key)) {
        SpeechRecognition.stopListening();
        navigate(path);
        setIVROpen(false);
        resetTranscript();
        break;
      }
    }
  }, [transcript, navigate, resetTranscript]);

  return (
    <div>
      {/* Floating Help Button */}
 <div className="fixed bottom-6 right-6 flex items-center space-x-2 z-50">
  {/* Vibrating label */}
  <div className="bg-white text-black px-3 py-1 rounded-md shadow-sm text-sm font-medium  ">
    {uiText.helpLabel}
  </div>

  {/* IVR Image */}
  <div
    onClick={() => setMenuOpen(!menuOpen)}
    className="cursor-pointer transition"
    aria-label="Open Help Menu"
  >
    <img
      src="/IVR.png"
      alt="Help Icon"
      className="w-[130px] h-[150px] object-contain rounded-md  "
    />
  </div>

  {/* Animations */}
  <style jsx>{`
    @keyframes vibrate {
      0% { transform: translate(0); }
      10% { transform: translate(-2px, 2px); }
      20% { transform: translate(-2px, -2px); }
      30% { transform: translate(2px, 2px); }
      40% { transform: translate(2px, -2px); }
      50% { transform: translate(-2px, 2px); }
      60% { transform: translate(-2px, -2px); }
      70% { transform: translate(2px, 2px); }
      80% { transform: translate(2px, -2px); }
      90% { transform: translate(-2px, 2px); }
      100% { transform: translate(0); }
    }
    .animate-vibrate {
      animation: vibrate 0.4s linear infinite;
      animation-delay: 5s; /* 5s gap */
    }
  `}</style>
</div>



      {/* Popup Menu */}
      {menuOpen && (
        <div className="fixed bottom-36 right-6 bg-white shadow-lg rounded-xl w-52 p-4 z-50 space-y-3">
          {/* Language Selection */}
          <div className="mb-3">
            <label className="block text-xs font-medium text-gray-700 mb-2">
              {uiText.languageLabel}
            </label>
            <div className="relative">
              <button
                onClick={() => setLanguageSelectOpen(!languageSelectOpen)}
                className="w-full bg-gray-50 border border-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm flex items-center justify-between hover:bg-gray-100 transition-colors"
                aria-label="Select Language"
              >
                <span>{languages[selectedLanguage]?.nativeName || languages[selectedLanguage]?.name}</span>
                <svg className={`w-4 h-4 transition-transform ${languageSelectOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {languageSelectOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-40 overflow-y-auto z-60">
                  {Object.entries(languages).map(([code, lang]) => (
                    <button
                      key={code}
                      onClick={() => handleLanguageChange(code)}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-blue-50 transition-colors ${
                        selectedLanguage === code ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
                      }`}
                    >
                      <div>
                        <div className="font-medium">{lang.nativeName}</div>
                        <div className="text-xs text-gray-500">{lang.name}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              setIVROpen(true);
              handleIVRSpeakOnly();
            }}
            className="w-full bg-[#87311e] text-white px-4 py-2 rounded-lg text-sm"
            aria-label="Start Voice Guide (IVR)"
          >
            {uiText.op5}
          </button>
          
          <button
            onClick={() => {
              setChatOpen(true);
              setMenuOpen(false);
            }}
            className="w-full bg-[#87311e] text-white px-4 py-2 rounded-lg text-sm"
            aria-label="Open Video Guide"
          >
            {uiText.op6}
          </button>

          <button
            onClick={async () => {
              setFeatureOpen(true);
              setMenuOpen(false);

              if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
                currentAudio = null;
                return;
              }

              const message = {
                feature: uiText.op8,
              };

              try {
                const res = await fetch(
                  "https://samadhan-zq8e.onrender.com/translate/translate-and-speak",
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      jsonObject: message,
                      targetLang: selectedLanguage,
                      sourceLang: "en",
                    }),
                  }
                );

                const data = await res.json();

                if (data?.audioContent && typeof data.audioContent === "string") {
                  const audioSrc = `data:audio/wav;base64,${data.audioContent}`;
                  const audio = new Audio(audioSrc);
                  currentAudio = audio;

                  audio.onended = () => {
                    currentAudio = null;
                  };

                  audio.play().catch((err) => {
                    console.error("Audio play failed:", err.message);
                  });
                } else {
                  console.warn("No audio content returned from TTS.");
                }
              } catch (err) {
                console.error("TTS fetch error:", err.message);
              }
            }}
            className="w-full bg-[#87311e] text-white px-4 py-2 rounded-lg text-sm"
            aria-label="Show Features"
          >
            {uiText.op7}
          </button>
        </div>
      )}

      {/* Video Modal */}
      {chatOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative w-11/12 md:w-1/2 h-1/2 bg-white rounded-lg overflow-hidden shadow-xl">
            <button
              onClick={() => setChatOpen(false)}
              className="absolute top-2 right-2 text-black bg-white p-1 px-2 rounded-full shadow hover:bg-gray-200"
              aria-label="Close Video Guide"
            >
              ✖
            </button>
            <video
              src="/assets/video.mp4"
              controls
              autoPlay
              className="w-full h-full pointer-events-none"
            />
          </div>
        </div>
      )}

      {/* Click outside to close language dropdown */}
      {languageSelectOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setLanguageSelectOpen(false)}
        />
      )}
    </div>
  );
}
