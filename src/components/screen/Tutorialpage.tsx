import React from "react";
import dynamic from "next/dynamic";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper/types";
import "swiper/css";
import "swiper/css/pagination";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function TutorialSection({
  tutorialRef,
  slides,
  currentSlide,
  setCurrentSlide,
  swiperRef,
  handleToForm,
  heroAnim,
}: any) {
  return (
    <div
      ref={tutorialRef}
      className="absolute inset-0 z-20 flex flex-col items-center justify-center opacity-0 scale-90 pointer-events-none transition-all"
    >
      <Swiper
        modules={[Pagination]}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet custom-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active custom-bullet-active",
        }}
        onSwiper={(s) => (swiperRef.current = s)}
        onSlideChange={(s) => setCurrentSlide(s.activeIndex)}
        spaceBetween={30}
        slidesPerView={1}
        className="w-full max-w-[360px] pb-24"
      >
        {slides.map((s: any, i: number) => (
          <SwiperSlide key={i}>
            <div className="flex flex-col items-center text-center mt-10 px-4">
              <div className="w-[200px] h-[200px] mb-6">
                <Lottie animationData={heroAnim} autoplay loop={false} />
              </div>
              <p className="text-sm text-gray-300 max-w-xs mb-8">{s.desc}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        onClick={() => {
          if (!swiperRef.current) return;
          if (currentSlide === slides.length - 1) handleToForm();
          else swiperRef.current.slideNext();
        }}
        className={`mt-6 w-[380px] py-4 rounded-3xl text-[16px] font-medium ${
          currentSlide === slides.length - 1 ? "text-black bg-white border-white" : "text-white bg-black border-[#2C2C2C]"
        } border shadow-[inset_0_0_0_2px_#2C2C2C] transition-all`}
      >
        {currentSlide === slides.length - 1 ? "Get started" : "Continue"}
      </button>
    </div>
  );
}
