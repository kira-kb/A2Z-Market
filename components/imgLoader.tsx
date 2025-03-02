import React from "react";

const ImgLoader = () => {
  return (
    <div className="relative w-[54px] h-[54px] rounded-lg">
      <div className="loader">
        {[...Array(12)].map((_, index) => (
          <div
            key={index}
            className={`absolute w-[8%] h-[24%] bg-gray-500 left-1/2 top-[30%] rounded-full shadow-[0_0_3px_rgba(0,0,0,0.2)] opacity-0 animate-fade`}
            style={{
              transform: `rotate(${index * 30}deg) translate(0, -130%)`,
              animationDelay: `${-(1.2 - index * 0.1)}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Keyframes animation using Tailwind plugin
const fadeKeyframes = `
  @keyframes fade {
    from {
      opacity: 1;
    }
    to {
      opacity: 0.25;
    }
  }
`;

// Adding this in a global stylesheet
document.head.insertAdjacentHTML(
  "beforeend",
  `<style>${fadeKeyframes}</style>`
);

export default ImgLoader;
