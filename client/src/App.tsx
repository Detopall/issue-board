import DialogNewIssue from "./components/dialog/DialogNewIssue";
import IssueContainer from "./components/IssueContainer";
import { useState } from "react";

export enum Status {
	OPEN = "open",
	CLOSED = "closed",
	IN_PROGRESS = "in-progress",
	REVIEW = "review",
}

export enum Assignees {
	DENIS = "Denis",
	SIMON = "Simon",
	KEVIN = "Kevin",
	BERT = "Bert"
}

export enum Tags {
	BUG_FIX = "bug-fix",
	FEATURE = "feature",
	DOCUMENTATION = "documentation",
	QUESTION = "question",
	HELP_WANTED = "help wanted",
	REFACTOR = "refactor"
}
export interface IntIssue {
	title: string;
	description: string;
	tags: Tags[];
	assignees: Assignees[];
	weight: number;
	dueDate: string;
	status: Status | string;
	id: string;
}

function App() {
	const [dialogOpen, setDialogOpen] = useState(false);


	async function handleDragEnd() {
		const issueId =
			document.querySelector("#App")?.getAttribute("data-issue-id") ?? "";
		const draggedTo =
			document.querySelector("#App")?.getAttribute("data-dragged-to") ??
			"";

		const oneIssue = await fetch(`http://localhost:8000/issues/${issueId}`);
		const json = await oneIssue.json();
		json.status = draggedTo;

		await fetch(`http://localhost:8000/issues/${issueId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(json),
		});

		location.reload();
	}

	const handleShowDialog = () => {
		setDialogOpen(true);
	};

	const handleCloseDialog = () => {
		setDialogOpen(false);
	};

	return (
		<>
			<div id="App" onDragEnd={handleDragEnd}>
				<button
					id="show-dialog"
					onClick={handleShowDialog}
					className="new-issue-button"
				>
					New Issue
				</button>
				<DialogNewIssue
					dialogOpen={dialogOpen}
					handleCloseDialog={handleCloseDialog}
				/>
				<IssueContainer />
			</div>
		</>
	);
}

export default App;
