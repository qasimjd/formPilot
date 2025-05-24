import React from "react";

interface FormSkeletonProps {
  variant?: "sidebar" | "form";
}

export const FormSkeleton: React.FC<FormSkeletonProps> = ({ variant = "form" }) => {
  if (variant === "sidebar") {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-muted rounded w-3/4 mb-4" />
        <div className="h-6 bg-muted rounded w-1/2 mb-2" />
        <div className="h-6 bg-muted rounded w-2/3 mb-2" />
        <div className="h-6 bg-muted rounded w-1/3 mb-2" />
        <div className="h-6 bg-muted rounded w-1/2 mb-2" />
        <div className="h-6 bg-muted rounded w-2/3 mb-2" />
        <div className="h-6 bg-muted rounded w-1/3 mb-2" />
        <div className="h-6 bg-muted rounded w-1/2 mb-2" />
      </div>
    );
  }
  // Default: form skeleton
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-10 bg-muted rounded w-1/2 mb-6" />
      <div className="h-8 bg-muted rounded w-1/3 mb-4" />
      <div className="h-16 bg-muted rounded w-full mb-4" />
      <div className="h-8 bg-muted rounded w-1/2 mb-4" />
      <div className="h-16 bg-muted rounded w-full mb-4" />
      <div className="h-8 bg-muted rounded w-2/3 mb-4" />
      <div className="h-16 bg-muted rounded w-full mb-4" />
      <div className="h-8 bg-muted rounded w-1/2 mb-4" />
      <div className="h-16 bg-muted rounded w-full mb-4" />
      <div className="h-8 bg-muted rounded w-1/3 mb-4" />
    </div>
  );
};

export default FormSkeleton;
