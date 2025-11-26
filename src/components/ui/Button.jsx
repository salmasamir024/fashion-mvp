import React from "react";
import clsx from "clsx";

/**
 * Button component
 * variants: primary | glass | outline | secondary | ghost
 */
export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  loading = false,
  disabled = false,
  className = "",
  icon = null,
  ...rest
}) {
  const base =
    "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium transition focus:outline-none";

  const variants = {
    primary:
      "bg-primary text-white shadow-soft hover:bg-primaryLight",
    secondary:
      "bg-secondary text-white shadow-soft hover:opacity-90",
    outline:
      "border border-primary text-primary hover:bg-primaryLight/30",
    ghost:
      "text-primary hover:bg-primaryLight/40",
    glass:
      "bg-white/40 backdrop-blur-card shadow-soft text-black hover:bg-white/60",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={clsx(
        base,
        variants[variant],
        (disabled || loading) && "opacity-50 cursor-not-allowed",
        className
      )}
      {...rest}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            className="opacity-30"
          />
        </svg>
      )}

      {icon && <span className="inline-flex items-center">{icon}</span>}

      {children && <span>{children}</span>}
    </button>
  );
}
