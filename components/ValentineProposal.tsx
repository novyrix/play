"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import confetti from "canvas-confetti";
import RomanticPreloader from "./RomanticPreloader";

const compliments = [
  "You make every day feel like Valentine's Day ❤️",
  "Your smile lights up my entire world 🌹",
  "You're the reason I believe in magic ✨",
  "Your laugh is my favorite sound 🎵",
  "You make my heart skip a beat 💓",
  "You're the best thing that ever happened to me 💝",
];

type Phase = "landing" | "question" | "rejection" | "identity-preloader" | "identity" | "wrong-identity" | "date-builder" | "success" | "music";

export default function ValentineProposal() {
  const [phase, setPhase] = useState<Phase>("landing");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noAttempts, setNoAttempts] = useState(0);
  const [isMobileShaking, setIsMobileShaking] = useState(false);
  const [isViewportShaking, setIsViewportShaking] = useState(false);
  const [currentCompliment, setCurrentCompliment] = useState(compliments[0]);
  const [identityAnswers, setIdentityAnswers] = useState({ music: "", food: "", passion: "" });
  const [isScanning, setIsScanning] = useState(false);
  const [dateDetails, setDateDetails] = useState({ dinner: "", beverage: "" });
  const [showSuccess, setShowSuccess] = useState(false);
  
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonContainerRef = useRef<HTMLDivElement>(null);

  const getRandomCompliment = () => {
    const randomIndex = Math.floor(Math.random() * compliments.length);
    setCurrentCompliment(compliments[randomIndex]);
  };

  const moveNoButton = () => {
    if (!buttonContainerRef.current || !noButtonRef.current) return;
    const container = buttonContainerRef.current.getBoundingClientRect();
    const button = noButtonRef.current.getBoundingClientRect();
    const buttonWidth = button.width || 100;
    const buttonHeight = button.height || 40;
    const padding = 10;
    const maxX = Math.max(0, container.width - buttonWidth - padding * 2);
    const maxY = Math.max(0, container.height - buttonHeight - padding * 2);
    const newX = padding + Math.random() * maxX;
    const newY = padding + Math.random() * maxY;
    setNoButtonPosition({ x: newX, y: newY });
  };

  const handleNoButtonClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const newAttempts = noAttempts + 1;
    setNoAttempts(newAttempts);
    setIsMobileShaking(true);
    setIsViewportShaking(true);
    moveNoButton();
    if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
    setTimeout(() => {
      setIsMobileShaking(false);
      setIsViewportShaking(false);
    }, 600);
    if (newAttempts >= 3) setTimeout(() => setPhase("rejection"), 800);
  };

  const handleYesClick = () => {
    if (phase === "question") {
      setPhase("identity-preloader");
      setTimeout(() => setPhase("identity"), 3000);
    }
  };

  const handleIdentitySubmit = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      const isCorrect = identityAnswers.music === "afro" && identityAnswers.food === "chocolate" && identityAnswers.passion === "fashion";
      setPhase(isCorrect ? "date-builder" : "wrong-identity");
    }, 3000);
  };

  const handleSubmitDate = () => {
    setShowSuccess(true);
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;
    const interval: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        clearInterval(interval);
        setTimeout(() => {
          setShowSuccess(false);
          setPhase("music");
        }, 2000);
        return;
      }
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  useEffect(() => {
    if (phase === "question") setTimeout(() => moveNoButton(), 100);
  }, [phase]);

  return (
    <>
      <RomanticPreloader />
      <div ref={containerRef} className={`min-h-screen flex items-center justify-center p-3 sm:p-4 ${isViewportShaking ? "animate-shake-viewport" : ""}`}>
        <div className="fixed top-4 right-4 z-50 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg border-2 border-pink-200">
          <p className="text-xs sm:text-sm font-pacifico text-red-600">💝 By Spira</p>
        </div>

        {/* PHASE 1: Landing */}
        {phase === "landing" && (
          <Card className="w-full max-w-2xl shadow-2xl border-4 border-red-200 animate-fadeIn">
            <CardHeader className="text-center bg-gradient-to-r from-pink-100 to-red-100 p-6 sm:p-8">
              <CardTitle className="text-3xl sm:text-4xl md:text-5xl font-vibes text-red-600">🌹 Something Special Awaits... 🌹</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6 sm:p-8">
              <div className="flex justify-center">
                <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdm90ZGY3NzJtNjN3YXBzcDJjaDl6Y3RwOHJ3ZThtejA2cjA3YTFsZiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/JIX9t2j0ZTN9S/giphy.gif" alt="Nervous cat" className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 object-cover rounded-lg shadow-lg" />
              </div>
              <div className="flex items-center justify-center space-x-3 bg-pink-50 p-4 sm:p-6 rounded-lg border-2 border-pink-200">
                <Checkbox id="terms" checked={termsAccepted} onCheckedChange={(checked) => setTermsAccepted(checked as boolean)} className="flex-shrink-0" />
                <label htmlFor="terms" className="text-base sm:text-lg md:text-xl font-semibold cursor-pointer font-poppins text-gray-800">
                  I'm ready for surprises, snacks, and endless smiles! 💕
                </label>
              </div>
              <Button onClick={() => setPhase("question")} disabled={!termsAccepted} className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white text-lg sm:text-xl font-pacifico py-6 sm:py-7" size="lg">
                Continue →
              </Button>
            </CardContent>
          </Card>
        )}

        {/* PHASE 2: Question */}
        {phase === "question" && (
          <Card className="w-full max-w-2xl shadow-2xl border-4 border-red-200 animate-fadeIn">
            <CardHeader className="text-center bg-gradient-to-r from-pink-100 to-red-100 p-6 sm:p-8">
              <CardTitle className="text-3xl sm:text-4xl md:text-5xl font-vibes text-red-600">Will You Be My Valentine? 💕</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 sm:space-y-8 p-6 sm:p-8">
              <div className="flex justify-center">
                <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2g3ZWVxZnNwNnk4Y3d1N3VubDJqMDhhbDRmb2ZneGl4aHNhZ2RkYiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/MDJ9IbxxvDUQM/giphy.gif" alt="Puss in Boots" className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 object-cover rounded-lg shadow-lg" />
              </div>
              <div className="bg-pink-50 p-4 sm:p-6 rounded-lg border-2 border-pink-200 text-center">
                <p className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-4 font-poppins">{currentCompliment}</p>
                <Button onClick={getRandomCompliment} variant="outline" className="border-red-300 hover:bg-red-50 font-pacifico">Tell me more 💝</Button>
              </div>
              <div ref={buttonContainerRef} className="relative min-h-[200px] sm:min-h-[240px] flex items-center justify-center">
                <Button onClick={handleYesClick} className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white text-xl sm:text-2xl md:text-3xl font-bold font-pacifico py-6 sm:py-8 px-10 sm:px-12 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 animate-pulse z-10" size="lg">
                  YES! 💖
                </Button>
                <Button ref={noButtonRef} onMouseEnter={moveNoButton} onTouchStart={handleNoButtonClick} onClick={handleNoButtonClick} variant="outline" className={`absolute border-gray-300 text-gray-600 py-4 sm:py-6 px-6 sm:px-8 transition-all duration-200 font-poppins ${isMobileShaking ? "animate-shake" : ""}`} style={{ left: `${noButtonPosition.x}px`, top: `${noButtonPosition.y}px` }}>
                  No 😢
                </Button>
              </div>
              {noAttempts > 0 && <div className="text-center text-sm sm:text-base text-red-500 italic font-poppins animate-bounce">Really?? 😢 ({3 - noAttempts} more tries...)</div>}
            </CardContent>
          </Card>
        )}

        {/* PHASE 2.5: Rejection */}
        {phase === "rejection" && (
          <Card className="w-full max-w-2xl shadow-2xl border-4 border-red-200 animate-fadeIn">
            <CardHeader className="text-center bg-gradient-to-r from-red-100 to-pink-100 p-6 sm:p-8">
              <CardTitle className="text-3xl sm:text-4xl md:text-5xl font-vibes text-red-600">Wait... Are You Sure? 🥺</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6 sm:p-8 text-center">
              <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTl6dGZkOXAydDc5eGJoZTBxbGw4cWEyZGNhcmFsNThhNzJpeThuNyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/d2lcHJTG5Tscg/giphy.gif" alt="Sad" className="w-full max-w-md mx-auto rounded-lg shadow-lg" />
              <div className="space-y-4">
                <p className="text-xl sm:text-2xl font-vibes text-gray-800">But... but... I had this all planned! 🥺</p>
                <p className="text-lg sm:text-xl font-poppins text-gray-700">You're breaking my heart here! 💔</p>
                <p className="text-base sm:text-lg font-poppins text-gray-600">Give me one more chance?</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button onClick={() => { setNoAttempts(0); setPhase("question"); }} className="flex-1 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-pacifico py-6" size="lg">Fine, I'll reconsider 😊</Button>
                <Button onClick={() => setPhase("landing")} variant="outline" className="flex-1 border-gray-300 font-poppins py-6" size="lg">I'm sure about NO 😐</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* PHASE 3: Identity Preloader */}
        {phase === "identity-preloader" && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-pink-300 via-red-200 to-pink-400 animate-gradient">
            <div className="text-center space-y-6">
              <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWNsZDVjOXN6YzBweWh5Z3JiZTZ3OGg2aGI3bWc4NzZqdGNhemx3YyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/artj92V8o75VPL7AeQ/giphy.gif" alt="Celebration" className="w-48 h-48 md:w-64 md:h-64 mx-auto animate-bounce" />
              <div className="space-y-4">
                <h2 className="text-5xl md:text-7xl font-vibes text-red-600 animate-pulse">YESSS! 🎉</h2>
                <p className="text-2xl md:text-3xl font-pacifico text-red-700">But wait... are you HER? 🤔</p>
              </div>
            </div>
          </div>
        )}

        {/* PHASE 4: Identity Verification - Continued in next message due to length... */}
        {phase === "identity" && (
          <div className="w-full max-w-3xl mx-auto">
            <Card className="shadow-2xl border-4 border-blue-200 animate-fadeIn">
              <CardHeader className="text-center bg-gradient-to-r from-blue-100 to-purple-100 p-6 sm:p-8">
                <CardTitle className="text-3xl sm:text-4xl font-vibes text-blue-600">Let's Verify It's Really You! 🔐</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6 sm:p-8">
                {/* Question 1 */}
                <div className="space-y-3">
                  <label className="text-lg sm:text-xl font-semibold text-gray-800 font-poppins">🎵 What gets you moving on the dance floor?</label>
                  <div className="space-y-2">
                    {[
                      { value: "afro", label: "Afro Beats & African Rhythms", emoji: "💃" },
                      { value: "pop", label: "Pop & Top 40", emoji: "🎤" },
                      { value: "classical", label: "Classical Music", emoji: "🎻" },
                      { value: "country", label: "Country & Western", emoji: "🤠" },
                    ].map((opt) => (
                      <button key={opt.value} onClick={() => setIdentityAnswers({ ...identityAnswers, music: opt.value })} className={`w-full p-4 rounded-lg border-2 text-left transition-all font-poppins ${identityAnswers.music === opt.value ? "border-blue-500 bg-blue-50 scale-[1.02]" : "border-gray-200 hover:border-blue-300"}`}>
                        <span className="text-base sm:text-lg">{opt.emoji} {opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question 2 */}
                <div className="space-y-3">
                  <label className="text-lg sm:text-xl font-semibold text-gray-800 font-poppins">🍫 What's your go-to comfort?</label>
                  <div className="space-y-2">
                    {[
                      { value: "chocolate", label: "Chocolate (all kinds!)", emoji: "🍫" },
                      { value: "icecream", label: "Ice Cream", emoji: "🍦" },
                      { value: "pizza", label: "Pizza", emoji: "🍕" },
                      { value: "coffee", label: "Coffee", emoji: "☕" },
                    ].map((opt) => (
                      <button key={opt.value} onClick={() => setIdentityAnswers({ ...identityAnswers, food: opt.value })} className={`w-full p-4 rounded-lg border-2 text-left transition-all font-poppins ${identityAnswers.food === opt.value ? "border-blue-500 bg-blue-50 scale-[1.02]" : "border-gray-200 hover:border-blue-300"}`}>
                        <span className="text-base sm:text-lg">{opt.emoji} {opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question 3 */}
                <div className="space-y-3">
                  <label className="text-lg sm:text-xl font-semibold text-gray-800 font-poppins">✨ What makes your heart sing?</label>
                  <div className="space-y-2">
                    {[
                      { value: "fashion", label: "Fashion & Style", emoji: "👗" },
                      { value: "sports", label: "Sports & Fitness", emoji: "⚽" },
                      { value: "gaming", label: "Gaming", emoji: "🎮" },
                      { value: "cooking", label: "Cooking", emoji: "👨‍🍳" },
                    ].map((opt) => (
                      <button key={opt.value} onClick={() => setIdentityAnswers({ ...identityAnswers, passion: opt.value })} className={`w-full p-4 rounded-lg border-2 text-left transition-all font-poppins ${identityAnswers.passion === opt.value ? "border-blue-500 bg-blue-50 scale-[1.02]" : "border-gray-200 hover:border-blue-300"}`}>
                        <span className="text-base sm:text-lg">{opt.emoji} {opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {!isScanning && identityAnswers.music && identityAnswers.food && identityAnswers.passion && (
                  <Button onClick={handleIdentitySubmit} className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-pacifico py-6 text-lg" size="lg">Scan Fingerprint 👆</Button>
                )}

                {isScanning && (
                  <div className="text-center space-y-4 py-8">
                    <div className="relative w-32 h-32 mx-auto">
                      <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-ping"></div>
                      <div className="absolute inset-0 flex items-center justify-center"><span className="text-6xl animate-pulse">👆</span></div>
                    </div>
                    <p className="text-xl font-pacifico text-blue-600 animate-pulse">Scanning fingerprint...</p>
                    <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-blue-500 h-2 rounded-full animate-progress"></div></div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* PHASE 5: Wrong Identity */}
        {phase === "wrong-identity" && (
          <Card className="w-full max-w-2xl shadow-2xl border-4 border-red-400 animate-fadeIn">
            <CardHeader className="text-center bg-gradient-to-r from-red-100 to-pink-100 p-6 sm:p-8">
              <CardTitle className="text-3xl sm:text-4xl md:text-5xl font-vibes text-red-600">Naaaah, you're not the one! 😅</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6 sm:p-8 text-center">
              <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHdrbWZ5aTR2dnoxeGpxaDRnN3NncnJ3NmQ3NmQ5ZXp2YW5xcjYzcCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o7abKhOpu0NwenH3O/giphy.gif" alt="Denied" className="w-full max-w-md mx-auto rounded-lg shadow-lg" />
              <div className="space-y-4">
                <div className="text-6xl">❌</div>
                <p className="text-xl sm:text-2xl font-vibes text-gray-800">Nice try though! 😄</p>
                <p className="text-lg sm:text-xl font-poppins text-gray-700">Maybe tell her to come try? 💝</p>
              </div>
              <Button onClick={() => { setIdentityAnswers({ music: "", food: "", passion: "" }); setNoAttempts(0); setPhase("landing"); }} className="w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-pacifico py-6" size="lg">Start Over</Button>
            </CardContent>
          </Card>
        )}

        {/* PHASE 6: Date Builder */}
        {phase === "date-builder" && (
          <Card className="w-full max-w-2xl shadow-2xl border-4 border-red-200 animate-fadeIn">
            <CardHeader className="text-center bg-gradient-to-r from-pink-100 to-red-100 p-6 sm:p-8">
              <CardTitle className="text-3xl sm:text-4xl font-vibes text-red-600">Perfect! Let's Plan Our Date 🎉</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6 sm:p-8">
              <div className="flex justify-center">
                <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2VtN2VzZDJmY2g0ZnZvYWVnbDRkeWw5dGMxOWV2MjkyNnR0M2Q1eSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l0MYt5jPR6QX5pnqM/giphy.gif" alt="Dance" className="w-40 h-40 sm:w-48 sm:h-48 object-cover rounded-lg shadow-lg" />
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-lg font-semibold text-gray-700 font-poppins">Select Dinner Protocol:</label>
                  <div className="space-y-2">
                    {[
                      { value: "fancy", label: "🍷 Fancy & Overpriced" },
                      { value: "tacos", label: "🌮 Tacos & Sweatpants" },
                      { value: "homemade", label: "👨‍🍳 I'll Cook (God help us)" },
                    ].map((opt) => (
                      <button key={opt.value} onClick={() => setDateDetails({ ...dateDetails, dinner: opt.value })} className={`w-full p-4 rounded-lg border-2 text-left transition-all font-poppins ${dateDetails.dinner === opt.value ? "border-red-500 bg-red-50 scale-[1.02]" : "border-gray-200 hover:border-red-300"}`}>
                        <span className="text-lg">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-lg font-semibold text-gray-700 font-poppins">Select Beverage Tier:</label>
                  <div className="space-y-2">
                    {[
                      { value: "wine", label: "🍷 Wine" },
                      { value: "water", label: "💧 Sparkling Water" },
                      { value: "juice", label: "🧃 A very specific juice box" },
                    ].map((opt) => (
                      <button key={opt.value} onClick={() => setDateDetails({ ...dateDetails, beverage: opt.value })} className={`w-full p-4 rounded-lg border-2 text-left transition-all font-poppins ${dateDetails.beverage === opt.value ? "border-red-500 bg-red-50 scale-[1.02]" : "border-gray-200 hover:border-red-300"}`}>
                        <span className="text-lg">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <Button onClick={handleSubmitDate} disabled={!dateDetails.dinner || !dateDetails.beverage} className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white text-lg font-pacifico py-6" size="lg">Lock It In! 💝</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* PHASE 7: Music */}
        {phase === "music" && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-red-100 to-pink-300 p-4 overflow-y-auto">
            <div className="max-w-4xl w-full space-y-6">
              <div className="flex justify-center">
                <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnN5NjR5eGVsMnk1aXptNHVhMWJ0YWFhOTBya2l4OTl6dGduZWZrZiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l0HlQXlQ3nHyLMvte/giphy.gif" alt="Dancing" className="w-full max-w-lg rounded-lg shadow-2xl" />
              </div>
              <div className="text-center space-y-4">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-vibes text-red-600">🎵 Our Song 🎵</h2>
                <p className="text-lg sm:text-xl font-poppins text-gray-700 italic">"And we keep this love in a photograph<br/>We made these memories for ourselves..."</p>
              </div>
              <div className="bg-white rounded-lg shadow-xl p-4">
                <iframe src="https://open.spotify.com/embed/track/1HNkqx9Ahdgi1Ixy2xkKkL?utm_source=generator" width="100%" height="152" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" className="rounded-lg"></iframe>
              </div>
              <div className="text-center space-y-2">
                <p className="text-2xl sm:text-3xl font-vibes text-red-600">Can't wait for Valentine's Day 2026! 💕</p>
                <p className="text-xl sm:text-2xl font-pacifico text-red-500">- Spira</p>
              </div>
            </div>
          </div>
        )}

        {/* Success Modal */}
        <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
          <DialogContent className="sm:max-w-md border-4 border-red-300">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold text-center text-red-600 font-vibes">🎉 Mission Accomplished! 🎉</DialogTitle>
            </DialogHeader>
            <div className="text-center space-y-4 pt-4">
              <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXcwZGFhNzU5Y2xraDZlbjdneXVzcTlqNzR5dDBkbm5vd3RhbXJ2NiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/g9582DNuQppxC/giphy.gif" alt="Success" className="w-full h-48 object-cover rounded-lg" />
              <div className="text-xl font-semibold text-gray-800 font-pacifico">Best. Decision. Ever! 💕</div>
              <div className="text-lg text-gray-700 font-poppins">Valentine's Day 2026 is going to be LEGENDARY! 🌟</div>
              <div className="bg-pink-50 p-4 rounded-lg border-2 border-pink-200 text-left">
                <div className="font-semibold text-gray-800 font-poppins">Your Date Plan:</div>
                <div className="text-gray-700 font-poppins">Dinner: {dateDetails.dinner === "fancy" ? "Fancy & Overpriced 🍷" : dateDetails.dinner === "tacos" ? "Tacos & Sweatpants 🌮" : "Homemade 👨‍🍳"}</div>
                <div className="text-gray-700 font-poppins">Beverage: {dateDetails.beverage === "wine" ? "Wine 🍷" : dateDetails.beverage === "water" ? "Sparkling Water 💧" : "Juice Box 🧃"}</div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
