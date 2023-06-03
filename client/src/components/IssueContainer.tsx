import { useEffect, useState } from "react";
import { IntIssue, Status } from "../App";
import Issue from "./Issue";
import { allowDrop, drop } from "../utils/DragDrop";

interface IssueContainer {
	status: string;
	issues: IntIssue[];
}

function IssueContainer() {
	const [issueContainers, setIssueContainers] = useState<IssueContainer[]>(
		[]
	);

	useEffect(() => {
		fetch("http://localhost:8000/issues")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				const containers: IssueContainer[] = [];

				data.forEach((issue: IntIssue) => {
					const containerIndex = containers.findIndex(
						(container) => container.status === issue.status
					);

					if (containerIndex !== -1) {
						containers[containerIndex].issues.push(issue);
					} else {
						containers.push({
							status: issue.status,
							issues: [issue],
						});
					}
				});

				// Sort the issue containers based on the desired order
				const orderedContainers = [
					Status.OPEN,
					Status.IN_PROGRESS,
					Status.REVIEW,
					Status.CLOSED,
				].map((status) => {
					const container = containers.find(
						(c) => c.status === status
					);
					return container ? container : { status, issues: [] };
				});

				setIssueContainers(orderedContainers);
			});
	}, []);

	return (
		<>
			{issueContainers.map((container, index) => (
				<div
					className="issue-container"
					onDrop={drop}
					onDragOver={allowDrop}
					data-container={container.status}
					key={index}
				>
					<h2>{container.status}</h2>
					{container.issues.map((issue, issueIndex) => (
						<Issue key={issueIndex} issue={issue} />
					))}
				</div>
			))}
		</>
	);
}

export default IssueContainer;
