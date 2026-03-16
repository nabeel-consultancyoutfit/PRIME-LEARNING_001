import React from 'react';

interface LogoIconProps {
  size?: number;
  color?: string;
}

export default function LogoIcon({ size = 32, color = 'currentColor' }: LogoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Graduation Cap */}
      <path
        d="M16 4L4 10V11C4 11 4 20 16 24C28 20 28 11 28 11V10L16 4Z"
        fill={color}
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Cap Top */}
      <path
        d="M4 10L16 4L28 10"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Tassel */}
      <line
        x1="16"
        y1="24"
        x2="16"
        y2="28"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
