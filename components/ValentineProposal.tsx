"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import confetti from "canvas-confetti";

const compliments = [
  "You make every day feel like Valentine's Day ❤️",
  "Your smile is more beautiful than a thousand roses 🌹",
  "You're the reason I believe in magic ✨",
  "Your laugh is my favorite sound in the world 🎵",
  "You make my heart skip a beat every single time 💓",
  "You're more precious than all the chocolate in the world 🍫",
  "Your kindness makes the world a better place 🌟",
  "You're my favorite notification 📱",
  "You're the best thing that ever happened to me 💝",
  "Your hugs feel like coming home 🏠",
  "You light up my life like nobody else ⭐",
  "You're my happy place 😊",
  "Your eyes are more captivating than any sunset 🌅",
  "You make ordinary moments extraordinary 🎉",
  "You're the definition of perfection to me 👑",
];

type Phase = "landing" | "question" | "date-builder" | "success";

export default function ValentineProposal() {
  const [phase, setPhase] = useState<Phase>("landing");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [currentCompliment, setCurrentCompliment] = useState(compliments[0]);
  const [dateDetails, setDateDetails] = useState({
    dinner: "",
    beverage: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getRandomCompliment = () => {
    const randomIndex = Math.floor(Math.random() * compliments.length);
    setCurrentCompliment(compliments[randomIndex]);
  };

  const moveNoButton = () => {
    if (!containerRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const buttonWidth = 150;
    const buttonHeight = 50;

    const maxX = container.width - buttonWidth;
    const maxY = container.height - buttonHeight;

    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    setNoButtonPosition({ x: newX, y: newY });
  };

  const handleYesClick = () => {
    if (phase === "question") {
      setPhase("date-builder");
    }
  };

  const handleSubmitDate = () => {
    setShowSuccess(true);
    // Trigger confetti
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  useEffect(() => {
    if (phase === "question") {
      // Set initial random position for No button
      moveNoButton();
    }
  }, [phase]);

  return (
    <div ref={containerRef} className="w-full max-w-2xl mx-auto p-4 relative min-h-[600px]">
      {/* Landing Phase */}
      {phase === "landing" && (
        <Card className="w-full shadow-2xl border-4 border-red-200">
          <CardHeader className="text-center bg-gradient-to-r from-pink-100 to-red-100">
            <CardTitle className="text-3xl font-bold text-red-600">
              Official Proposal for Collaborative Romantic Engagement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            <div className="flex justify-center">
              <img
                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdm90ZGY3NzJtNjN3YXBzcDJjaDl6Y3RwOHJ3ZThtejA2cjA3YTFsZiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/JIX9t2j0ZTN9S/giphy.gif"
                alt="Nervous cat"
                className="w-64 h-64 object-cover rounded-lg shadow-lg"
              />
            </div>

            <div className="space-y-4">
              <p className="text-lg text-center text-gray-700">
                Before we proceed, please review and accept the following terms:
              </p>

              <div className="flex items-start space-x-3 bg-pink-50 p-4 rounded-lg border-2 border-pink-200">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                  className="mt-1"
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-relaxed cursor-pointer"
                >
                  I agree to be showered with affection and snacks, including but not limited
                  to: surprise hugs, random compliments, spontaneous adventures, and an
                  unlimited supply of your favorite treats. 🍫❤️
                </label>
              </div>

              <Button
                onClick={() => setPhase("question")}
                disabled={!termsAccepted}
                className="w-full bg-red-500 hover:bg-red-600 text-white text-lg py-6"
                size="lg"
              >
                Proceed to Question →
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Question Phase */}
      {phase === "question" && (
        <Card className="w-full shadow-2xl border-4 border-red-200">
          <CardHeader className="text-center bg-gradient-to-r from-pink-100 to-red-100">
            <CardTitle className="text-4xl font-bold text-red-600">
              Will You Be My Valentine? 💕
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 p-8">
            <div className="flex justify-center">
              <img
                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2g3ZWVxZnNwNnk4Y3d1N3VubDJqMDhhbDRmb2ZneGl4aHNhZ2RkYiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/MDJ9IbxxvDUQM/giphy.gif"
                alt="Puss in Boots eyes"
                className="w-64 h-64 object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Compliment Section */}
            <div className="bg-pink-50 p-6 rounded-lg border-2 border-pink-200 text-center">
              <p className="text-xl font-semibold text-gray-800 mb-4">{currentCompliment}</p>
              <Button
                onClick={getRandomCompliment}
                variant="outline"
                className="border-red-300 hover:bg-red-50"
              >
                Tell me more 💝
              </Button>
            </div>

            <div className="flex justify-center gap-6 relative h-32">
              {/* Yes Button */}
              <Button
                onClick={handleYesClick}
                className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white text-2xl font-bold py-8 px-12 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 animate-pulse"
                size="lg"
              >
                YES! 💖
              </Button>

              {/* No Button - Moves on hover */}
              <Button
                ref={noButtonRef}
                onMouseEnter={moveNoButton}
                onTouchStart={moveNoButton}
                variant="outline"
                className="absolute border-gray-300 text-gray-600 py-6 px-8 transition-all duration-300"
                style={{
                  left: `${noButtonPosition.x}px`,
                  top: `${noButtonPosition.y}px`,
                }}
              >
                No 😢
              </Button>
            </div>

            <div className="text-center text-sm text-gray-500 italic">
              *Try clicking No if you dare* 😏
            </div>
          </CardContent>
        </Card>
      )}

      {/* Date Builder Phase */}
      {phase === "date-builder" && (
        <Card className="w-full shadow-2xl border-4 border-red-200">
          <CardHeader className="text-center bg-gradient-to-r from-pink-100 to-red-100">
            <CardTitle className="text-3xl font-bold text-red-600">
              Perfect! Let's Plan Our Date 🎉
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            <div className="flex justify-center">
              <img
                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2VtN2VzZDJmY2g0ZnZvYWVnbDRkeWw5dGMxOWV2MjkyNnR0M2Q1eSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l0MYt5jPR6QX5pnqM/giphy.gif"
                alt="Happy dance"
                className="w-48 h-48 object-cover rounded-lg shadow-lg"
              />
            </div>

            <div className="space-y-6">
              {/* Dinner Protocol */}
              <div className="space-y-3">
                <label className="text-lg font-semibold text-gray-700">
                  Select Dinner Protocol:
                </label>
                <div className="space-y-2">
                  {[
                    { value: "fancy", label: "🍷 Fancy & Overpriced", emoji: "✨" },
                    { value: "tacos", label: "🌮 Tacos & Sweatpants", emoji: "😌" },
                    { value: "homemade", label: "👨‍🍳 I'll Cook (God help us)", emoji: "🙏" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setDateDetails({ ...dateDetails, dinner: option.value })}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        dateDetails.dinner === option.value
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200 hover:border-red-300"
                      }`}
                    >
                      <span className="text-lg">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Beverage Tier */}
              <div className="space-y-3">
                <label className="text-lg font-semibold text-gray-700">
                  Select Beverage Tier:
                </label>
                <div className="space-y-2">
                  {[
                    { value: "wine", label: "🍷 Wine" },
                    { value: "water", label: "💧 Sparkling Water" },
                    { value: "juice", label: "🧃 A very specific juice box" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setDateDetails({ ...dateDetails, beverage: option.value })}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        dateDetails.beverage === option.value
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200 hover:border-red-300"
                      }`}
                    >
                      <span className="text-lg">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleSubmitDate}
                disabled={!dateDetails.dinner || !dateDetails.beverage}
                className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white text-lg py-6"
                size="lg"
              >
                Lock It In! 💝
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Success Modal */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md border-4 border-red-300">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-center text-red-600">
              🎉 Mission Accomplished! 🎉
            </DialogTitle>
            <DialogDescription className="text-center space-y-4 pt-4">
              <img
                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXcwZGFhNzU5Y2xraDZlbjdneXVzcTlqNzR5dDBkbm5vd3RhbXJ2NiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/g9582DNuQppxC/giphy.gif"
                alt="Celebration"
                className="w-full h-48 object-cover rounded-lg"
              />
              <p className="text-xl font-semibold text-gray-800">
                Best. Decision. Ever! 💕
              </p>
              <p className="text-lg text-gray-700">
                Valentine's Day 2026 is going to be LEGENDARY! 🌟
              </p>
              <div className="bg-pink-50 p-4 rounded-lg border-2 border-pink-200 text-left">
                <p className="font-semibold text-gray-800">Your Date Plan:</p>
                <p className="text-gray-700">
                  Dinner:{" "}
                  {dateDetails.dinner === "fancy"
                    ? "Fancy & Overpriced 🍷"
                    : dateDetails.dinner === "tacos"
                    ? "Tacos & Sweatpants 🌮"
                    : "Homemade (prayers needed) 👨‍🍳"}
                </p>
                <p className="text-gray-700">
                  Beverage:{" "}
                  {dateDetails.beverage === "wine"
                    ? "Wine 🍷"
                    : dateDetails.beverage === "water"
                    ? "Sparkling Water 💧"
                    : "Juice Box 🧃"}
                </p>
              </div>
              <p className="text-sm text-gray-600 italic">
                I promise to make it the best Valentine's Day ever! ❤️
              </p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
