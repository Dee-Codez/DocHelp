from fastapi import FastAPI, UploadFile, File
import PyPDF2
import uvicorn
import json
from io import BytesIO
import requests
import os
import boto3
from dotenv import load_dotenv

app = FastAPI()

load_dotenv()
aws_access = os.environ.get("AWS_ACCESS_KEY")
aws_secret = os.environ.get("AWS_SECRET_KEY")
API_KEY = os.environ.get("OPEN_API_KEY")

s3 = boto3.client('s3', aws_access_key_id=aws_access, aws_secret_access_key=aws_secret)

@app.get("/")
def welcome():
    return {"message": "Welcome to FastAPI"}

file_name=""
text = ""
sysmsg = "You are a Document Guide, You take reference with uploaded documents to answer questions. Tell Users To Upload a Document First."

@app.delete("/delete")
def delete_file(file_name: str):
    s3.delete_object(Bucket='dochelp', Key=file_name)
    old_file = file_name
    file_name=""
    text = ""
    sysmsg = "You are a Document Guide, You take reference with uploaded documents to answer questions. Tell Users To Upload a Document First."
    return {"message": "File ${} Deleted".format(old_file)}

@app.post("/uploadfile")
async def upload_file(file: UploadFile = File(...)):
    global text, sysmsg, file_name
    file_name= file.filename
    contents = await file.read()
    pdf_file = BytesIO(contents)
    pdf_reader = PyPDF2.PdfReader(pdf_file)

    for page in range(len(pdf_reader.pages)):
        text += pdf_reader.pages[page].extract_text()
        sysmsg = "You are a Document Guide, You take reference with uploaded documents to answer questions. Take reference with the following text : " + text

    pdf_file.seek(0)
    s3.upload_fileobj(pdf_file, 'dochelp', file.filename)
    return {"text": text}

@app.post("/ask")
async def ask_question(question: str):
    from langchain.schema import HumanMessage, SystemMessage
    from langchain.chat_models import ChatOpenAI
    chat_model = ChatOpenAI(
        openai_api_key=API_KEY,
        openai_api_base="https://chat.tune.app/api/",
        model_name="mixtral-8x7b-inst-v0-1-32k",
    )
    messages=[
        SystemMessage(
            content=sysmsg
        )
        ,
        HumanMessage(
            content=question,
        ),
    ]
    out = chat_model(messages)
    return({"ans": out.content})



if(__name__ == "__main__"):
    uvicorn.run(app, host="127.0.0.1", port=8000)