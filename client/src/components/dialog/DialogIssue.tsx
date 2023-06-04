import { IntIssue } from "../../App";
import DialogInfoForm from "./DialogInfoForm";
import DialogEditForm from "./DialogEditForm";

interface DialogIssueProps {
	dialogOpen: boolean;
	handleCloseDialog: () => void;
	issueId: string;
	editable: boolean;
}

function DialogIssue({ dialogOpen, handleCloseDialog, issueId, editable }: DialogIssueProps) {

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
				{(dialogOpen && !editable) ? <DialogInfoForm issueInfo={getOneIssue}/> : null}
				{(dialogOpen && editable) ? <DialogEditForm issueInfo={getOneIssue} handleCloseDialog={handleCloseDialog}/> : null}
			</dialog>

			<output></output>
		</>
	);
}

export default DialogIssue;
