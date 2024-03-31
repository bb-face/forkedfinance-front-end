function WarningPopUp(props) {
	const { title, text } = props;

	return (
		<div
			className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
			role="alert"
		>
			<p className="font-bold">{title}</p>
			<p>{text}</p>
		</div>
	);
}

WarningPopUp.defaultProps = {
	title: "Default Title",
	text: "Default text",
};
