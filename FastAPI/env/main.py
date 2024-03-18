from fastapi import FastAPI, UploadFile, File
import PyPDF2
import uvicorn
import json
from io import BytesIO
import requests
import os
from dotenv import load_dotenv
from langchain.schema import HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

load_dotenv()
API_KEY = os.environ.get("OPEN_API_KEY")


@app.get("/")
def welcome():
    return {"message": "Welcome to FastAPI"}

file_name=""
text = ""
sysmsg = "You are a Document Guide, You take reference with uploaded documents to answer questions. Tell Users To Upload a Document First."

@app.delete("/delete")
def delete_file(file_name: str):
    global text, sysmsg
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
    return {"filename":file.filename ,"text": text}

@app.post("/ask")
async def ask_question(question: str, file_name: str | None = None):
    global sysmsg
    if file_name is not None:
        sysmsg = "You are a Document Guide, You take reference with uploaded documents to answer questions. You can asnwer questions related to $()".format(file_name)
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