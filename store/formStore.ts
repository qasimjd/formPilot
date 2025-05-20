import { create } from "zustand";


export const useFormStore = create<FormState>((set) => ({
    title: "",
    fields: [],
    theme: "light",
    formBackground: "bg-white",
    borderStyle: "border border-gray-300",
    setForm: (title, fields) => set({ title, fields }),
    setTheme: (theme) => set({ theme }),
    setFormBackground: (formBackground) => set({ formBackground }),
    setBorderStyle: (borderStyle) => set({ borderStyle }),
}));

