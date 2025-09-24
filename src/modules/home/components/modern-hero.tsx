"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const featureData = [
  {
    img: "/images/icons/icon-01.svg",
    title: "Free Shipping",
    description: "For all orders $200",
  },
  {
    img: "/images/icons/icon-02.svg",
    title: "1 & 1 Returns",
    description: "Cancellation after 1 day",
  },
  {
    img: "/images/icons/icon-03.svg",
    title: "100% Secure Payments",
    description: "Gurantee secure payments",
  },
  {
    img: "/images/icons/icon-04.svg",
    title: "24/7 Dedicated Support",
    description: "Anywhere & anytime",
  },
];

const HeroCarousel = () => {
  return (
    <div className="flex items-center pt-6 sm:pt-0 flex-col-reverse sm:flex-row">
      <div className="max-w-[394px] py-10 sm:py-15 lg:py-24.5 pl-4 sm:pl-7.5 lg:pl-12.5">
        <div className="flex items-center gap-4 mb-7.5 sm:mb-10">
          <span className="block font-semibold text-[72px] sm:text-[96px] text-[#3C50E0]">
            30%
          </span>
          <span className="block text-[#1D2144] text-sm sm:text-[18px] sm:leading-[24px]">
            Sale
            <br />
            Off
          </span>
        </div>

        <h1 className="font-semibold text-[#1D2144] text-xl sm:text-3xl mb-3">
          <Link href="/store">True Wireless Noise Cancelling Headphone</Link>
        </h1>

        <p className="text-gray-600 mb-10">
          Discover cutting-edge technology with unbeatable prices on our premium electronics collection.
        </p>

        <Link
          href="/store"
          className="inline-flex font-medium text-white text-[14px] rounded-md bg-[#1D2144] py-3 px-9 ease-out duration-200 hover:bg-[#3C50E0]"
        >
          Shop Now
        </Link>
      </div>

      <div>
        <div className="w-[351px] h-[358px] bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
          <div className="text-8xl">🎧</div>
        </div>
      </div>
    </div>
  );
};

const HeroFeature = () => {
  return (
    <div className="max-w-[1060px] w-full mx-auto px-4 sm:px-8 xl:px-0">
      <div className="flex flex-wrap items-center gap-7.5 xl:gap-12.5 mt-10">
        {featureData.map((item, key) => (
          <div className="flex items-center gap-4" key={key}>
            <div className="w-10 h-10 bg-[#3C50E0]/10 rounded-full flex items-center justify-center">
              {/* Simple icon fallback since we don't have the exact SVGs */}
              <div className="w-6 h-6 bg-[#3C50E0] rounded-full"></div>
            </div>

            <div>
              <h3 className="font-medium text-lg text-[#1D2144]">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function ModernHero() {
  return (
    <section className="overflow-hidden pb-10 lg:pb-12.5 xl:pb-15 pt-[230px] sm:pt-[180px] lg:pt-[120px] xl:pt-[206px] bg-[#E5EAF4]">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="flex flex-wrap gap-5">
          <div className="xl:max-w-[757px] w-full">
            <div className="relative z-1 rounded-[10px] bg-white overflow-hidden">
              {/* Hero Carousel Content */}
              <HeroCarousel />
            </div>
          </div>

          <div className="xl:max-w-[393px] w-full">
            <div className="flex flex-col sm:flex-row xl:flex-col gap-5">
              <div className="w-full relative rounded-[10px] bg-white p-4 sm:p-[30px]">
                <div className="flex items-center gap-14">
                  <div>
                    <h2 className="max-w-[153px] font-semibold text-[#1D2144] text-xl mb-20">
                      <Link href="/store"> iPhone 14 Plus & 14 Pro Max </Link>
                    </h2>

                    <div>
                      <p className="font-medium text-[#64748B] text-[14px] mb-1.5">
                        limited time offer
                      </p>
                      <span className="flex items-center gap-3">
                        <span className="font-medium text-[32px] text-[#F56565]">
                          $699
                        </span>
                        <span className="font-medium text-2xl text-[#64748B] line-through">
                          $999
                        </span>
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="w-[123px] h-[161px] bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-4xl">📱</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full relative rounded-[10px] bg-white p-4 sm:p-[30px]">
                <div className="flex items-center gap-14">
                  <div>
                    <h2 className="max-w-[153px] font-semibold text-[#1D2144] text-xl mb-20">
                      <Link href="/store"> Wireless Headphone </Link>
                    </h2>

                    <div>
                      <p className="font-medium text-[#64748B] text-[14px] mb-1.5">
                        limited time offer
                      </p>
                      <span className="flex items-center gap-3">
                        <span className="font-medium text-[32px] text-[#F56565]">
                          $699
                        </span>
                        <span className="font-medium text-2xl text-[#64748B] line-through">
                          $999
                        </span>
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="w-[123px] h-[161px] bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center">
                      <span className="text-4xl">🎧</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero features */}
      <HeroFeature />
    </section>
  );
}

