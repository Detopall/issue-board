import DialogForm from "./DialogForm";
import { Status, IntIssue } from "../../App";

interface DialogProps {
	dialogOpen: boolean;
	handleCloseDialog: () => void;
}

function DialogNewIssue({ dialogOpen, handleCloseDialog }: DialogProps) {

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const tags: string[] = Array.from(formData.getAll("tag")) as string[];
		const assignees: string[] = Array.from(
			formData.getAll("assignee")
		) as string[];

		if (tags.length === 0 || assignees.length === 0) {
			alert("Please select at least one checkbox for each item");
			return;
		}

		const title = formData.get("title") as string;
		const description = formData.get("description") as string;
		const weight = parseInt(formData.get("weight") as string);
		const dueDate = formData.get("due-date") as string;

		const data: IntIssue = {
			title,
			description,
			tags,
			assignees,
			weight,
			dueDate,
			status: Status.OPEN,
			id: "temp id",
		};

		createIssueFetch(data);
	}

	async function createIssueFetch(data: IntIssue) {
		const fetched = fetch("http://localhost:8000/issues", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		const response = await fetched;
		const json = await response.json();
		console.log(json);
		location.reload();
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
				<DialogForm
					handleCloseDialog={handleCloseDialog}
					handleSubmit={handleSubmit}
				/>
			</dialog>

			<output></output>
		</>
	);
}

export default DialogNewIssue;
