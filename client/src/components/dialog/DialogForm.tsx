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
					<label>
						<input type="checkbox" name="tag" value="bug-fix" />
						bug-fix
					</label>
					<label>
						<input
							type="checkbox"
							name="tag"
							value="feature"
							defaultChecked
						/>
						feature
					</label>
					<label>
						<input
							type="checkbox"
							name="tag"
							value="documentation"
						/>
						documentation
					</label>
					<label>
						<input type="checkbox" name="tag" value="question" />
						question
					</label>
					<label>
						<input type="checkbox" name="tag" value="help wanted" />
						help wanted
					</label>
					<label>
						<input type="checkbox" name="tag" value="refactor" />
						refactor
					</label>
				</div>

				<label htmlFor="assignees">Assignees</label>
				<div id="assignees">
					<label>
						<input
							type="checkbox"
							name="assignee"
							value="Denis"
							defaultChecked
						/>
						Denis
					</label>
					<label>
						<input type="checkbox" name="assignee" value="Kevin" />
						Kevin
					</label>
					<label>
						<input type="checkbox" name="assignee" value="Simon" />
						Simon
					</label>
					<label>
						<input type="checkbox" name="assignee" value="Bert" />
						Bert
					</label>
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
