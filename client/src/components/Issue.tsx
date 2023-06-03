import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IntIssue } from "../App";
import { drag } from "../utils/DragDrop";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";

function Issue({ issue }: { issue: IntIssue }) {
	function daysRemaining(date: string): string {
		const today = new Date();
		const dueDate = new Date(date);
		const diff = dueDate.getTime() - today.getTime();
		const days = parseInt((diff / (1000 * 3600 * 24)).toString());
		const daysText = days > 1 ? "days" : "day";
		console.log(days);
		return days > 0
			? `${Math.round(days).toString()} ${daysText} remaining`
			: days === 0
			? "Today"
			: "Overdue";
	}

	return (
		<div className="issue" draggable onDragStart={drag} id={issue.id}>
			<h1>{issue.title}</h1>
			<div className="tags">
				{issue.tags.map((tag, index) => (
					<span className="tag" key={index}>
						{tag}
					</span>
				))}
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
	);
}

export default Issue;
