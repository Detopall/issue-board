import { IntIssue } from "../App";
import DialogInfoForm from "./DialogInfoForm";

interface DialogInfoProps {
	dialogOpen: boolean;
	handleCloseDialog: () => void;
	issueId: string;
}

function DialogIssueInfo({ dialogOpen, handleCloseDialog, issueId }: DialogInfoProps) {

	async function getOneIssue(){
		const oneIssue = await fetch(`http://localhost:8000/issues/${issueId}`);
		const json: IntIssue = await oneIssue.json();
		return json;
	}

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
				<DialogInfoForm issueInfo={dialogOpen ? getOneIssue : null}/>
			</dialog>

			<output></output>
		</>
	);
}

export default DialogIssueInfo;
