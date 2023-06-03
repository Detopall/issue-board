interface DialogInfoProps {
	dialogOpen: boolean;
	handleCloseDialog: () => void;
}

function DialogIssueInfo({ dialogOpen, handleCloseDialog }: DialogInfoProps) {
	return (
		<>
			<div
				className={`modal-overlay ${dialogOpen ? "open" : ""}`}
				onClick={handleCloseDialog}
			></div>
			<dialog
				id="new-issue-dialog"
				className={dialogOpen ? "open" : ""}
				open={dialogOpen}
			>
				dialog
			</dialog>

			<output></output>
		</>
	);
}

export default DialogIssueInfo;
