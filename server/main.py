import uvicorn
from fastapi.middleware.cors import CORSMiddleware
import uuid
import json
import os
from fastapi import FastAPI
from model.Issue import Issue

app = FastAPI()
data_file_path = 'db/db.json'

def load_data():
    with open(data_file_path, 'r') as file:
        return json.load(file)

def save_data(data):
    with open(data_file_path, 'w') as file:
        json.dump(data, file, indent=4)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/issues")
def index():
    data = load_data()
    return data

@app.post("/issues")
def create_issue(issue: Issue):
    data = load_data()
    issue.id = str(uuid.uuid4())
    data.append(issue.dict())
    save_data(data)
    return issue

@app.get("/issues/{id}")
def get_issue(id: str):
	data = load_data()
	for issue in data:
		if issue['id'] == id:
			return issue
	return None


@app.put("/issues/{id}")
def update_issue(id: str, issue: Issue):
    data = load_data()
    for i in range(len(data)):
        if data[i]['id'] == id:
            data[i] = issue.dict()
            save_data(data)
            return issue
    return None

@app.delete("/issues/{id}")
def delete_issue(id: str):
    data = load_data()
    for i in range(len(data)):
        if data[i]['id'] == id:
            deleted_issue = data.pop(i)
            save_data(data)
            return deleted_issue['id']
    return None

if __name__ == '__main__':
    uvicorn.run('main:app', host='localhost', port=8000, reload=True)
