export function allowDrop(e: React.DragEvent<HTMLDivElement>) {
	e.preventDefault();
}

export function drag(e: React.DragEvent<HTMLDivElement>) {
	e.dataTransfer?.setData("text", (e.target as HTMLElement).id);
}

export function drop(e: React.DragEvent<HTMLDivElement>) {
	e.preventDefault();
	const data = e.dataTransfer?.getData("text") || "";
	const draggedElement = document.getElementById(data);
	const targetElement = (e.target as HTMLElement).closest(".issue-container");

	if (!draggedElement || !targetElement) return;

	targetElement.appendChild(draggedElement);
}
