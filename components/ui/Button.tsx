import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
                                                children,
                                                variant = "primary",
                                                isLoading,
                                                className = "",
                                                disabled,
                                                ...props
                                              }) => {
  const baseStyles =
    "px-5 py-2.5 rounded-xl font-semibold text-sm transition duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2";

  const variants = {
    primary: "bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-200",
    secondary: "bg-purple-100 hover:bg-purple-200 text-purple-700",
    outline: "border border-slate-200 hover:bg-slate-100 text-slate-700",
    ghost: "text-purple-700 hover:bg-purple-50",
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {isLoading ? "Завантаження..." : children}
    </button>
  );
};
