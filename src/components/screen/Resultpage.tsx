import React from "react";
import dynamic from "next/dynamic";
import { ResultSectionProps } from "@/types";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function ResultSection({ resultRef, formData, heroAnim }: ResultSectionProps) {
  return (
    <div
      ref={resultRef}
      className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-8 opacity-0 bg-gradient-to-b from-[#0A0A10] to-[#151520]"
    >
      <div className="w-[80px] h-[80px] mb-10">
        <Lottie animationData={heroAnim} autoplay loop={false} />
      </div>

      <h2 className="result-text text-[20px] md:text-[22px] font-medium text-white leading-snug mb-6 max-w-xs">
        Thanks, <span className="font-semibold">{formData.firstName || "Friend"}</span>!
        <br />
        Now, it’s time to get a reality check.
      </h2>

      <p className="text-gray-300 text-[17px] leading-snug max-w-xs">
        This will take 2–3 minutes.
      </p>
    </div>
  );
}
