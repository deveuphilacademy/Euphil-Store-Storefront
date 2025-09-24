"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import Link from "next/link";
import Image from "next/image";
import { convertToLocale } from "@lib/util/money";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface Product {
  id: string;
  title: string;
  description?: string;
  handle: string;
  thumbnail?: string;
  calculated_price?: {
    calculated_amount: number;
    original_amount: number;
    currency_code: string;
  };
}

interface Region {
  currency_code: string;
}

interface HeroSliderProps {
  products: Product[];
  region: Region;
}

// Slide configurations - you can easily modify these
const slideConfigs = [
  {
    title: "Premium Collection",
    subtitle: "Discover Excellence",
    description: "Elevate your lifestyle with our carefully curated premium products",
    buttonText: "Explore Collection",
    buttonLink: "/store",
    theme: "gradient-to-r from-slate-900 via-purple-900 to-slate-900",
    textColor: "text-white",
  },
  {
    title: "New Arrivals",
    subtitle: "Fresh & Trending",
    description: "Be the first to discover our latest products and innovations",
    buttonText: "Shop New Items",
    buttonLink: "/store?sort=created_at",
    theme: "gradient-to-r from-blue-900 via-indigo-900 to-purple-900",
    textColor: "text-white",
  },
  {
    title: "Special Offers",
    subtitle: "Limited Time Deal",
    description: "Don't miss out on exclusive discounts and amazing deals",
    buttonText: "View Offers",
    buttonLink: "/store",
    theme: "gradient-to-r from-emerald-900 via-teal-900 to-cyan-900",
    textColor: "text-white",
  },
  
];

const HeroSlider = ({ products, region }: HeroSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Take first 3 products for the slider, or use placeholder if no products
  const displayProducts = products?.slice(0, 3) || [];

  // Animation classes for text elements
  const getAnimationClasses = (delay: number = 0) => ({
    initial: "opacity-0 translate-y-8",
    animate: isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
    transition: `transition-all duration-1000 ease-out delay-[${delay}ms]`,
  });

  return (
    <section className="relative h-screen max-h-[800px] min-h-[600px] overflow-hidden bg-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%23ffffff' fill-opacity='0.1'%3e%3ccircle cx='7' cy='7' r='1'/%3e%3ccircle cx='27' cy='7' r='1'/%3e%3ccircle cx='47' cy='7' r='1'/%3e%3ccircle cx='7' cy='27' r='1'/%3e%3ccircle cx='27' cy='27' r='1'/%3e%3ccircle cx='47' cy='27' r='1'/%3e%3ccircle cx='7' cy='47' r='1'/%3e%3ccircle cx='27' cy='47' r='1'/%3e%3ccircle cx='47' cy='47' r='1'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e")`,
          }}
        />
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        speed={1000}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: '.hero-next',
          prevEl: '.hero-prev',
        }}
        pagination={{
          clickable: true,
          el: '.hero-pagination',
        }}
        onSlideChange={(swiper) => {
          setIsVisible(false);
          setCurrentSlide(swiper.activeIndex);
          setTimeout(() => setIsVisible(true), 200);
        }}
        className="h-full"
      >
        {slideConfigs.map((config, index) => {
          const product = displayProducts[index];
          
          return (
            <SwiperSlide key={index}>
              <div className={`relative h-full bg-${config.theme} flex items-center`}>
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-${config.theme} opacity-90`} />
                
                {/* Product Image Background */}
                {product?.thumbnail && (
                  <div className="absolute inset-0">
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      fill
                      className="object-cover opacity-20"
                      priority={index === 0}
                      sizes="100vw"
                    />
                  </div>
                )}

                {/* Floating Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse" />
                  <div className="absolute top-40 right-20 w-24 h-24 bg-white/5 rounded-full blur-lg animate-pulse delay-1000" />
                  <div className="absolute bottom-32 left-20 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-pulse delay-2000" />
                </div>

                <div className="relative z-10 container mx-auto px-6 lg:px-8">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content Side */}
                    <div className="space-y-8">
                      {/* Badge */}
                      <div 
                        className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium ${config.textColor} ${getAnimationClasses(0).transition}`}
                        style={{ 
                          opacity: isVisible ? 1 : 0,
                          transform: isVisible ? 'translateY(0)' : 'translateY(2rem)',
                        }}
                      >
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        {config.subtitle}
                      </div>

                      {/* Main Title */}
                      <h1 
                        className={`text-5xl lg:text-7xl font-bold ${config.textColor} leading-tight ${getAnimationClasses(200).transition}`}
                        style={{ 
                          opacity: isVisible ? 1 : 0,
                          transform: isVisible ? 'translateY(0)' : 'translateY(2rem)',
                        }}
                      >
                        {config.title}
                        {product && (
                          <div className="text-3xl lg:text-4xl mt-4 text-white/80 font-normal">
                            {product.title}
                          </div>
                        )}
                      </h1>

                      {/* Description */}
                      <p 
                        className={`text-xl ${config.textColor}/80 max-w-lg leading-relaxed ${getAnimationClasses(400).transition}`}
                        style={{ 
                          opacity: isVisible ? 1 : 0,
                          transform: isVisible ? 'translateY(0)' : 'translateY(2rem)',
                        }}
                      >
                        {product?.description || config.description}
                      </p>

                      {/* Price */}
                      {product?.calculated_price && (
                        <div 
                          className={`flex items-center gap-4 ${getAnimationClasses(600).transition}`}
                          style={{ 
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(2rem)',
                          }}
                        >
                          <span className="text-4xl font-bold text-emerald-400">
                            {convertToLocale({
                              amount: product.calculated_price.calculated_amount,
                              currency_code: region.currency_code,
                            })}
                          </span>
                          {product.calculated_price.original_amount > product.calculated_price.calculated_amount && (
                            <span className="text-xl text-white/50 line-through">
                              {convertToLocale({
                                amount: product.calculated_price.original_amount,
                                currency_code: region.currency_code,
                              })}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div 
                        className={`flex flex-col sm:flex-row gap-4 ${getAnimationClasses(800).transition}`}
                        style={{ 
                          opacity: isVisible ? 1 : 0,
                          transform: isVisible ? 'translateY(0)' : 'translateY(2rem)',
                        }}
                      >
                        <Link
                          href={product ? `/products/${product.handle}` : config.buttonLink}
                          className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                            {product ? "Shop Now" : config.buttonText}
                          </span>
                          <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>

                        <Link
                          href="/store"
                          className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white font-medium rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                        >
                          Browse All
                          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                        </Link>
                      </div>
                    </div>

                    {/* Product Visual Side */}
                    {product?.thumbnail && (
                      <div className="relative lg:block hidden">
                        <div 
                          className="relative z-10"
                          style={{ 
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateX(0) scale(1)' : 'translateX(2rem) scale(0.8)',
                            transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1) 400ms',
                          }}
                        >
                          {/* Glow Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-blue-500/20 rounded-3xl blur-3xl scale-110" />
                          
                          {/* Product Image */}
                          <div className="relative w-96 h-96 mx-auto">
                            <Image
                              src={product.thumbnail}
                              alt={product.title}
                              fill
                              className="object-contain drop-shadow-2xl"
                              priority={index === 0}
                              sizes="(max-width: 768px) 100vw, 400px"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Custom Navigation */}
      <button className="hero-prev absolute top-1/2 left-8 -translate-y-1/2 z-20 w-14 h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button className="hero-next absolute top-1/2 right-8 -translate-y-1/2 z-20 w-14 h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Custom Pagination */}
      <div className="hero-pagination absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3"></div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-20 flex flex-col items-center gap-2 text-white/60">
        <span className="text-sm font-medium rotate-90 origin-center whitespace-nowrap">Scroll Down</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent animate-pulse" />
      </div>

      <style jsx global>{`
        .hero-pagination .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.3);
          opacity: 1;
          margin: 0 6px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        
        .hero-pagination .swiper-pagination-bullet-active {
          background: white;
          transform: scale(1.2);
        }
        
        .hero-pagination .swiper-pagination-bullet:hover {
          background: rgba(255, 255, 255, 0.8);
          transform: scale(1.1);
        }
      `}</style>
    </section>
  );
};

export default HeroSlider;
