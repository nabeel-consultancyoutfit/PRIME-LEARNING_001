import React from 'react';

interface EmptyStateIconProps {
  size?: number;
  color?: string;
}

export default function EmptyStateIcon({ size = 32, color = 'currentColor' }: EmptyStateIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Folder Box */}
      <path
        d="M4 8H14L16 4H28C29.1046 4 30 4.89543 30 6V26C30 27.1046 29.1046 28 28 28H4C2.89543 28 2 27.1046 2 26V6C2 4.89543 2.89543 4 4 4H14L16 8Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Folder Tab */}
      <path
        d="M4 8H14L16 4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Empty Indicator - Dashed Line */}
      <line
        x1="10"
        y1="16"
        x2="22"
        y2="16"
        stroke={color}
        strokeWidth="1"
        strokeDasharray="2,2"
        strokeLinecap="round"
      />
      {/* Center Dot */}
      <circle cx="16" cy="20" r="1.5" fill={color} />
    </svg>
  );
}
