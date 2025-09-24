"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Link from 'next/link';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface CategoryData {
  id: string;
  title: string;
  handle: string;
  products?: any[];
  thumbnail?: string;
}

interface CategoriesCarouselProps {
  categories: CategoryData[];
}

// Category icon mapping function
const getCategoryIcon = (title: string) => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('electronics') || lowerTitle.includes('tech') || lowerTitle.includes('gadget')) return '📱';
  if (lowerTitle.includes('clothing') || lowerTitle.includes('fashion') || lowerTitle.includes('apparel')) return '👕';
  if (lowerTitle.includes('book') || lowerTitle.includes('education')) return '📚';
  if (lowerTitle.includes('home') || lowerTitle.includes('furniture') || lowerTitle.includes('decor')) return '🏠';
  if (lowerTitle.includes('sport') || lowerTitle.includes('fitness') || lowerTitle.includes('outdoor')) return '⚽';
  if (lowerTitle.includes('beauty') || lowerTitle.includes('cosmetic')) return '💄';
  if (lowerTitle.includes('jewelry') || lowerTitle.includes('accessories')) return '💎';
  if (lowerTitle.includes('toy') || lowerTitle.includes('kids') || lowerTitle.includes('children')) return '🧸';
  if (lowerTitle.includes('food') || lowerTitle.includes('grocery')) return '🍎';
  if (lowerTitle.includes('automotive') || lowerTitle.includes('car')) return '🚗';
  return '📦'; // default
};

const CategoriesCarousel = ({ categories }: CategoriesCarouselProps) => {
  if (!categories?.length) return null;

  return (
    <section className="pb-10 lg:pb-12.5 xl:pb-15">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="font-semibold text-[#1D2144] text-2xl sm:text-3xl mb-2">
              Categories
            </h2>
            <p className="text-[#64748B]">Browse by category</p>
          </div>
          <Link 
            href="/collections"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-[#3C50E0] hover:text-[#1D2144] transition-colors"
          >
            View All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Categories Carousel */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={2}
            navigation={{
              nextEl: '.categories-next',
              prevEl: '.categories-prev',
            }}
            pagination={{
              clickable: true,
              el: '.categories-pagination',
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 30,
              },
              1280: {
                slidesPerView: 6,
                spaceBetween: 30,
              },
            }}
            className="categories-swiper"
          >
            {categories.map((category) => (
              <SwiperSlide key={category.id}>
                <Link 
                  href={`/collections/${category.handle}`}
                  className="group block"
                >
                  <div className="bg-white rounded-[10px] p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    {category.thumbnail ? (
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-gray-100">
                        <Image
                          src={category.thumbnail}
                          alt={category.title}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#3C50E0] to-[#1D2144] rounded-full flex items-center justify-center text-3xl">
                        {getCategoryIcon(category.title)}
                      </div>
                    )}
                    
                    <h3 className="font-semibold text-[#1D2144] text-lg mb-1 group-hover:text-[#3C50E0] transition-colors">
                      {category.title}
                    </h3>
                    
                    <p className="text-sm text-[#64748B]">
                      {category.products?.length || 0} products
                    </p>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <button className="categories-prev absolute top-1/2 -left-4 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-[#1D2144] hover:text-[#3C50E0] transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button className="categories-next absolute top-1/2 -right-4 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-[#1D2144] hover:text-[#3C50E0] transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Custom Pagination */}
          <div className="categories-pagination mt-8 flex justify-center"></div>
        </div>
      </div>

      <style jsx global>{`
        .categories-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #D1D5DB;
          opacity: 1;
          margin: 0 6px;
        }
        
        .categories-swiper .swiper-pagination-bullet-active {
          background: #3C50E0;
        }
        
        .categories-swiper .swiper-slide {
          height: auto;
        }
      `}</style>
    </section>
  );
};

export default CategoriesCarousel;
