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
    active:translate-y-2  active:[box-shadow:0_0px_0_0_var(--tw-shadow-color),0_0px_0_0_var(--tw-shadow-color-1)]
    transition-all duration-150 [box-shadow:3px_8px_0_0_var(--tw-shadow-color-2),0_0_1px_0_var(--tw-shadow-color-2)] border-primary-dark
		hover:translate-y-1 hover:[box-shadow:2px_3px_0_0_var(--tw-shadow-color-2),0_0_1px_0_var(--tw-shadow-color-2)]"
      style={{
        "--tw-shadow-color": "#1b6ff8",
        "--tw-shadow-color-1": "#1b1ff8",
        "--tw-shadow-color-2": "#1b1f11",
        "--tw-shadow-color-3": "#1b1",
      }}
    >
      {children}
    </button>
  );
};

export default Button;
