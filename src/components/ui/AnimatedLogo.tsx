
import React from "react";
import { cn } from "@/lib/utils";

interface AnimatedLogoProps {
  className?: string;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ className }) => {
  return (
    <div className={cn("relative w-10 h-10 md:w-12 md:h-12", className)}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Comic style speech bubble */}
        <path
          d="M85 30C85 19.5066 76.4934 11 66 11H34C23.5066 11 15 19.5066 15 30V54C15 64.4934 23.5066 73 34 73H45L50 89L55 73H66C76.4934 73 85 64.4934 85 54V30Z"
          fill="#6B46C1"
          className="animate-pulse-gentle"
        />
        
        {/* Outline for speech bubble */}
        <path
          d="M85 30C85 19.5066 76.4934 11 66 11H34C23.5066 11 15 19.5066 15 30V54C15 64.4934 23.5066 73 34 73H45L50 89L55 73H66C76.4934 73 85 64.4934 85 54V30Z"
          stroke="#2D3748"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-draw-line"
          strokeDasharray="1000"
          strokeDashoffset="1000"
        />
        
        {/* "CS" letters inside bubble */}
        <text
          x="50"
          y="50"
          fontFamily="Poppins, sans-serif"
          fontSize="28"
          fontWeight="bold"
          fill="white"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          CS
        </text>
      </svg>
    </div>
  );
};

export default AnimatedLogo;
