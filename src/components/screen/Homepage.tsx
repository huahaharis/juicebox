import React from "react";
import dynamic from "next/dynamic";
import { HeroSectionProps } from "@/types";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function HeroSection({ lottieRef, onStart, heroAnim }: HeroSectionProps) {
  return (
    <div
      className="relative z-10 flex flex-col items-center justify-center flex-1 w-full max-w-[320px] text-center"
    >
      <div className="relative rounded-[3rem] overflow-hidden shadow-lg w-full mb-6">
        <Lottie lottieRef={lottieRef} animationData={heroAnim} autoplay loop={false} />
      </div>

      <div className="hero-text mt-6">
        <p className="text-[18px] font-medium text-gray-200 leading-snug max-w-sm mx-auto px-2">
          Compare your thoughts on{" "}
          <span className="text-[#B49BFF] font-semibold">technology</span> with
          current industry opinions.
        </p>

        <button
          onClick={onStart}
          className="mt-10 w-[380px] bg-[#CDAAFF] py-4 rounded-3xl text-[16px] font-medium text-black border border-[#2C2C2C] shadow-[inset_0_0_0_2px_#2C2C2C] hover:bg-gray-100 transition-all"
        >
          Get a reality check
        </button>
      </div>
    </div>
  );
}
