export type HeaderProps = {
  title?: string; 
  showBack?: boolean;
  onRefresh?: () => void; 
};

export interface FormSectionProps {
  formRef: React.RefObject<HTMLDivElement | null>;
  formStep: number;
  formData: { firstName: string; email: string };
  setFormData: (data: any) => void;
  handleNextStep: () => void;
  isFocused: boolean;
  setIsFocused: (val: boolean) => void;
  heroAnim: any;
}