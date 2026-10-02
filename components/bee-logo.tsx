import React from "react";

/**
 * Component Icon Con Ong (Bee Logo) tái sử dụng cho toàn bộ dự án
 */
export function BeeLogo({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-label="Logo con ong"
    >
      <ellipse cx="7" cy="8" rx="3.5" ry="2" transform="rotate(-30 7 8)" opacity="0.6" />
      <ellipse cx="17" cy="8" rx="3.5" ry="2" transform="rotate(30 17 8)" opacity="0.6" />
      <path d="M10.5 4L8.5 2M13.5 4L15.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="5.5" r="2.5" />
      <ellipse cx="12" cy="13.5" rx="5.5" ry="6.5" />
      <path d="M7.5 12h9M8 15h8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <polygon points="12,21 11,19.5 13,19.5" />
    </svg>
  );
}
