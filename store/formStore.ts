import { create } from "zustand";


export const useFormStore = create<FormState>((set) => ({
    title: "",
    fields: [],
    formId: "",
    theme: "light",
    formBackground: "bg-white",
    borderStyle: "border border-gray-300",
    previewMode: false,
    isProUser: false,
    plan: "free",
    planStartsOn: null,
    planEndsOn: null,
    freeCredits: 3,

    setFormId: (formId) => set({ formId }),
    setPreviewMode: (previewMode) => set({ previewMode }),
    setForm: (title, fields) => set({ title, fields }),
    setTheme: (theme) => set({ theme }),
    setFormBackground: (formBackground) => set({ formBackground }),
    setBorderStyle: (borderStyle) => set({ borderStyle }),
    setIsProUser: (isProUser: boolean) => set({ isProUser }),
    setPlan: (plan) => set({ plan }),
    setPlanStartsOn: (planStartsOn) => set({ planStartsOn }),
    setPlanEndsOn: (planEndsOn) => set({ planEndsOn }),
    setFreeCredits: (freeCredits) => set({ freeCredits }),
    
    // Field management functions
    addField: (field) => set((state) => ({
        fields: [...state.fields, field]
    })),
    
    removeField: (fieldId) => set((state) => ({
        fields: state.fields.filter(field => field.id !== fieldId)
    })),
    
    updateField: (fieldId, updates) => set((state) => ({
        fields: state.fields.map(field => 
            field.id === fieldId ? { ...field, ...updates } : field
        )
    })),
}));

