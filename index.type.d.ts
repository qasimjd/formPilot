interface Field {
  id: string;
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

interface FormData {
  title: string;
  theme: string;
  formBackground: null | string;
  fields: Field[];
}

interface FormState {
  title: string;
  fields: Field[];
  theme: "light" | "dark";
  formBackground: string;
  borderStyle: string;
  setForm: (title: string, fields: Field[]) => void;
  setTheme: (theme: Theme) => void;
  setFormBackground: (formBackground: string) => void;
  setBorderStyle: (borderStyle: string) => void;
}

