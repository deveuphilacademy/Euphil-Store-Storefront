"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  // Set countdown to 7 days from now
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set target date to 7 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);
    targetDate.setHours(23, 59, 59, 999); // End of day

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="pb-10 lg:pb-12.5 xl:pb-15 bg-[#F8FAFC]">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="relative rounded-[10px] bg-gradient-to-r from-[#1D2144] via-[#3C50E0] to-[#1D2144] overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-10 left-10 w-20 h-20 border border-white/20 rounded-full"></div>
              <div className="absolute top-20 right-16 w-16 h-16 border border-white/20 rounded-full"></div>
              <div className="absolute bottom-16 left-20 w-24 h-24 border border-white/20 rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-32 h-32 border border-white/20 rounded-full"></div>
            </div>
          </div>

          <div className="relative z-10 py-12 sm:py-16 px-6 sm:px-10 text-center text-white">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 text-sm font-medium px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
              Flash Sale
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Deal of the Week
            </h2>
            
            <p className="text-lg sm:text-xl text-white/90 mb-2">
              Save up to <span className="font-bold text-yellow-300">70% OFF</span>
            </p>
            
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Don't miss out on our biggest sale of the year. Limited time offer on premium products.
            </p>

            {/* Countdown Timer */}
            <div className="flex justify-center gap-4 sm:gap-6 mb-8">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds },
              ].map((item, index) => (
                <div key={item.label} className="text-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-[10px] p-3 sm:p-4 mb-2 min-w-[60px] sm:min-w-[80px]">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                      {item.value.toString().padStart(2, '0')}
                    </div>
                  </div>
                  <div className="text-sm sm:text-base text-white/80 capitalize">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/store"
                className="inline-flex items-center gap-2 bg-white text-[#1D2144] font-semibold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors"
              >
                Shop Now
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </Link>
              
              <Link
                href="/collections"
                className="inline-flex items-center gap-2 border-2 border-white text-white font-medium px-8 py-4 rounded-full hover:bg-white hover:text-[#1D2144] transition-colors"
              >
                Browse Categories
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </Link>
            </div>

            {/* Small Print */}
            <p className="text-xs text-white/60 mt-6">
              *Offer valid while supplies last. Terms and conditions apply.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
