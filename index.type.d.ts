interface Field {
  id: string;
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

interface FormDefinition {
  title: string;
  subheading?: string;
  theme: string;
  borderStyle: string;
  formId: string;
  formBackground: null | string;
  fields: Field[];
  responsesCount: number;
}

interface FormState {
  title: string;
  formId: string;
  fields: Field[];
  theme: "light" | "dark";
  formBackground: string;
  borderStyle: string;
  previewMode: boolean;
  setFormId: (formId: string) => void;
  setPreviewMode: (previewMode: boolean) => void;
  setForm: (title: string, fields: Field[]) => void;
  setTheme: (theme: Theme) => void;
  setFormBackground: (formBackground: string) => void;
  setBorderStyle: (borderStyle: string) => void;
}

interface FormCardProps {
    id: string;
    title: string;
    createdAt: string;
    variant?: 'formCard' | 'responseCard';
    responsesCount?: number;
}


