import React, { useState } from "react";

const Button = ({ children, type, onClick, disabled, className }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseEnter = () => setIsPressed(false);
  const handleMouseLeave = () => setIsPressed(false);
  const handleClick = () => setIsPressed(!isPressed);

  return (
    <button
      type={type}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleClick}
      disabled={disabled}
      onMouseUp={() => setIsPressed(false)}
      className={`button px-6 h-8 bg-primary cursor-pointer select-none border-t border-l border-button-border
    active:translate-y-2 
		active:[box-shadow:0_0px_0_0_var(--tw-shadow-color),0_0px_0_0_var(--tw-shadow-color)]
    transition-all duration-150 [box-shadow:3px_8px_0_0_var(--tw-shadow-color),0_0_1px_0_var(--tw-shadow-color)]
		hover:translate-y-1 hover:[box-shadow:2px_3px_0_0_var(--tw-shadow-color),0_0_1px_0_var(--tw-shadow-color)]
		disabled:cursor-not-allowed disabled:opacity-50
	${className}`}
      style={{
        "--tw-shadow-color": "#eee",
      }}
    >
      {children}
    </button>
  );
};

export default Button;
