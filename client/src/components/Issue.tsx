import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IntIssue } from "../App";
import { drag } from "../utils/DragDrop";
import {
	faDumbbell,
	faEdit,
	faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import DialogIssue from "./dialog/DialogIssue";

function Issue({ issue }: { issue: IntIssue }) {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [editMode, setEditMode] = useState(false);

	const handleShowDialog = (editable: boolean, e: React.MouseEvent) => {
		e.stopPropagation(); // to prevent the modal of the parent from opening

		setDialogOpen(true);
		setEditMode(editable);
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
		e.stopPropagation(); // to prevent the modal of the parent from opening
		
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
				onClick={(e) => handleShowDialog(false, e)}
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
				<div className="issue-edit-icon" onClick={(e) => handleShowDialog(true, e)}>
					<FontAwesomeIcon icon={faEdit} />
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

			<DialogIssue
				dialogOpen={dialogOpen}
				handleCloseDialog={handleCloseDialog}
				issueId={issue.id}
				editable={editMode}
			/>
		</>
	);
}

export default Issue;
