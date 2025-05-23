import { create } from "zustand";


export const useFormStore = create<FormState>((set) => ({
    title: "",
    fields: [],
    formId: "",
    theme: "light",
    formBackground: "bg-white",
    borderStyle: "border border-gray-300",
    previewMode: false,
    setFormId: (formId) => set({ formId }),
    setPreviewMode: (previewMode) => set({ previewMode }),
    setForm: (title, fields) => set({ title, fields }),
    setTheme: (theme) => set({ theme }),
    setFormBackground: (formBackground) => set({ formBackground }),
    setBorderStyle: (borderStyle) => set({ borderStyle }),
}));

