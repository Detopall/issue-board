import { Assignees } from "../../App";
import { Tags } from "../../App";

interface DialogFormProps {
	handleCloseDialog: () => void;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

function DialogForm({ handleCloseDialog, handleSubmit }: DialogFormProps) {
	return (
		<>
			<form onSubmit={handleSubmit}>
				<label htmlFor="title">Title</label>
				<input
					type="text"
					name="title"
					id="title"
					required
					autoComplete="off"
				/>

				<label htmlFor="description">Description</label>
				<textarea
					name="description"
					id="description"
					required
					autoComplete="off"
				></textarea>

				<label>Tags</label>
				<div id="tags">
					{(Object.keys(Tags) as Array<keyof typeof Tags>).map(
						(tag: string) => (
							<label key={tag}>
								<input type="checkbox" name="tag" value={tag} />
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
					min="1"
					defaultValue="1"
					required
				/>

				<label htmlFor="due-date">Due Date</label>
				<input
					type="date"
					name="due-date"
					id="due-date"
					min={new Date().toISOString().split("T")[0]}
					defaultValue={new Date().toISOString().split("T")[0]}
					required
				/>

				<div>
					<button type="button" onClick={handleCloseDialog}>
						Cancel
					</button>
					<button type="submit" onClick={handleCloseDialog}>
						Create Issue
					</button>
				</div>
			</form>
		</>
	);
}

export default DialogForm;
