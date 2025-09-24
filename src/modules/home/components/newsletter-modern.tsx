"use client";

import { useState } from "react";

export default function NewsletterModern() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    setEmail("");

    // Reset success state after 3 seconds
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <section className="pb-10 lg:pb-12.5 xl:pb-15">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="relative rounded-[10px] bg-gradient-to-r from-[#1D2144] via-[#3C50E0] to-[#2D1B69] overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0">
            {/* Decorative circles */}
            <div className="absolute top-8 left-8 w-24 h-24 border border-white/10 rounded-full"></div>
            <div className="absolute top-16 right-12 w-16 h-16 border border-white/10 rounded-full"></div>
            <div className="absolute bottom-12 left-16 w-20 h-20 border border-white/10 rounded-full"></div>
            <div className="absolute bottom-8 right-8 w-32 h-32 border border-white/10 rounded-full"></div>
            
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-5" 
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%23ffffff' fill-opacity='0.1'%3e%3ccircle cx='7' cy='7' r='1'/%3e%3ccircle cx='27' cy='7' r='1'/%3e%3ccircle cx='47' cy='7' r='1'/%3e%3ccircle cx='7' cy='27' r='1'/%3e%3ccircle cx='27' cy='27' r='1'/%3e%3ccircle cx='47' cy='27' r='1'/%3e%3ccircle cx='7' cy='47' r='1'/%3e%3ccircle cx='27' cy='47' r='1'/%3e%3ccircle cx='47' cy='47' r='1'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e")`,
              }}
            ></div>
          </div>

          <div className="relative z-10 py-12 sm:py-16 px-6 sm:px-10">
            <div className="max-w-2xl mx-auto text-center text-white">
              {/* Icon */}
              <div className="w-16 h-16 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                Subscribe to Our Newsletter
              </h2>
              
              <p className="text-lg text-white/90 mb-2">
                Get the latest updates and exclusive offers
              </p>
              
              <p className="text-white/70 mb-8">
                Join over 10,000 subscribers and never miss out on our latest products, sales, and news.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent disabled:opacity-50"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting || !email}
                    className="px-8 py-3 bg-white text-[#1D2144] font-semibold rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-[#1D2144]/20 border-t-[#1D2144] rounded-full animate-spin"></div>
                        Subscribing...
                      </div>
                    ) : (
                      "Subscribe"
                    )}
                  </button>
                </div>

                {/* Success Message */}
                {isSuccess && (
                  <div className="mt-4 p-3 bg-green-500/20 border border-green-400/30 rounded-full text-sm text-green-100">
                    🎉 Thank you for subscribing! Check your email for confirmation.
                  </div>
                )}
              </form>

              {/* Privacy Note */}
              <p className="text-xs text-white/60 mt-4">
                We respect your privacy. Unsubscribe at any time. 
                <br />
                No spam, just great deals and updates.
              </p>

              {/* Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 pt-8 border-t border-white/20">
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-sm mb-1">Exclusive Deals</h4>
                  <p className="text-xs text-white/70">Members-only discounts</p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-sm mb-1">Early Access</h4>
                  <p className="text-xs text-white/70">Be first to shop sales</p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-sm mb-1">New Arrivals</h4>
                  <p className="text-xs text-white/70">Latest product updates</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
