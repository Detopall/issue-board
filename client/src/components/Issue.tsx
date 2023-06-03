import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IntIssue } from "../App";
import { drag } from "../utils/DragDrop";
import { faDumbbell, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import DialogIssueInfo from "./dialog/DialogIssueInfo";

function Issue({ issue }: { issue: IntIssue }) {
	const [dialogOpen, setDialogOpen] = useState(false);

	const handleShowDialog = () => {
		setDialogOpen(true);
	};

	const handleCloseDialog = () => {
		setDialogOpen(false);
	};

	function daysRemaining(date: string): string {
		const today = new Date();
		const dueDate = new Date(date);
		const diff = dueDate.getTime() - today.getTime();
		const days = parseInt((diff / (1000 * 3600 * 24)).toString());
		const daysText = days > 1 ? "days" : "day";
		return days > 0
			? `${Math.round(days).toString()} ${daysText} remaining`
			: days === 0
			? "Today"
			: "Overdue";
	}

	async function deleteIssue(e: React.MouseEvent<HTMLDivElement>) {
		const issueId = e.currentTarget.parentElement?.id;
		if (issueId) {
			await fetch(`http://localhost:8000/issues/${issueId}`, {
				method: "DELETE",
			});
			location.reload();
		}
	}

	return (
		<>
			<div
				className="issue"
				draggable
				onDragStart={drag}
				id={issue.id}
				onClick={handleShowDialog}
			>
				<h1>{issue.title}</h1>
				<div className="tags">
					{issue.tags.map((tag, index) => (
						<span className="tag" key={index}>
							{tag}
						</span>
					))}
				</div>
				<div className="issue-delete-icon" onClick={deleteIssue}>
					<FontAwesomeIcon icon={faTrashCan} />
				</div>
				<div className="assignees">
					{issue.assignees.map((assignee, index) => (
						<span className="assignee" key={index}>
							{assignee}
						</span>
					))}
				</div>
				<span className="weight">
					<FontAwesomeIcon icon={faDumbbell} /> {issue.weight}
				</span>
				<span className="due-date">{daysRemaining(issue.dueDate)}</span>
			</div>
			<DialogIssueInfo
				dialogOpen={dialogOpen}
				handleCloseDialog={handleCloseDialog}
				issueId={issue.id}
			/>
		</>
	);
}

export default Issue;
