from pydantic import BaseModel

class Issue(BaseModel):
	id: str
	title: str
	description: str
	weight: int
	assignees: list[str]
	dueDate: str
	tags: list[str]
	status: str
