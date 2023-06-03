import Dialog from "./components/Dialog";
import IssueContainer from "./components/IssueContainer";
import { useEffect, useState } from "react";

export enum Status {
	OPEN = "open",
	CLOSED = "closed",
	IN_PROGRESS = "in-progress",
	REVIEW = "review",
}

export type Tags =
	| "bug-fix"
	| "feature"
	| "documentation"
	| "question"
	| "help wanted"
	| "refactor"
	| string;

export interface IntIssue {
	title: string;
	description: string;
	tags: Tags[];
	assignees: string[];
	weight: number;
	dueDate: string;
	status: Status | string;
	id: string;
}

function App() {
	const [dialogOpen, setDialogOpen] = useState(false);
	const showButton = document.querySelector("#show-dialog");

	useEffect(() => {
		if (showButton) {
			showButton.addEventListener("click", handleShowDialog);
		}
	}, [showButton]);

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
				<Dialog
					dialogOpen={dialogOpen}
					handleCloseDialog={handleCloseDialog}
				/>
				<IssueContainer />
			</div>
		</>
	);
}

export default App;
