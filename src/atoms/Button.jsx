import React, { useState } from "react";

const Button = ({ children }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseEnter = () => setIsPressed(false);
  const handleMouseLeave = () => setIsPressed(false);
  const handleClick = () => setIsPressed(!isPressed);

  return (
    <button
      type="button"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleClick}
      onMouseUp={() => setIsPressed(false)}
      className="button px-6 h-8 bg-primary cursor-pointer select-none
    active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]
    transition-all duration-150 [box-shadow:3px_8px_0_0_#1b6ff8,0_15px_0_0_#1b70f841] border-primary-dark"
    >
      {children}
    </button>
  );
};

export default Button;
