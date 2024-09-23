# app/main.py
import os
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import boto3
import botocore
from dotenv import load_dotenv

load_dotenv()

AWS_REGION = os.getenv("AWS_REGION")

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],  # React app's default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class DashboardData(BaseModel):
    total_users: int
    active_projects: int
    recent_activities: List[str]

class MessageItem(BaseModel):
    role: str
    content: str

class ChatMessage(BaseModel):
    message: str
    conversation: List[MessageItem]

class ChatResponse(BaseModel):
    response: str

# Initialize Bedrock client
try:
    bedrock = boto3.client(service_name='bedrock-runtime')
except botocore.exceptions.NoRegionError:
    # If no region is specified, you can set a default one
    bedrock = boto3.client(service_name='bedrock-runtime', region_name=AWS_REGION)

# @app.get("/")
# async def root():
#     return {"message": "Hello World"}

# @app.get("/api/dashboard", response_model=DashboardData)
# async def get_dashboard_data():
#     # In a real application, you would fetch this data from a database
#     return {
#         "total_users": 1000,
#         "active_projects": 50,
#         "recent_activities": [
#             "User John Doe completed Project A",
#             "User Jane Smith started Project B",
#             "User Mike Johnson updated Project C"
#         ]
#     }

@app.post("/api/chat", response_model=ChatResponse)
async def chat_with_claude(chat_message: ChatMessage):
    try:
        print("Received chat message:", chat_message.message)
        print("Conversation history:", chat_message.conversation)

        # Convert the conversation history to the format expected by Claude
        messages = [
            {"role": item.role, "content": item.content}
            for item in chat_message.conversation
        ]

        # Add the new user message
        messages.append({
            "role": "user",
            "content": chat_message.message
        })

        print(messages)

        body = json.dumps({
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 4096,
            "system": "You are a helpful assistant.",
            "messages": messages
        })

        modelId = "anthropic.claude-3-sonnet-20240229-v1:0"

        response = bedrock.invoke_model(
            body=body, 
            modelId=modelId, 
        )
        response_body = json.loads(response.get('body').read())
        print(response_body)
        return ChatResponse(response=response_body["content"][0]["text"])

    except Exception as e:
        print("Error:", str(e))
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)