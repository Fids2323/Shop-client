import React from "react";

const Button = ({backgroundColor, children, onClick}) => {
	const getColorText = (backgroundColor) => (backgroundColor === "bg-main" ? "text-white" : "text-main");

	return (
		<button
			className={`px-4 h-10 lg:w-48 py-2 text-sm md:text-md text-center rounded-md font-medium cursor-pointer ${backgroundColor} ${getColorText(
				backgroundColor
			)} hover:text-hover active:scale-110`}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;
