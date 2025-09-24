"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechCorp Inc.",
    content: "Outstanding service and quality products! The team went above and beyond to ensure our satisfaction. Highly recommend for anyone looking for premium solutions.",
    rating: 5,
    avatar: "SJ"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Manager",
    company: "Innovation Labs",
    content: "Exceptional customer support and fast delivery. The products exceeded our expectations in terms of quality and functionality. Will definitely order again!",
    rating: 5,
    avatar: "MC"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "CEO",
    company: "StartupX",
    content: "Great experience from start to finish. Professional service, competitive pricing, and top-notch quality. This has become our go-to supplier for all needs.",
    rating: 5,
    avatar: "ER"
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Operations Manager",
    company: "Global Solutions",
    content: "Impressed with the attention to detail and customer-centric approach. The entire process was smooth and the results speak for themselves.",
    rating: 4,
    avatar: "DT"
  },
  {
    id: 5,
    name: "Lisa Wang",
    role: "Designer",
    company: "Creative Studio",
    content: "Amazing products with beautiful design and excellent functionality. The customer service team is responsive and always ready to help.",
    rating: 5,
    avatar: "LW"
  },
  {
    id: 6,
    name: "James Miller",
    role: "Tech Lead",
    company: "DevCorp",
    content: "Reliable, high-quality products that deliver exactly what they promise. The ordering process is simple and shipping is always on time.",
    rating: 4,
    avatar: "JM"
  }
];

export default function Testimonials() {
  return (
    <section className="pb-10 lg:pb-12.5 xl:pb-15 bg-gray-50">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-semibold text-[#1D2144] text-2xl sm:text-3xl mb-4">
            What Our Customers Say
          </h2>
          <p className="text-[#64748B] max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about their experience with us.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: '.testimonials-next',
              prevEl: '.testimonials-prev',
            }}
            pagination={{
              clickable: true,
              el: '.testimonials-pagination',
            }}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className="testimonials-swiper"
          >
            {testimonialsData.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-white rounded-[10px] p-6 h-full shadow-sm hover:shadow-lg transition-shadow duration-300">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Testimonial Content */}
                  <blockquote className="text-[#64748B] mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </blockquote>

                  {/* Author Info */}
                  <div className="flex items-center gap-4 mt-auto">
                    {/* Avatar */}
                    <div className="w-12 h-12 bg-gradient-to-br from-[#3C50E0] to-[#1D2144] rounded-full flex items-center justify-center text-white font-semibold">
                      {testimonial.avatar}
                    </div>
                    
                    {/* Author Details */}
                    <div>
                      <h4 className="font-semibold text-[#1D2144] text-sm">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs text-[#64748B]">
                        {testimonial.role}
                      </p>
                      <p className="text-xs text-[#3C50E0] font-medium">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <button className="testimonials-prev absolute top-1/2 -left-4 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-[#1D2144] hover:text-[#3C50E0] transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button className="testimonials-next absolute top-1/2 -right-4 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-[#1D2144] hover:text-[#3C50E0] transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Custom Pagination */}
          <div className="testimonials-pagination mt-8 flex justify-center"></div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 pt-8 border-t border-gray-200">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-[#1D2144] mb-1">10K+</div>
            <div className="text-sm text-[#64748B]">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-[#1D2144] mb-1">4.9</div>
            <div className="text-sm text-[#64748B]">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-[#1D2144] mb-1">24/7</div>
            <div className="text-sm text-[#64748B]">Support</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-[#1D2144] mb-1">99%</div>
            <div className="text-sm text-[#64748B]">Satisfaction Rate</div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .testimonials-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #D1D5DB;
          opacity: 1;
          margin: 0 6px;
        }
        
        .testimonials-swiper .swiper-pagination-bullet-active {
          background: #3C50E0;
        }
        
        .testimonials-swiper .swiper-slide {
          height: auto;
        }
      `}</style>
    </section>
  );
}
