<h1 align="center" id="title">DocHelp</h1>

<p align="center"><img src="https://socialify.git.ci/Dee-Codez/DocHelp/image?description=1&amp;language=1&amp;name=1&amp;owner=1&amp;pattern=Charlie%20Brown&amp;theme=Dark" alt="project-image"></p>

<h2>🚀 Demo</h2>

[dochelp-dp.vercel.app](https://dochelp-dp.vercel.app/)

<h2>💻 Built with</h2>

Technologies used in the project:

*   React + Vite
*   TailwindCSS
*   Firebase
*   FastAPI
*   LangChain


<h2>Project Screenshots:</h2>

![image](https://github.com/Dee-Codez/DocHelp/assets/114132607/517a0df3-431c-492c-813e-1ecb32a73bdd)

![image](https://github.com/Dee-Codez/DocHelp/assets/114132607/4dccb97b-30c7-4a37-90c4-6f5c1a9c24f0)

  
  
<h2>🧐 Features</h2>

Here're some of the project's best features:

*   Extensive PDF Support
*   Custom Fine Tuned LLM
*   Document Oriented AI Response

<h2> API Breakpoints : </h2>

FastAPI handles the backend and is separately hosted at : https://dochelp-backend.onrender.com/
<br/>
1. GET ```https:/dochelp-backend.onrender.com/``` Welcomes User by returning a simple greeting JSON.

2. POST ```https:/dochelp-backend.onrender.com/uploadfile``` Takes a file as body in form-data and further processes it, extracting the file name, text.

3. DELETE ```https:/dochelp-backend.onrender.com/delete``` Takes a file name as a query srting, cleares the processed text as well as returns the name of file deleted.

4. POST ```https:/dochelp-backend.onrender.com/ask``` Takes a question as a query string, creates a response from the langchain model and returns it in a JSON format.
   

<h2>🛠️ Installation Steps:</h2>

<p>1. Clone the Repository</p>

```
git clone https://github.com/Dee-Codez/DocHelp.git
```

<p>2. Go to the local repo folder</p>

```
cd (repo-directory)
```

<p>3. Install Node Dependencies</p>

```
npm install
```

<p>4. Start the development server</p>

```
npm run dev
```

<p>5. Voila. The Project is Up and Running Locally..</p>

  
  
