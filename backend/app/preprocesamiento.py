from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
from langchain_chroma import Chroma
from pathlib import Path
from dotenv import load_dotenv
import os

# Cargar y procesar datos
def cargar_pdfs(folder_path="data/"):
    pdf_docs = []

    for pdf_file in Path(folder_path).glob("*.pdf"):
        loader = PyPDFLoader(str(pdf_file))  #carga el cont de cada pdf
        pdf_docs.extend(loader.load()) 
    return pdf_docs


#& carga sitios web desde un txt
# def cargar_urls(txt_file="data/urls.txt"):
#     with open(txt_file, "r") as f:
#         urls = [line.strip() for line in f.readlines()]
#     loader = WebBaseLoader(urls)
#     return loader.load()



#! SE CREAN Y GUARDAN LOS EMBEDDINGS EN CHROMA
def crear_guardar_vectores():
    load_dotenv()
    documentos = cargar_pdfs() # + cargar_urls()

    # Dividir documentos en chunks
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200
    )
    splits = text_splitter.split_documents(documentos)

    embeddings = GoogleGenerativeAIEmbeddings(
        model="models/embedding-001",
        google_api_key=os.getenv("GEMINI_API_KEY")
    )
    
    db = Chroma.from_documents(
        documents=splits,
        embedding=embeddings,
        persist_directory="vectorstore" #ruta bd
    )
    db.persist() #guarda bd en disco
    return db