import { useEffect, useState } from "react";
import { Assignees, IntIssue, Status, Tags } from "../../App";

interface DialogEditFormProps {
	issueInfo: (() => Promise<IntIssue>) | null;
	handleCloseDialog: () => void;
}

function DialogEditForm({ issueInfo, handleCloseDialog }: DialogEditFormProps) {
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

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const tags: Tags[] = Array.from(formData.getAll("tag")) as Tags[];
		const assignees: Assignees[] = Array.from(
			formData.getAll("assignee")
		) as Assignees[];

		if (tags.length === 0 || assignees.length === 0) {
			alert("Please select at least one checkbox for each item");
			return;
		}

		const title = formData.get("title") as string;
		const description = formData.get("description") as string;
		const weight = parseInt(formData.get("weight") as string);
		const dueDate = formData.get("due-date") as string;
		const status = formData.get("status") as Status;

		const data: IntIssue = {
			title,
			description,
			tags,
			assignees,
			weight,
			dueDate,
			status,
			id: issue.id,
		};
		await createIssueChangeFetch(data);
		location.reload();
	} 

	async function createIssueChangeFetch(data: IntIssue) {
		await fetch(`http://localhost:8000/issues/${data.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
	}


	return (
		<>
			<form id="edit-issue-form" onSubmit={handleSubmit}>
				<label htmlFor="status">Status</label>
				<select
					name="status"
					id="status"
					value={issue.status}
					onChange={(e) => {
						setIssue({ ...issue, status: e.target.value });
					}}
				>
					<option value={Status.OPEN}>Open</option>
					<option value={Status.IN_PROGRESS}>In Progress</option>
					<option value={Status.REVIEW}>Review</option>
					<option value={Status.CLOSED}>Closed</option>
				</select>
				<label htmlFor="title">Title</label>
				<input
					type="text"
					name="title"
					id="title"
					value={issue.title}
					required
					autoComplete="off"
					onChange={(e) => {
						setIssue({ ...issue, title: e.target.value });
					}}
				/>
				<label htmlFor="description">Description</label>
				<textarea
					name="description"
					id="description"
					value={issue.description}
					required
					autoComplete="off"
					onChange={(e) => {
						setIssue({ ...issue, description: e.target.value });
					}}
				></textarea>

				<label>Tags</label>
				<div id="tags">
					{(Object.keys(Tags) as Array<keyof typeof Tags>).map(
						(tag: string) => (
							<label key={tag}>
								<input
									type="checkbox"
									name="tag"
									value={tag}
									checked={issue.tags.includes(tag as Tags)}
									onChange={(e) => {
										const checked = e.target.checked;
										if (checked) {
											setIssue({
												...issue,
												tags: [
													...issue.tags,
													tag as Tags,
												],
											});
										} else {
											setIssue({
												...issue,
												tags: issue.tags.filter(
													(t) => t !== tag
												),
											});
										}
									}}
								/>
								{tag}
							</label>
						)
					)}
				</div>

				<label htmlFor="assignees">Assignees</label>
				<div id="assignees">
					{(
						Object.keys(Assignees) as Array<keyof typeof Assignees>
					).map((assignee: string) => (
						<label key={assignee}>
							<input
								type="checkbox"
								name="assignee"
								value={assignee}
								checked={issue.assignees.includes(
									assignee as Assignees
								)}
								onChange={(e) => {
									const checked = e.target.checked;
									if (checked) {
										setIssue({
											...issue,
											assignees: [
												...issue.assignees,
												assignee as Assignees,
											],
										});
									} else {
										setIssue({
											...issue,
											assignees: issue.assignees.filter(
												(a) => a !== assignee
											),
										});
									}
								}}
							/>
							{assignee}
						</label>
					))}
				</div>

				<label htmlFor="weight">Weight</label>
				<input
					type="number"
					name="weight"
					id="weight"
					value={issue.weight}
					required
					onChange={(e) => {
						setIssue({
							...issue,
							weight: parseInt(e.target.value),
						});
					}}
				/>

				<label htmlFor="due-date">Due Date</label>
				<input
					type="date"
					name="due-date"
					id="due-date"
					value={issue.dueDate}
					onChange={(e) => {
						setIssue({ ...issue, dueDate: e.target.value });
					}}
				/>

				<div>
					<button type="button" onClick={handleCloseDialog}>
						Cancel
					</button>
					<button type="submit">
						Update Issue
					</button>
				</div>
			</form>
		</>
	);
}

export default DialogEditForm;
