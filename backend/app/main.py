# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React app's default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class DashboardData(BaseModel):
    total_users: int
    active_projects: int
    recent_activities: List[str]

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/api/dashboard", response_model=DashboardData)
async def get_dashboard_data():
    # In a real application, you would fetch this data from a database
    return {
        "total_users": 1000,
        "active_projects": 50,
        "recent_activities": [
            "User John Doe coddddmpleted Project A",
            "User Jane Smith started Project B",
            "User Mike Johnson updated Project C"
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)