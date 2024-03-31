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
			className={` text-white font-bold py-2 px-4 transition-all duration-150 mb-2 mr-2 rounded-none border-r-4 border-b-4 hover:mr-1 hover:mb-1  hover:border-r-2 hover:border-b-2
        ${isPressed && "mr-0 mb-0 border-r-0 border-b-0"}`}
		>
			{children}
		</button>
	);
};

export default Button;
