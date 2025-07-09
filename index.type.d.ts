interface Field {
  id: string;
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

type Theme = "light" | "dark" | "bg-pink-50 text-gray-700" | "bg-white/80 backdrop-blur text-gray-800";
interface FormDefinition {
  title: string;
  subheading?: string;
  theme?: string;
  borderStyle?: string;
  formId?: string;
  formBackground?: null | string;
  fields: Field[];
  responsesCount?: number;
}
interface FormState {
  title: string;
  formId: string;
  fields: Field[];
  theme: Theme;
  formBackground: string;
  borderStyle: string;
  previewMode: boolean;
  isProUser: boolean;
  plan: "free" | "monthly" | "yearly";
  planStartsOn: Date | null;
  planEndsOn: Date | null;
  freeCredits: number;

  setFreeCredits: (freeCredits: number) => void;
  setPlanStartsOn: (planStartsOn: Date | null) => void;
  setPlanEndsOn: (planEndsOn: Date | null) => void;
  setPlan: (plan: "free" | "monthly" | "yearly") => void;
  setIsProUser: (isProUser: boolean) => void;
  setFormId: (formId: string) => void;
  setPreviewMode: (previewMode: boolean) => void;
  setForm: (title: string, fields: Field[]) => void;
  setTheme: (theme: Theme) => void;
  setFormBackground: (formBackground: string) => void;
  setBorderStyle: (borderStyle: string) => void;
  
  // Field management functions
  addField: (field: Field) => void;
  removeField: (fieldId: string) => void;
  updateField: (fieldId: string, updates: Partial<Field>) => void;
}
interface FormCardProps {
  id: string;
  title: string;
  createdAt: string;
  variant?: 'formCard' | 'responseCard';
  responsesCount?: number;
}
interface StatItem {
  label: string;
  value: string | number;
  icon: string;
  color: string;
}
interface ChartDataItem {
  name: string; // Day of week
  forms: number;
  responses: number;
}