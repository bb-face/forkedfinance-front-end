function DashboardModal() {
	const [modalHeading, setModalHeading] = useState(false);
	const [modalLabel, setModalLabel] = useState(false);
	const [modalButton, setModalButton] = useState(false);

	const closeModal = () => {
		setModal(!modal);
	};

	function changeAmount(e) {
		setAmount(e.target.value);
	}

	return (
		<>
			<button type="button" onClick={closeModal} className="overlay" />
			<div className="modal">
				<div className="modal-content">
					<div className="modal-heading">{modalHeading}</div>
					<div className="modal-divider">
						<hr />
					</div>
					<button type="button" className="close-modal" onClick={closeModal}>
						✕
					</button>
					<div className="modal-input">
						<Input
							type="number"
							placeholder="0.0"
							bordered={false}
							onChange={changeAmount}
						/>
						<div className="label">{modalLabel}</div>
					</div>
					<div className="modal-divider">
						<hr />
					</div>
					<div className="modal-buttons">
						<button
							type="button"
							className="modalButton"
							onClick={() => {
								handleModalButton(modalHeading);
							}}
						>
							{modalButton}
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
