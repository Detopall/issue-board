export function allowDrop(e: React.DragEvent<HTMLDivElement>) {
	e.preventDefault();
}

export function drag(e: React.DragEvent<HTMLDivElement>) {
	e.dataTransfer?.setData("text", (e.target as HTMLElement).id);
}

export function drop(e: React.DragEvent<HTMLDivElement>) {
	e.preventDefault();
	const issueId = e.dataTransfer?.getData("text") ?? "";
	const draggedElement = document.getElementById(issueId);
	const targetElement = (e.target as HTMLElement).closest(".issue-container");
	
	if (!draggedElement || !targetElement) return;
	const targetAttribute = targetElement.getAttribute("data-container");
	if (!targetAttribute) return;
	const app = document.getElementById("App");
	if (!app) return;

	app.setAttribute("data-issue-id", issueId);
	app.setAttribute("data-dragged-to", targetAttribute);
	targetElement.appendChild(draggedElement);
}
