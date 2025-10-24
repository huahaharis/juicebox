import { LottieRefCurrentProps } from "lottie-react";
import type { Swiper as SwiperType } from "swiper/types";

export type HeaderProps = {
  title?: string; 
  showBack?: boolean;
  onRefresh?: () => void; 
};

export type Slide = {
  title?: string;
  desc: string;
  image?: string;
};

export type Form = {
  firstName: string;
  email: string;
};

export interface FormSectionProps {
  formRef: React.RefObject<HTMLDivElement | null>;
  formStep: number;
  formData: { firstName: string; email: string };
  setFormData: (data: Form) => void;
  handleNextStep: () => void;
  isFocused: boolean;
  setIsFocused: (val: boolean) => void;
  heroAnim: object;
}

export interface HeroSectionProps {
  lottieRef: React.RefObject<LottieRefCurrentProps | null>;
  onStart: () => void;
  heroAnim: object;
}

export interface TutorialSectionProps {
  tutorialRef: React.RefObject<HTMLDivElement | null>;
  slides: Slide[];
  currentSlide: number;
  setCurrentSlide: (index: number)=> void;
  swiperRef: React.RefObject<SwiperType | null>;
  handleToForm: ()=> void;
  heroAnim: object;
}

export interface ResultSectionProps {
  resultRef: React.RefObject<HTMLDivElement | null>;
  formData: Form;
  heroAnim: object;
}