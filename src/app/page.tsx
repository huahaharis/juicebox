"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import gsap from "gsap";
import type { Swiper as SwiperType } from "swiper/types";
import Header from "@/components/layout/header";

// Reusable Components
import HomeSection from "@/components/screen/Homepage";
import TutorialSection from "@/components/screen/Tutorialpage";
import FormSection from "@/components/screen/Formpage";
import ResultSection from "@/components/screen/Resultpage";

// Lottie
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import heroAnim from "@/public/animation/JB2G_Lottie.json";

export default function WalkthroughPage() {
  const router = useRouter();

  // --- State ---
  const [showTutorial, setShowTutorial] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [formStep, setFormStep] = useState(0);
  const [formData, setFormData] = useState({ firstName: "", email: "" });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  // --- Refs ---
  const heroRef = useRef<HTMLDivElement>(null);
  const tutorialRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<any>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const tlMainRef = useRef<gsap.core.Timeline | null>(null);
  const tlFormRef = useRef<gsap.core.Timeline | null>(null);

  // --- Animation: HERO → TUTORIAL ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });
      tl.to(".hero-text", { opacity: 0, y: -20, duration: 0.6 })
        .to(
          heroRef.current,
          { scale: 0.24, transformOrigin: "center", duration: 1.2, ease: "power3.inOut" },
          "<"
        )
        .to(heroRef.current, { opacity: 0, duration: 0.6, ease: "power1.inOut" }, "-=0.6")
        .to(
          tutorialRef.current,
          {
            opacity: 1,
            scale: 1,
            pointerEvents: "auto",
            duration: 1.2,
            ease: "power2.out",
          },
          "-=0.4"
        );
      tlMainRef.current = tl;
    });
    return () => ctx.revert();
  }, []);

  // --- Handlers ---
  const handleToTutorial = () => {
    tlMainRef.current?.play();
    setTimeout(() => setShowTutorial(true), 1000);
  };

  const handleToForm = () => {
    setShowForm(true);
    setTimeout(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(tutorialRef.current, { opacity: 0, scale: 0.85, duration: 0.8 })
        .set(formRef.current, { opacity: 1, pointerEvents: "auto" })
        .fromTo(
          ".form-lottie",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "+=0.2"
        )
        .fromTo(
          [".form-text", ".form-input"],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 },
          "-=0.4"
        );
      tlFormRef.current = tl;
    }, 50);
  };

  const handleNextStep = () => {
    if (formStep === 0 && formData.firstName.trim() !== "") {
      setFormStep(1);
    } else if (formStep === 1 && formData.email.trim() !== "") {
      gsap.to(formRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          setShowForm(false);
          requestAnimationFrame(() => {
            setShowResult(true);
            setTimeout(() => {
              gsap.fromTo(
                resultRef.current,
                { opacity: 0, scale: 0.85 },
                {
                  opacity: 1,
                  scale: 1,
                  duration: 1.2,
                  ease: "power2.out",
                  onStart: () => {
                    gsap.fromTo(
                      ".result-text",
                      { scale: 0.9, opacity: 0 },
                      {
                        scale: 1,
                        opacity: 1,
                        duration: 1,
                        ease: "back.out(1.7)",
                        delay: 0.3,
                      }
                    );
                  },
                }
              );
            }, 100);
          });
        },
      });
    }
  };

  const handleBack = () => {
    if (showResult) {
      gsap.to(resultRef.current, {
        opacity: 0,
        scale: 0.85,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          setShowResult(false);
          setShowForm(true);
          setTimeout(() => {
            gsap.fromTo(
              formRef.current,
              { opacity: 0, scale: 0.9 },
              { opacity: 1, scale: 1, duration: 1.0, ease: "power2.out" }
            );
          }, 50);
        },
      });
    } else if (showForm) {
      tlFormRef.current?.reverse();
      setTimeout(() => setShowForm(false), 800);
    } else if (showTutorial) {
      tlMainRef.current?.reverse();
      setTimeout(() => setShowTutorial(false), 800);
    }
  };

  const handleRefresh = () => {
    if (lottieRef.current) {
      lottieRef.current.stop();
      lottieRef.current.play();
    }
  };

  // --- Tutorial Slides ---
  const slides = [
    { desc: "Professionals around the world shared how they feel about technology and I’ve listened. Now it’s your turn." },
    { desc: "I’ll ask you a handful of meaningful questions and compare your responses with people in your industry." },
    { desc: "You’ll get insights into current industry sentiments and a reality check about technology in a few minutes. Deal? Great!" },
  ];

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-[#07070B] text-white overflow-hidden px-5 pt-6 pb-10">
      <div className="fixed top-0 left-0 w-full z-[100] flex justify-center bg-transparent pointer-events-none">
        <div className="pointer-events-auto w-full max-w-[420px]">
          <Header
            title="juicebox"
            showBack={showTutorial || showForm || showResult}
            onBack={handleBack}
            onRefresh={handleRefresh}
          />
        </div>
      </div>


      {!showTutorial && !showForm && !showResult && (
        <div ref={heroRef}>
          <HomeSection lottieRef={heroRef} heroAnim={heroAnim} onStart={handleToTutorial} />
        </div>
      )}

      <TutorialSection
        tutorialRef={tutorialRef}
        slides={slides}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        swiperRef={swiperRef}
        handleToForm={handleToForm}
        heroAnim={heroAnim}
      />

      {showForm && (
        <FormSection
          formRef={formRef}
          formStep={formStep}
          formData={formData}
          setFormData={setFormData}
          handleNextStep={handleNextStep}
          isFocused={isFocused}
          setIsFocused={setIsFocused}
          heroAnim={heroAnim}
        />
      )}

      {showResult && (
        <ResultSection
          resultRef={resultRef}
          formData={formData}
          heroAnim={heroAnim}
        />
      )}

      <style jsx global>{`
        .custom-bullet {
          background: #ffffff22;
          opacity: 1;
          width: 10px;
          height: 10px;
          margin: -10px 6px !important;
          transition: background 0.3s ease, transform 0.3s ease;
        }
        .custom-bullet-active {
          background: #b488f2 !important;
          transform: scale(1.3);
        }
      `}</style>
    </main>
  );
}
