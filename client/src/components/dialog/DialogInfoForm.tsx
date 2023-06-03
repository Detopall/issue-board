import { useEffect, useState } from "react";
import { IntIssue } from "../../App";

interface DialogFormInfo {
	issueInfo: (() => Promise<IntIssue>) | null;
}

function DialogInfoForm({ issueInfo }: DialogFormInfo) {
	const [issue, setIssue] = useState<IntIssue>({
		title: "",
		description: "",
		tags: [],
		assignees: [],
		weight: 0,
		dueDate: "",
		status: "",
		id: "",
	});

	useEffect(() => {
		if (issueInfo) {
			issueInfo().then((data) => {
				setIssue(data);
			});
		}
	}, [issueInfo]);

	console.log(issue);

	return (
		<>
			<form className="issue-info-form">
				<label htmlFor="issue-id">Id</label>
				<input type="text" name="issue-id" readOnly value={issue.id} />
				<label htmlFor="issue-status">Status</label>
				<input
					type="text"
					name="issue-status"
					readOnly
					value={issue.status}
				/>
				<label htmlFor="title">Title</label>
				<input type="text" name="title" readOnly value={issue.title} />

				<label htmlFor="description">Description</label>
				<textarea
					name="description"
					readOnly
					value={issue.description}
				></textarea>

				<label>Tags</label>
				<div>
					<ul>
						{issue.tags.map((tag) => (
							<li key={tag}>{tag} </li>
						))}
					</ul>
				</div>

				<label htmlFor="assignees">Assignees</label>
				<div>
					<ul>
						{issue.assignees.map((assignee) => (
							<li key={assignee}>{assignee} </li>
						))}
					</ul>
				</div>

				<label htmlFor="weight">Weight</label>
				<input name="weight" value={issue.weight} readOnly />

				<label htmlFor="due-date">Due Date</label>
				<input
					type="date"
					name="due-date"
					defaultValue={issue.dueDate}
					readOnly
				/>
			</form>
		</>
	);
}

export default DialogInfoForm;
