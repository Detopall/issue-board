import { useEffect, useState } from "react";
import DialogForm from "./DialogForm";
import { Status } from "../App";

interface DialogProps {
	showButton: HTMLButtonElement | undefined;
}

function Dialog({ showButton }: DialogProps) {
	const [dialogOpen, setDialogOpen] = useState(false);

	useEffect(() => {
		if (showButton) {
			showButton.addEventListener("click", handleShowDialog);
		}

		return () => {
			if (showButton) {
				showButton.removeEventListener("click", handleShowDialog);
			}
		};
	}, [showButton]);

	const handleShowDialog = () => {
		setDialogOpen(true);
	};

	const handleCloseDialog = () => {
		setDialogOpen(false);
	};

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const tags = Array.from(formData.getAll("tag"));
		const assignees = Array.from(formData.getAll("assignee"));

		if (tags.length === 0 || assignees.length === 0) {
			alert("Please select at least one checkbox for each item");
			return;
		}

		const title = formData.get("title") as string;
		const description = formData.get("description") as string;
		const weight = parseInt(formData.get("weight") as string);
		const dueDate = formData.get("due-date") as string;

		console.log({
			title,
			description,
			tags,
			assignees,
			weight,
			dueDate,
			status: Status.OPEN,
		});
	}

	return (
		<>
			<div
				className={`modal-overlay ${dialogOpen ? "open" : ""}`}
				onClick={handleCloseDialog}
			></div>
			<dialog
				id="new-issue-dialog"
				className={dialogOpen ? "open" : ""}
				open={dialogOpen}
			>
				<DialogForm
					handleCloseDialog={handleCloseDialog}
					handleSubmit={handleSubmit}
				/>
			</dialog>

			<output></output>
		</>
	);
}

export default Dialog;
