import React from "react";
import dynamic from "next/dynamic";
import { FormSectionProps } from "@/types";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function FormSection({
  formRef,
  formStep,
  formData,
  setFormData,
  handleNextStep,
  isFocused,
  setIsFocused,
  heroAnim,
}: FormSectionProps) {
  return (
    <div
      ref={formRef}
      className="absolute inset-0 z-40 flex flex-col items-center justify-center text-center px-6 opacity-0 pointer-events-none"
    >
      <div className="pointer-events-auto flex flex-col items-center">
        <div className="form-lottie w-[48px] h-[48px] mb-8">
          <Lottie animationData={heroAnim} autoplay loop={false} />
        </div>

        <p className="form-text text-[17px] font-medium text-gray-100 mb-8 leading-snug max-w-xs">
          {formStep === 0
            ? "Let’s start with the basics. Type in your first name."
            : "How should we contact you? Type in your email address."}
        </p>

        <div className="form-input w-full max-w-sm flex flex-col gap-4">
          {/* First Name */}
          <div
            className={`flex items-center bg-[#101018] border rounded-2xl px-4 py-3 transition-all duration-300 ${
              formStep === 0 ? "flex opacity-100" : "hidden opacity-0"
            } ${isFocused ? "border-[#B49BFF]" : "border-gray-700"}`}
          >
            <input
              type="text"
              placeholder="First name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none text-[16px]"
            />
            <button
              type="button"
              onClick={handleNextStep}
              className="ml-2 p-2 rounded-full hover:bg-white/10 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="#B49BFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>

          {/* Email */}
          <div
            className={`flex items-center bg-[#101018] border rounded-2xl px-4 py-3 transition-all duration-300 ${
              formStep === 1 ? "flex opacity-100" : "hidden opacity-0"
            } ${isFocused ? "border-[#B49BFF]" : "border-gray-700"}`}
          >
            <input
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none text-[16px]"
            />
            <button
              type="button"
              onClick={handleNextStep}
              className="ml-2 p-2 rounded-full hover:bg-white/10 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="#B49BFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
