import Dialog from "./components/Dialog";
import IssueContainer from "./components/IssueContainer";

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
	function handleDragEnd() {
		console.log("Dragging stopped");
	}

	function showDialog(e: React.MouseEvent<HTMLButtonElement>) {
		console.log("modal show");
	}

	function getButtonElement(id: string): HTMLButtonElement | undefined {
		const button = document.querySelector(`#${id}`);
		return (button as HTMLButtonElement) || undefined;
	}

	return (
		<>
			<div id="App" onDragEnd={handleDragEnd}>
				<button
					id="show-dialog"
					onClick={showDialog}
					className="new-issue-button"
				>
					New Issue
				</button>
				<Dialog showButton={getButtonElement("show-dialog")} />
				<IssueContainer />
			</div>
		</>
	);
}

export default App;
